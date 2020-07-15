/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * hmpace.watch.v1
 * 
 */

'use strict';

import React from 'react';

import {
  AppRegistry, StyleSheet, Text, View, TouchableHighlight,
  Platform, PixelRatio, Button, Image, ScrollView, Dimensions,
  TouchableOpacity, Slider
} from "react-native";
import { ImageButton, TitleBarBlack, MessageDialog, LoadingDialog } from 'miot/ui';
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import { Host } from 'miot';
import { Bluetooth, BluetoothEvent, DeviceEvent, Device, Service, ProgressDialog } from "miot";
import { Package } from "miot";
import { getString } from './MHLocalizableString';
// import MHLocalizableString  from './MHLocalizableString.js';
import * as Progress from 'react-native-progress';
// import  Separator  from 'miot/ui/Separator';
import Radio from 'miot/ui/Radio';
import Checkbox from 'miot/ui/Checkbox/Checkbox';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import { firstAllOptions, secondAllOptions } from "miot/ui/CommonSetting/CommonSetting";
import MHCard from 'miot/ui/Card/MHCard';
import Card from 'miot/ui/Card';
import Switch from 'miot/ui/Switch';
import NavigationBar from 'miot/ui/NavigationBar';
const { width, height } = Dimensions.get('window');
const ReactNative = require('react-native');
const {
  AppState
} = ReactNative;
import './globle_const.js';
export let bt = Device.getBluetoothLE();

const DEMOCHAR = '00000001-0000-1000-8000-00805f9b34fb';
let status_enable = false;

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      doco_bt_begin: 0,
      vbat: 0.2,
      vbat_view: 20,
      vbat_times: 100,
      did: Device.deviceID,
      chars: {}, 
      chars_doco_tx: null,
      chars_doco_rx: null,
      services: {},
      service_doco: null, 
      buttonText: Device.mac, 
      // isEnable: false,
      // data: '0x617469',
      progress: 0,
      device_connecting: true,
      indeterminate: true,
      ble_reseve_data: '',
      systemChecked1: true,
      systemChecked2: true,
      systemChecked3: true,
      outChecked1: true,
      outChecked2: true,
      outChecked3: true,
      outChecked4: true,
      inChecked1: true,
      inChecked2: true,
      inChecked3: true,
      inChecked4: true,
      cleanChecked1: true,
      cleanChecked2: true,
      cleanChecked3: true,
      cleanChecked4: true,
      vbatatcommand: "at+vbat",
      speedatcommand: "at+md=",
      outpwmcommand: "at+ofre=",
      sysmodecommand: "at+sys=",
      inpwmcommand: "at+ifre=",
      remindatcommand: "at+rd=",
      timesynccommand: "at+ts",
      historycommand: "at+hy=",
      read_sn_command: "at+rs",
      in_level_command: "at+in=",
      out_level_command: "at+out=",
      skin_test_on_command: "at+skin=1",
      skin_test_off_command: "at+skin=0",
      read_speed: "at+rsp",
      read_in: "at+in?",
      read_out: "at+out?",
      read_sys: "at+sys?",
      read_remind: "at+rd?",
      doco_sysmode: 1,
      doco_outmode: 25,
      doco_inmode: 25,
      doco_speed: 25,
      doco_remind: true,
      loading_visible: true,
      doco_data_sync: 0,
      // doco_tx_uuid:"457871E8-D516-4CA1-9116-57D0B17B3456",
      // doco_rx_uuid:"457871E8-D516-4CA1-9116-57D0B17B3412",
      skin_noise: 0,
      ble_connect_testcont: 0,
      ble_connect_fail: false,
      vbat_unin_string: '% 剩余电量',
      skintest_img_src: "../Resources/skin_test_img.png",
      // altervisible1:false,
      hideUserExperiencePlan: true,
      hideAgreement: true

    };
  }
    
    static navigationOptions = ({ navigation }) => {
      return {
        header: 
            <NavigationBar
              backgroundColor="#ffffff"
              type={NavigationBar.TYPE.LIGHT}
              left={[
                {
                  key: NavigationBar.ICON.BACK,
                  onPress: (_) => {
                    bt.disconnect();
                    if (bt.isConnected) {
                      bt.disconnect();
                    }
                    Package.exit();
                  }
                }
              ]}
              right={[{
                key: NavigationBar.ICON.MORE,
                onPress: (_) => {
                  /*
                    bt.disconnect();
                    if (bt.isConnected) {
                        //bt.disconnect();
                    }
                    Package.exit()
                    */
                  // navigation.navigate('setting_p,')
                  global.constants.app_real_status = 1;
                  console.log("lixiping status add:", global.constants.app_real_status);
                  // global.constants.real_enter_setting+=1;
                  navigation.navigate('setting_p', { title: 'Setting' });
                   
                } 
              }]}
              title={navigation.state["params"] ? navigation.state.params.name : Device.name}// {getString('device_title')}//{'DOCO微电流精华导入美容仪'}
            />
      };

    };
    stringtoHex(str) {
      let val = "";
      for (let i = 0; i < str.length; i++) {
        if (val == "")
          val = str.charCodeAt(i).toString(16);
        else
          val += str.charCodeAt(i).toString(16);
      }
      // val += "0a"
      return val;
    }

    hextoString(hex) {
      let arr = hex.split("");
      let out = "";
      for (let i = 0; i < arr.length / 2; i++) {
        let tmp = `0x${ arr[i * 2] }${ arr[i * 2 + 1] }`;
        let charValue = String.fromCharCode(tmp);
        out += charValue;
      }
      return out;
    }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState != null && nextAppState === 'active') {
      // 如果是true ，表示从后台进入了前台 ，请求数据，刷新页面。或者做其他的逻辑
      console.log("backto top view");
      if (global.constants.app_real_status >= 1) {
        global.constants.app_real_status -= 1;
      }
      console.log("lixiping status dec:", global.constants.app_real_status);
    } else if (nextAppState != null && nextAppState === 'background') {

      if (global.constants.app_real_status == 0) {
        if (bt.isConnected) {
          bt.disconnect();
          console.log("disconnect");
        }
        Package.exit();
        global.constants.app_real_status = 0;
        console.log("lixiping status add:", global.constants.app_real_status);

      } else {
        global.constants.app_real_status += 1;
        console.log("lixiping status:", global.constants.app_real_status);

      }

    }
  }
  startScan() {
    console.log("search device");
    Bluetooth.startScan(3000, "0000fef5-0000-1000-8000-00805f9b34fb", "0000fe95-0000-1000-8000-00805f9b34fb");// 扫描指定设备
  }
  componentDidMount() {
    this.timer = setInterval((_) => {
      if (this.state.ble_connect_testcont == 10) {
        this.setState({
          loading_visible: false,
          ble_connect_fail: true
        });
        clearInterval(this.timer);
        this.timer = null;
      } else {
        if (this.state.doco_data_sync == 1) {
          console.log("waitting for lilililil");
          this.loading_invisible_fun();
          clearInterval(this.timer);
          this.timer = null;
          this.checkoutAgreement();
        } else {
          this.state.ble_connect_testcont += 1;
        }
      }
    }, 1000);
    console.log("lilili didmount");





          
  }
  // 检查协议
  checkoutAgreement() {
    // const licenseURL = require('../Resources/raw/license_zh.html');
    const privacyURL = require('../Resources/raw/privacy_zh.html');
    let options = {};
    // options.agreementURL = licenseURL;
    options.privacyURL = privacyURL;
    // options.experiencePlanURL = licenseURL;
    options.hideAgreement = this.state.hideAgreement;
    options.hideUserExperiencePlan = this.state.hideUserExperiencePlan;

    Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then((res) => {
      console.log('batchGetDeviceDatas ', res);
      let alreadyAuthed = false;
      let result = res[Device.deviceID];
      let config;
      if (result && result['prop.s_auth_config']) {
        config = result['prop.s_auth_config'];
      }
      if (config) {
        try {
          let authJson = JSON.parse(config);
          console.log('auth config ', authJson);
          alreadyAuthed = authJson.privacyAuthed && true;
        } catch (err) {
          // json解析失败，不处理
        }
      }

      if (alreadyAuthed) {
        // 已授权，不再弹窗显示

        return new Promise.resolve("已经授权");
      } else {
        return Host.ui.alertLegalInformationAuthorization(options).then((res) => {
          console.log('授权结果', res);
          if (res) {
            return Service.smarthome.batchSetDeviceDatas([{
              did: Device.deviceID,
              props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': 'true' }) }
            }]);
          } else {
            return new Promise.reject("取消授权");
            if (bt.isConnected) {
              bt.disconnect();
              console.log("disconnect");
            }

          }
        });
      }
    }).catch((err) => {
      // 没能授权成功
      console.log('授权错误', err);
      if (bt.isConnected) {
        bt.disconnect();
        console.log("disconnect");
      }

      // Package.exit()
    });
  }
  componentWillMount() {
    console.log("lixilili  will mount");
    this.showing = true;
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
      console.log("不要以为你改了名字我就不认识你了", device);
      this.props.navigation.setParams({
        name: device.name
      });
      this.forceUpdate();
    });
    this._s7 = BluetoothEvent.bluetoothDeviceDiscovered.addListener((result) => {
      if (bt) {
        console.log(`发现设备:${ JSON.stringify(result) }`);
      } else {
        console.log("初次发现设备:", JSON.stringify(result));
        // 普通蓝牙设备的连接必须在扫描到设备之后手动创建 ble 对象
        bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);// android 用 mac 创建设备，ios 用 uuid 创建设备
        Bluetooth.stopScan();
        this.connect();
      }
    });
    Bluetooth.checkBluetoothIsEnabled().then((result) => {
      // alert(result)
      // this.state.isEnable = result;
      console.log("lixp check blue tooth",);
      if (result) {
        AppState.addEventListener('change', this._handleAppStateChange);
                
        this.connect();
        // this.startScan();
        // bt.disconnect();
        // this.state.altervisible1=false;
        // console.log("lixp check blue tooth on");
      } else {
        alert("请打开手机蓝牙再使用");
        Package.exit();
        // this.state.altervisible1=true;
        // console.log("blue tooth off");
        // Host.ui.showBLESwitchGuide();
        /*
                                setTimeout(() => {
                    //this.setState({ visLoading: false });
                    Package.exit();
                  }, 3000);
                */

        // this.setState({ buttonText: "Bluetooth Status = " + result })
      }
    });
    this._s5 = BluetoothEvent.bluetoothStatusChanged.addListener((data) => {
      console.log("bluetoothStatusChanged", data);
      if (!data) {
        Package.exit();
        // alert("蓝牙已断开")
        // console.log("蓝牙")
        // this.setState({ buttonText: "Bluetooth Status = " + data })
      }
    });


    this._s1 = BluetoothEvent.bluetoothSeviceDiscovered.addListener((blut, services) => {
      // this.setState({ buttonText: 'bluetoothSeviceDiscovered' })
      if ((bt.isConnected == true) && (this.state.doco_bt_begin == 1)) {
        console.log("bluetoothSeviceDiscovered biubiu", blut.mac, services.map((s) => s.UUID), bt.isConnected);
        services.forEach((s) => {
          this.state.services[s.UUID] = s;
          console.log("s service", s.UUID);
          console.log("lipingli service", this.state.services[s.UUID]);

          // if (s.UUID.indexOf( "FEF5")>=0) {
          console.log("lixp begin get characteristic");
          s.startDiscoverCharacteristics('457871e8-d516-4ca1-9116-57d0b17b3456', '457871e8-d516-4ca1-9116-57d0b17b3412');
          // } 
          // console.log("ping",s.UUID);
        });
        this.state.doco_bt_begin = 2;
      }
    });
    this._s2 = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters) => {
      // this.setState({ buttonText: service.UUID + "\n CharacteristicDiscovered" })
            
      if ((bt.isConnected == true) && (this.state.doco_bt_begin == 2)) {
        console.log("xixxii bluetoothCharacteristicDiscovered", characters.map((s) => s.UUID), bt.isConnected);
        characters.forEach((c) => {
          // let tmp_var=0;

          console.log("lalal", c, c.UUID);
          if (c.UUID == "457871e8-d516-4ca1-9116-57d0b17b3456" || c.UUID == "457871E8-D516-4CA1-9116-57D0B17B3456") {
            this.state.chars[0] = c;
            console.log("lixiping uuid ", c, c.UUID);
            global.constants.doco_charact_g[0] = c;
            console.log("lihex", this.stringtoHex(this.state.vbatatcommand));
            c.write(this.stringtoHex(this.state.vbatatcommand))
              .then((characteristic) => {
                console.log("liping write data success");
              }).catch((err) => {
                console.log("liping write data fail");
              });

          }
          if (c.UUID == "457871e8-d516-4ca1-9116-57d0b17b3412" || c.UUID == "457871E8-D516-4CA1-9116-57D0B17B3412") {
            this.state.chars[1] = c;
            console.log("lixiping uuid ", c, c.UUID);
            global.constants.doco_charact_g[1] = c;
            c.setNotify(true)
              .then((characteristic) => {
                console.log("liping set notify success");
              }).catch((err) => {
                console.log("liping set notify fail");
              });

          }

        });
      } else {
        this.connect();
      }


    });
    this._s3 = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
      // if (service.UUID.indexOf("ffd5")>0){
      console.log("lixp receive", character.UUID, this.hextoString(value));// 刷新界面
                
      this.state.ble_reseve_data = this.hextoString(value);
      if (this.state.ble_reseve_data.substring(0, 5) == '+vbat') {
        let vbat_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        let vbat_prcess = parseInt(vbat_tmp) / 100;

        console.log('vbat lixp:', vbat_tmp, vbat_prcess);
        this.setState({
          vbat: vbat_prcess - 0.08,
          vbat_view: vbat_tmp
          // vbat_unin_string:MHLocalizableString.string.battery_level,
        });

        if (this.state.device_connecting) {
          console.log("lixiping uuid222 ", this.state.chars, this.state.chars[0]);
          this.state.chars[0].write(this.stringtoHex(this.state.read_sys));
        }
                    
      } else if (this.state.ble_reseve_data.substring(0, 5) == '+sys:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        switch (value_prcess) {
          case 1:
            this.setState({ systemChecked1: true, systemChecked2: false, systemChecked3: false });
            break;
          case 2:
            this.setState({ systemChecked1: false, systemChecked2: true, systemChecked3: false });
            break;
          case 3:
            this.setState({ systemChecked1: false, systemChecked2: false, systemChecked3: true });
            break;
        }
        console.log('sys lixp:', value_tmp, value_prcess);
        if (this.state.device_connecting) {
          this.state.chars[0].write(this.stringtoHex(this.state.read_in));
        }

      } else if (this.state.ble_reseve_data.substring(0, 4) == '+in:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        switch (value_prcess) {
          case 25:
            this.setState({ inChecked1: true, inChecked2: false, inChecked3: false, inChecked4: false, doco_inmode: value_prcess });
            break;
          case 50:
            this.setState({ inChecked1: false, inChecked2: true, inChecked3: false, inChecked4: false, doco_inmode: value_prcess });
            break;
          case 75:
            this.setState({ inChecked1: false, inChecked2: false, inChecked3: true, inChecked4: false, doco_inmode: value_prcess });
            break;
          default:
            this.setState({ inChecked1: false, inChecked2: false, inChecked3: false, inChecked4: true, doco_inmode: value_prcess });
            break;
        }
        console.log('in lixp:', value_tmp, value_prcess);
        if (this.state.device_connecting) {
          this.state.chars[0].write(this.stringtoHex(this.state.read_out));
        }

      } else if (this.state.ble_reseve_data.substring(0, 5) == '+out:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        switch (value_prcess) {
          case 25:
            this.setState({ outChecked1: true, outChecked2: false, outChecked3: false, outChecked4: false, doco_outmode: value_prcess });
            break;
          case 50:
            this.setState({ outChecked1: false, outChecked2: true, outChecked3: false, outChecked4: false, doco_outmode: value_prcess });
            break;
          case 75:
            this.setState({ outChecked1: false, outChecked2: false, outChecked3: true, outChecked4: false, doco_outmode: value_prcess });
            break;
          default:
            this.setState({ outChecked1: false, outChecked2: false, outChecked3: false, outChecked4: true, doco_outmode: value_prcess });
            break;
        }
        console.log('out lixp:', value_tmp, value_prcess);
        if (this.state.device_connecting) {
          this.state.chars[0].write(this.stringtoHex(this.state.read_speed));
        }
                    
      } else if (this.state.ble_reseve_data.substring(0, 7) == '+speed:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        switch (value_prcess) {
          case 25:
            this.setState({ cleanChecked1: true, cleanChecked2: false, cleanChecked3: false, cleanChecked4: false, doco_speed: value_prcess });
            break;
          case 50:
            this.setState({ cleanChecked1: false, cleanChecked2: true, cleanChecked3: false, cleanChecked4: false, doco_speed: value_prcess });
            break;
          case 75:
            this.setState({ cleanChecked1: false, cleanChecked2: false, cleanChecked3: true, cleanChecked4: false, doco_speed: value_prcess });
            break;
          default:
            this.setState({ cleanChecked1: false, cleanChecked2: false, cleanChecked3: false, cleanChecked4: true, doco_speed: value_prcess });
            break;
        }
        console.log('speed lixp:', value_prcess);
        // this.state.device_connecting=false;
        if (this.state.device_connecting) {
          this.state.chars[0].write(this.stringtoHex(this.state.read_remind));
        }
        this.state.device_connecting = false;
        // this.state.chars[this.state.doco_tx_uuid].write(this.stringtoHex(this.state.read_speed));
      } else if (this.state.ble_reseve_data.substring(0, 4) == '+rd:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        console.log('remind lixp:', value_prcess);
        if (value_prcess) {
          this.setState({ doco_remind: true });
        } else {
          this.setState({ doco_remind: false });
        }

        // this.state.device_connecting=false;
        // if(this.state.device_connecting){
        //  this.state.chars[this.state.doco_tx_uuid].write(this.stringtoHex(this.state.read_remind));
        // }
        this.state.device_connecting = false;
        this.state.doco_data_sync = 1;
        // this.state.chars[this.state.doco_tx_uuid].write(this.stringtoHex(this.state.read_speed));
      } else if (this.state.ble_reseve_data.substring(0, 6) == '+skin:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        console.log('remind lixp:', value_prcess);
        if ((value_prcess == 0) && (global.constants.skin_rst_backto_main == 1)) {
          this.props.navigation.navigate('Home', { title: 'test' });
          this.state.chars[0].write(this.stringtoHex(this.state.vbatatcommand));
          global.constants.skin_rst_backto_main = 0;
        }
      }
                

      // }
      // this.setState({buttonText:"bluetoothCharacteristicValueChanged:" + character.UUID + ">" + value});
    });
    this._s4 = BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener((blut, data) => {
      console.log("bluetoothSeviceDiscoverFailed", data);
      this.setState({ buttonText: `bluetoothSeviceDiscoverFailed :${ data }` });
    });
    this._s5 = BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener((blut, data) => {
      console.log("bluetoothCharacteristicDiscoverFailed", data);
      this.setState({ buttonText: `bluetoothCharacteristicDiscoverFailed:${ data }` });
    });
    this._s6 = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((blut, isConnect) => {
      console.log("lalali bluetoothConnectionStatusChanged", blut, isConnect);
      // this.setState({buttonText:"bluetoothConnectionStatusChanged:" + isConnect});
      /*
                        if (bt.mac === blut.mac && !isConnect) {
                this.setState({chars: {}});
            }
            */

    });
  }

  /**
     * 更新固件后重新链接设备
     */
  update() {
    Bluetooth.startScan(30000, "1000000-0000-0000-00000000000");// 扫描指定设备
    BluetoothEvent.bluetoothDeviceDiscovered.addListener((result) => {
      bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);// android 用 mac 创建设备，ios 用 uuid 创建设备
      // this.connect();
    });
  }

  connect() {
    console.log("device start connect", bt);

    if (bt.isConnected) {
      console.log("蓝牙已连接");
      bt.startDiscoverServices("FEF5");
      // bt.startDiscoverServices();
      this.state.doco_bt_begin = 1;
      // this.setState({ buttonText: "connected" })
    } else {
      bt.connect(-1).then((data) => {
        console.log("蓝牙连接成功: ", JSON.stringify(data));
        // console.log("connected lixp", data);
        bt.startDiscoverServices("FEF5");
        // this.setState({ buttonText: "connected" });
        console.log("lixp11 connected", bt.isConnected);
        this.state.doco_bt_begin = 1;
      }).catch((data) => {
        console.log("连接失败:error", data);// 链接失败的页面
        if (data.code === -7) {
          // this.setState({ buttonText: "timeout retrying" })
          bt.disconnect();
          console.log("disconnect and reconnect");
          this.connect();
                    
          // bt.startDiscoverServices("FEF5");
        } else {
          // alert("蓝牙连接失败")
          // Package.exit();
          // this.setState({ buttonText: "click retry\n" + JSON.stringify(data) })
        }
      });
    }
        
  }

  componentWillUnmount() {
    this.showing = false;
    console.log("lixiping will umount");

    if (bt.isConnected) {
      bt.disconnect();
      console.log("disconnect");
    }
    clearInterval(this.timer);
    this.timer = null;
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
    this._s4.remove();
    this._s5.remove();
    this._s6.remove();
    this._s7.remove();
  }

  checkBluetoothIsEnabled() {
    Bluetooth.checkBluetoothIsEnabled().then((yes) => {
      status_enable = yes;
      this.setState({ buttonText: `checkBluetoothIsEnabled ${ yes }` });
    });
  }

  enableBluetoothForAndroid() {
    Bluetooth.enableBluetoothForAndroid(!status_enable);
  }
    /*
<Button title="checkBluetoothIsEnabled" 
                onPress={this.checkBluetoothIsEnabled}
            />


            <Button title="enableBluetoothForAndroid" 
                onPress={this.enableBluetoothForAndroid}
            />

*/
    styleChecked = (id) => {
      if (id === 1) {
        // console.log("res", res)
        this.setState({
          isStyle1Checked: true
        });
      } else {
        // console.log("res", res)
        this.setState({
          isStyle1Checked: false
        });
      }

    }


    skintest_fun = () => {
      let that = this;
      console.log("begin skin test");
      if (bt.isConnected) {
        // that.props.navigation.navigate('skin_rst', { title: 'test' });
        that.props.navigation.navigate('skin', { title: 'test' });
      }
    }
      loading_invisible_fun = () => {
        console.log("hid remind");
        if (this.state.doco_data_sync == 1) {
          console.log("hid remind success"); 
          this.setState({
            loading_visible: false
          });
        } else {
          this.setState({
            loading_visible: false,
            ble_connect_fail: true
          });
        }

      }
      exit_to_main = () => {
        console.log("connect fail");
        Package.exit();


      }
      render() {
        /*
           if(Host.locale.language=='zh'){
            let skintest_img=<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_img.png")} />
        }else if(Host.locale.language=='ko'){
            let skintest_img=<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_en.png")} />
        }else{
            let skintest_img=<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_en.png")} />
        }     
        */
        // let skintest_img=<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_en.png")} />
        // let skintest_img=(Host.locale.language=='en')?<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_en.png")} />:<Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_img.png")} />
        let skintest_img = (Host.locale.language == 'ko') ? <Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_ko.png")} /> : ((Host.locale.language == 'zh') ? <Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_img.png")} /> : <Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_en.png")} />);
        // index == 2 ? {right:100} : (index == 1 ? {right:120} : {right:140})
        
        return (
        
          <View style={styles.container} >
            <LoadingDialog
              visible={this.state.loading_visible}
              message={getString('data_syn')}
              timeout={20000}
            />
            <MessageDialog title={'蓝牙连接超时'}
              message={'蓝牙连接超时，请保证设备在身边并退出运输模式，然后重试'}
              cancelable={false}
              // cancel={'取消'}
              confirm={'确认'}
              timeout={10000}
              onCancel={(e) => {
                console.log('onCancel', e);
                // Package.exit();
              }}
              onConfirm={(e) => {
                console.log('onConfirm', e);
                if (bt.isConnected) {
                  bt.disconnect();
                  console.log("disconnect");
                }
                Package.exit();
              }}
              onDismiss={() => {
                console.log('onDismiss');
                this.setState({ ble_connect_fail: false });
                // Package.exit();
              }}
              visible={this.state.ble_connect_fail} 
            />

            <ScrollView
              style={{ flex: 1 }}
              horizontal={false}
              // showsHorizontalScrollIndicator={false}
              // pagingEnabled={true}
              showsVerticalScrollIndicator={false}
              // onMomentumScrollEnd ={(e)=> this.scrollEnd(e)}
            >
        

              <View style={styles.topView}>
                <Image style={styles.lasttimebuttom_class} source={require("../Resources/lasttimebuttom.png")} resizeMode="contain" />
                <Text style={styles.last_buttom_value_class}>{this.state.vbat_view}</Text>
                <Text style={styles.last_buttom_text_class}>{getString('battery_level')}</Text>

                <Image style={styles.cat_device_class} source={require("../Resources/cat_device.png")} resizeMode="contain"/>
                <Image style={styles.circle_buttom_class} source={require("../Resources/circle_buttom.png")} resizeMode="contain"/>
                <Progress.Circle
                  style={styles.progress}
                  progress={this.state.vbat}
                  color={'#C483F1'}
                  size={221}
                  // indeterminate={this.state.indeterminate}
                />
                
                
                <TouchableOpacity onPress={ this.skintest_fun.bind(this)} style={{ zIndex: 100 }}>
                
                  {skintest_img}
                </TouchableOpacity>

              </View>

              <Text style={styles.sys_set_text}>{getString('System_mode')}</Text>
              <View style={styles.line_class}></View>
              <View style={styles.middleView}>
                <Checkbox
                  style={styles.sys_mode_check_class1}
                  checked={this.state.systemChecked1}
                  disabled={this.state.systemChecked1 && bt.isConnected}
                  checkedColor="lightgreen"
                  onValueChange={() => {
                    if (bt.isConnected == true) {
                      this.setState({ systemChecked1: true, systemChecked2: false, systemChecked3: false });
                      this.state.chars[0].write(this.stringtoHex(`${ this.state.sysmodecommand }1`));
                    }
                  }
                  }
                />
                <Text
                  style={styles.checkboxText}
                  numberOfLines={1}
                >{getString('mild_mode')}</Text>
                <Checkbox
                  style={styles.sys_mode_check_class}
                  checked={this.state.systemChecked2}
                  disabled={this.state.systemChecked2}
                  checkedColor="lightgreen"
                  onValueChange={() => {
                    if (bt.isConnected == true) {
                      this.setState({ systemChecked2: true, systemChecked1: false, systemChecked3: false });
                      this.state.chars[0].write(this.stringtoHex(`${ this.state.sysmodecommand }2`));
                    }

                  }}
                />
                <Text
                  style={styles.checkboxText}
                  numberOfLines={1}
                >{getString('daily_mode')}</Text>
                <Checkbox
                  style={styles.sys_mode_check_class}
                  checked={this.state.systemChecked3}
                  disabled={this.state.systemChecked3}
                  checkedColor="lightgreen"
                  onValueChange={() => {
                    if (bt.isConnected == true) {
                      this.setState({ systemChecked3: true, systemChecked1: false, systemChecked2: false });
                      this.state.chars[0].write(this.stringtoHex(`${ this.state.sysmodecommand }3`));
                    }
                  }}
                />
                <Text
                  style={styles.checkboxText3}
                  numberOfLines={1}
                >{getString('tolerance_mode')}</Text>
              </View>
              <Text style={styles.personal_set_text}>{getString('prefernce_setting')}</Text>
              <View style={styles.line_class}></View>
              <Text style={styles.out_in_set_text}>{getString('essence_import_export_mode')}</Text>
              <View style={styles.outset_box} >
                <Text style={styles.out_in_set_text}>{getString('microcurrent_export_mode')}</Text>
                <View style={styles.outdetal}>
                  <Checkbox
                    style={styles.outmode_class1}
                    checked={this.state.outChecked1}
                    disabled={this.state.outChecked1}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ outChecked1: true, outChecked2: false, outChecked3: false, outChecked4: false, doco_outmode: 25 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.out_level_command }25`));
                      }
                    }}

                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.outChecked2}
                    disabled={this.state.outChecked2}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ outChecked2: true, outChecked1: false, outChecked3: false, outChecked4: false, doco_outmode: 50 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.out_level_command }50`));
                      }
                    }}
                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.outChecked3}
                    disabled={this.state.outChecked3}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ outChecked3: true, outChecked1: false, outChecked2: false, outChecked4: false, doco_outmode: 75 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.out_level_command }75`));
                      }
                    }}
                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.outChecked4}
                    disabled={this.state.outChecked4}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ outChecked4: true, outChecked3: false, outChecked2: false, outChecked1: false, doco_outmode: 75 });
                        // this.state.chars[this.state.doco_tx_uuid].write(this.stringtoHex(this.state.out_level_command+"75"));
                      }
                    }}
                  />

                </View>
                <View style={styles.out_mode_text}>
                  <Text
                    style={styles.checkboxoutText}
                    numberOfLines={1}
                  >{getString('weak_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText1}
                    numberOfLines={1}
                  >{getString('normail_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText2}
                    numberOfLines={1}
                  >{getString('strong_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText3}
                    numberOfLines={1}
                  >{getString('customize_mode')}</Text>
                </View>
                <Slider
                  style={{ marginTop: 20, width: Platform.OS === 'ios' ? width - 40 - 20 : width - 30, marginLeft: Platform.OS === 'ios' ? 10 : -5, padding: 0, margin: 0 }} maximumValue={99}
                  minimumValue={1}
                  thumbTintColor="#B3B1B1"
                  value={this.state.doco_outmode}
                  onSlidingComplete={(progress) => {
                    if (bt.isConnected == true) {
                      this.setState({ doco_outmode: progress, outChecked4: true, outChecked3: false, outChecked2: false, outChecked1: false });
                      console.log("slider:", parseInt(progress));
                      this.state.chars[0].write(this.stringtoHex(this.state.out_level_command + parseInt(progress)));
                    }
                  }}
                  minimumTrackTintColor="#DA87F2"
                  // onValueChange={progress => this.setState({  })}
                />
                <View style={styles.remind_switch_box}>
                  <Text
                    style={styles.sliderText}
                    numberOfLines={1}
                  >1</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >25</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >50</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >75</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >99</Text>
                </View>

            
                <Text style={styles.out_in_set_text}>{getString('micro_current_essence_introduction')}</Text>
                <View style={styles.indetal}>
                  <Checkbox
                    style={styles.outmode_class1}
                    checked={this.state.inChecked1}
                    disabled={this.state.inChecked1}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ inChecked1: true, inChecked2: false, inChecked3: false, inChecked4: false, doco_inmode: 25 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.in_level_command }25`));
                      }
                    }}

                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.inChecked2}
                    disabled={this.state.inChecked2}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ inChecked2: true, inChecked1: false, inChecked3: false, inChecked4: false, doco_inmode: 50 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.in_level_command }50`));
                      }
                    }}
                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.inChecked3}
                    disabled={this.state.inChecked3}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ inChecked3: true, inChecked1: false, inChecked2: false, inChecked4: false, doco_inmode: 75 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.in_level_command }75`));
                      }
                    }}
                  />
                  <Checkbox
                    style={styles.outmode_class2}
                    checked={this.state.inChecked4}
                    disabled={this.state.inChecked4}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ inChecked4: true, inChecked1: false, inChecked2: false, inChecked3: false, doco_inmode: 75 });
                      }
                    
                    }}
                  />

                </View>
                <View style={styles.out_mode_text}>
                  <Text
                    style={styles.checkboxoutText}
                    numberOfLines={1}
                  >{getString('weak_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText1}
                    numberOfLines={1}
                  >{getString('normail_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText2}
                    numberOfLines={1}
                  >{getString('strong_mode')}</Text>
                  <Text
                    style={styles.checkboxoutText3}
                    numberOfLines={1}
                  >{getString('customize_mode')}</Text>
                </View>
                <Slider
                  style={{ marginTop: 20, width: Platform.OS === 'ios' ? width - 40 - 20 : width - 30, marginLeft: Platform.OS === 'ios' ? 10 : -5, padding: 0, margin: 0 }} maximumValue={99}
                  minimumValue={1}
                  value={this.state.doco_inmode}
                  thumbTintColor="#B3B1B1"
                  onSlidingComplete={(progress) => {
                    if (bt.isConnected == true) {
                      this.setState({ doco_inmode: progress, inChecked4: true, inChecked1: false, inChecked2: false, inChecked3: false });
                      console.log("inslider:", parseInt(progress));
                      this.state.chars[0].write(this.stringtoHex(this.state.in_level_command + parseInt(progress)));
                    }
                  }}
                  minimumTrackTintColor="#DA87F2"
                  // onValueChange={progress => this.setState({  })}
                />
                <View style={styles.remind_switch_box}>
                  <Text
                    style={styles.sliderText}
                    numberOfLines={1}
                  >1</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >25</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >50</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >75</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >99</Text>
                </View>

              </View>

              <Text style={styles.out_in_set_text}>{getString('cleansing_mode')}</Text>
              <View style={styles.cleanset_box} >
                <Text style={styles.out_in_set_text}>{getString('vibration_mode')}</Text>
                <View style={styles.cleandetal}>
                  <Checkbox
                    style={styles.syschose}
                    checked={this.state.cleanChecked1}
                    disabled={this.state.cleanChecked1}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ cleanChecked1: true, cleanChecked2: false, cleanChecked3: false, cleanChecked4: false, doco_speed: 25 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.speedatcommand }25`));
                      }
                    }}

                  />
                  <Text
                    style={styles.checkboxcleanText}
                    numberOfLines={1}
                  >{getString('hand_washing_mode')}</Text>
                  <Checkbox
                    style={styles.syschose1}
                    checked={this.state.cleanChecked2}
                    disabled={this.state.cleanChecked2}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ cleanChecked2: true, cleanChecked1: false, cleanChecked3: false, cleanChecked4: false, doco_speed: 50 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.speedatcommand }50`));
                      }
                    }}
                  />
                  <Text
                    style={styles.checkboxcleanText}
                    numberOfLines={1}
                  >{getString('clarifying_mode')}</Text>
                  <Checkbox
                    style={styles.syschose1}
                    checked={this.state.cleanChecked3}
                    disabled={this.state.cleanChecked3}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ cleanChecked3: true, cleanChecked1: false, cleanChecked2: false, cleanChecked4: false, doco_speed: 75 });
                        this.state.chars[0].write(this.stringtoHex(`${ this.state.speedatcommand }75`));
                      }
                    }}
                  />
                  <Text
                    style={styles.checkboxcleanText}
                    numberOfLines={1}
                  >{getString('skin_replenishin_mode')}</Text>
                  <Checkbox
                    style={styles.syschose1}
                    checked={this.state.cleanChecked4}
                    disabled={this.state.cleanChecked4}
                    checkedColor="lightgreen"
                    onValueChange={() => {
                      if (bt.isConnected == true) {
                        this.setState({ cleanChecked4: true, cleanChecked1: false, cleanChecked2: false, cleanChecked3: false, doco_speed: 75 });
                      }
                    }}
                  />
                  <Text
                    style={styles.checkboxcleanText}
                    numberOfLines={1}
                  >{getString('customize_mode')}</Text>
           

            
                </View>

                <Slider
                  style={{ marginTop: 20, width: Platform.OS === 'ios' ? width - 40 - 20 : width - 30, marginLeft: Platform.OS === 'ios' ? 10 : -5, padding: 0, margin: 0 }}
                  maximumValue={99}
                  minimumValue={1}
                  value={this.state.doco_speed}
                  thumbTintColor="#B3B1B1"
                  onSlidingComplete={(progress) => {
                    if (bt.isConnected == true) {
                      this.setState({ doco_speed: progress, cleanChecked4: true, cleanChecked1: false, cleanChecked2: false, cleanChecked3: false });
                      console.log("speedslider:", parseInt(progress));
                      this.state.chars[0].write(this.stringtoHex(this.state.speedatcommand + parseInt(progress)));
                    }
                  }}
                  minimumTrackTintColor="#DA87F2"
                  // onValueChange={progress => this.setState({  })}
                />
                <View style={styles.remind_switch_box}>
                  <Text
                    style={styles.sliderText}
                    numberOfLines={1}
                  >1</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >25</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >50</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >75</Text>
                  <Text
                    style={styles.sliderText1}
                    numberOfLines={1}
                  >99</Text>
                </View>
                <View style={styles.remind_switch_box}>
                  <Text style={styles.clean_time_text}>{getString('clean_remind')}</Text>
                  <Switch
                    style={{ width: 50, height: 25 }}
                    value={this.state.doco_remind}
                    onTintColor="lightgreen"
                    tintColor="#D1D2CB"
                    disabled={this.props.disabled}
                    onValueChange={(value) => {
                      if (bt.isConnected == true) {
                        let tmp_doco_remind = 0;
                        console.log("lixp remind:", value);
                        if (value) {
                          tmp_doco_remind = 1;
                          this.setState({ doco_remind: true });
                        } else {
                          tmp_doco_remind = 0;
                          this.setState({ doco_remind: false });
                        }
                        this.state.chars[0].write(this.stringtoHex(this.state.remindatcommand + tmp_doco_remind));
                      }
                    
                    }}
                  />
                </View>

              </View>
            



           
          

            </ScrollView>
          </View>
            

        );
      }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    marginTop: 0,
    height: 1800,
    marginLeft: 0
    // paddingTop:64,
  },
  topView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
    // backgroundColor:'yellow'
  },
  lasttimebuttom_class: {

    marginTop: 36,
    width: 150,
    zIndex: 100,
    height: 50
  },

  last_buttom_value_class: {
    display: 'flex',
    position: 'absolute',
    marginTop: 36,
    textAlign: 'center',
    // backgroundColor:'rgba(0,0,0,0)',
    zIndex: 112,
    width: 30,
    left: (width / 2) - 75,
    color: 'white',
    height: 50,
    lineHeight: 50,
    fontSize: 20
    // backgroundColor:'red'
  },
  last_buttom_text_class: {

    position: 'absolute',
    marginTop: 36,
    textAlign: 'left',
    // backgroundColor:'rgba(0,0,0,0)',
    zIndex: 102,
    width: 80,
    color: 'white',
    height: 50,
    lineHeight: 50,
    fontSize: 15,
    left: (width / 2) - 75 + 30
    // backgroundColor:'blue'
  },
  cat_device_class: {
    width: 150,
    height: 150,
    marginTop: 12,
    alignSelf: 'center'
  },
  circle_buttom_class: {
    position: 'absolute',
    top: 64,
    width: 221,
    height: 221
  },
  progress: {

    position: 'absolute',
    top: 64,
    width: 221,
    height: 221


  },
  skin_test_img_class: {
    marginTop: 60,
    width: 256,
    height: 50,
    zIndex: 100,
    alignSelf: 'center'
  },

  sys_set_text: {
    marginTop: 60,
    marginLeft: 10,
    color: '#A1A1A1',
    fontSize: 16,
    width: width - 50
    // backgroundColor:"red"
  },
  personal_set_text: {
    marginTop: 30,
    marginLeft: 10,
    color: '#A1A1A1',
    fontSize: 16
  },
  out_in_set_text: {
    marginTop: 20,
    marginLeft: 10,
    // color:'#A1A1A1'
    fontSize: 18
  },
  clean_time_text: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: width - 250,
    width: 130,
    fontSize: 18

  },
  systemline: {
    marginTop: 10,
    marginLeft: 0,
    width: width - 50,
    height: 1
    // backgroundColor:'gray',
    // color:'#A1A1A1',
  },
  line_class: {
    marginTop: 10,
    marginLeft: 0,
    width: width - 40,
    height: 1,
    backgroundColor: '#b3b1b1'
  },
  middleView: {
    flex: 1,
    flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0
  },
  out_mode_text: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0
  },
  outdetal: {
    flex: 1,
    flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0
  },
  indetal: {
    flex: 1,
    flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0
  },
  remind_switch_box: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0
    // alignItems:'center',
    // backgroundColor:'yellow'

  },
  cleandetal: {
    flex: 1,
    flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0,
    width: width,
    height: 300
    // backgroundColor:'red'
  },
  syschose: {
    marginTop: 20,
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  syschose1: {
    marginTop: 20,
    marginLeft: (width - 320 - 15 - 40 - 20) / 3,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  sys_mode_check_class1: {
    marginTop: 20,
    marginLeft: 30,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  sys_mode_check_class: {
    marginTop: 20,
    marginLeft: (width - 60 - 20 - 240) / 2,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  outmode_class1: {
    marginTop: 10,
    marginLeft: 20,
    // marginRight:40,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  outmode_class2: {
    marginTop: 10,
    marginLeft: (width - 200) / 3,
    // marginRight:40,
    width: 30,
    height: 30,
    borderRadius: 15

  },
  checkboxText: {
    marginTop: 26,
    fontSize: 14,
    width: 50,
    textAlign: 'center'

  },
  checkboxText3: {
    marginTop: 26,
    fontSize: 14,
    width: 60,
    textAlign: 'center'
  },
  checkboxcleanText: {
    marginTop: 26,
    marginLeft: 5,
    fontSize: 14,
    width: 50

  },
  sliderText: {
    marginTop: 0,
    marginLeft: 0,
    fontSize: 14,
    width: 20,
    textAlign: 'center'
    // backgroundColor:'red'
  },
  sliderText1: {
    marginTop: 0,
    marginLeft: (width - 40 - 5 - 100) / 4,
    fontSize: 14,
    width: 20,
    textAlign: 'center'

  },
  checkboxoutText: {
    marginTop: 18,
    marginLeft: 20,
    fontSize: 14,
    width: 30,
    textAlign: 'center'
    // backgroundColor:'yellow'
  },
  checkboxoutText1: {
    marginTop: 18,
    marginLeft: (width - 200) / 3,
    fontSize: 14,
    width: 30,
    textAlign: 'center'
    // backgroundColor:'yellow'
  },
  checkboxoutText2: {
    marginTop: 18,
    marginLeft: (width - 200) / 3,
    fontSize: 14,
    width: 30,
    textAlign: 'center'
    // backgroundColor:'yellow'
  },
  checkboxoutText3: {
    marginTop: 18,
    marginLeft: (width - 200) / 3 - 10,
    fontSize: 14,
    width: 60,
    textAlign: 'center'
    // backgroundColor:'yellow'
  },
  outset_box: {

    width: width - 40,
    backgroundColor: '#FFFFFF',
    height: 390,
    marginTop: 20,
    marginLeft: 0,
    borderRadius: 5
  },
  cleanset_box: {
    flex: 1,
    flexDirection: 'column',
    width: width - 40,
    backgroundColor: '#FFFFFF',
    height: 270,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 60
  },
  testText: {
    color: '#000000cc',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center'
  }








});

const KEY_OF_MAINPAGE = 'MainPage';
