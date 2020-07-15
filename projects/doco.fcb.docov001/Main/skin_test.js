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
import { ImageButton, TitleBarBlack, MessageDialog } from 'miot/ui';
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import { Bluetooth, BluetoothEvent, DeviceEvent, Device, Service, ProgressDialog } from "miot";
import { Package } from "miot";
import * as Progress from 'react-native-progress';
import Separator from 'miot/ui/Separator';
import Radio from 'miot/ui/Radio';
import Checkbox from 'miot/ui/Checkbox/Checkbox';
import MHCard from 'miot/ui/Card/MHCard';
import Card from 'miot/ui/Card';
import Switch from 'miot/ui/Switch';
import { getString } from './MHLocalizableString';
import './globle_const.js';
import NavigationBar from 'miot/ui/NavigationBar';
const { width, height } = Dimensions.get('window');
const ReactNative = require('react-native');
const {
  AppState
} = ReactNative;
import { bt } from "./MainPage";
const DEMOCHAR = '00000001-0000-1000-8000-00805f9b34fb';
let status_enable = false;
export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
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
      systemChecked2: false,
      systemChecked3: false,
      outChecked1: true,
      outChecked2: false,
      outChecked3: false,
      outChecked4: false,
      inChecked1: true,
      inChecked2: false,
      inChecked3: false,
      inChecked4: false,
      cleanChecked1: true,
      cleanChecked2: false,
      cleanChecked3: false,
      cleanChecked4: false,
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
      doco_tx_uuid: "457871E8-D516-4CA1-9116-57D0B17B3456",
      doco_rx_uuid: "457871E8-D516-4CA1-9116-57D0B17B3412",
      test_text_string: "请握住机身将传感器贴近皮肤",
      latest_time_value: 6
      // altervisible1:false,

    };
  }
    static navigationOptions = ({ navigation }) => {
      return {
        header:        
            <NavigationBar
              backgroundColor="#ffffff"
              type={NavigationBar.TYPE.LIGHT}
              left={[{
                key: NavigationBar.ICON.BACK,
                onPress: (_) => {
                  navigation.goBack();
                }
              }]}
              right={[{
                key: NavigationBar.ICON.CLOSE,
                onPress: (_) => {
                  if (bt.isConnected) {
                    bt.disconnect();
                  }
                  Package.exit();

                }
              }]}
              title={getString('Skin_detection')}
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

    } else if (nextAppState != null && nextAppState === 'background') {
      if (bt.isConnected) {
        bt.disconnect();
        Package.exit();
        console.log("disconnect");
      }
    }
  }
  componentDidMount() {
    this._s3 = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
      // if (service.UUID.indexOf("ffd5")>0){
      console.log("lixp receive", character.UUID, this.hextoString(value));// 刷新界面
                
      this.state.ble_reseve_data = this.hextoString(value);
      if (this.state.ble_reseve_data.substring(0, 8) == '+skin_n:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        console.log('skin_n :', value_prcess);
        this.state.skin_noise = value_prcess;
      } else if (this.state.ble_reseve_data.substring(0, 8) == '+skin_l:') {
        var value_tmp = this.state.ble_reseve_data.slice(this.state.ble_reseve_data.indexOf(':') + 1, this.state.ble_reseve_data.indexOf('\r'));
        var value_prcess = parseInt(value_tmp);
        console.log('skin_l :', value_prcess);
        if (value_prcess > (this.state.skin_noise + 3)) {
          let last_skin_seconds = this.state.latest_time_value - 1;
          this.setState({
            latest_time_value: last_skin_seconds,
            test_text_string: getString('skin_testing_txt')
          });
          if (last_skin_seconds == 0) {
            if (value_prcess >= 700) {
              // that.setData({
              global.constants.skin_score = 99;
              global.constants.skin_rst_text = getString('anti_destiny');
              global.constants.skin_status_text = getString('nice_plus');
              global.constants.skin_advice_text = getString('advice1');
              // skin_test_value: 99,
              // })
            } else if (value_prcess < 700 && value_prcess >= 140) {
              global.constants.skin_score = parseInt(value_prcess / 10) + 30;
              global.constants.skin_rst_text = getString('good_humid');
              global.constants.skin_status_text = getString('nice_skin');
              global.constants.skin_advice_text = getString('advice1');
            } else if (value_prcess < 140 && value_prcess >= 80) {
              global.constants.skin_score = value_prcess - 40;
              global.constants.skin_rst_text = getString('normal_humid');
              global.constants.skin_status_text = getString('nice_skin');
              global.constants.skin_advice_text = getString('advice1');
            } else if (value_prcess < 80 && value_prcess >= 50) {
              global.constants.skin_score = value_prcess - 30;
              global.constants.skin_rst_text = getString('slight_shortage_water');
              global.constants.skin_status_text = getString('good_skin');
              global.constants.skin_advice_text = getString('advice2');

            } else if (value_prcess < 50 && value_prcess >= 10) {
              global.constants.skin_score = value_prcess;
              global.constants.skin_rst_text = getString('drting_water_shortage');
              global.constants.skin_status_text = getString('warning_to_skin');
              global.constants.skin_advice_text = getString('advice3');

            } else {
              global.constants.skin_score = value_prcess + 10;
              global.constants.skin_rst_text = getString('drting_water_shortage');
              global.constants.skin_status_text = getString('warning_to_skin');
              global.constants.skin_advice_text = getString('advice3');
            }
            // global.constants.skin_score=value_prcess;
            this.setState({
              latest_time_value: 6,
              test_text_string: getString('hold_device')
            });
            global.constants.doco_charact_g[0].write(this.stringtoHex(this.state.skin_test_off_command));
            this.props.navigation.navigate('skin_rst', { title: 'test' });
          }
        } else {
          this.state.skin_noise = value_prcess;
          this.setState({
            latest_time_value: 6,
            test_text_string: getString('hold_device')
          });
        }
      }
                

      // }
      // this.setState({buttonText:"bluetoothCharacteristicValueChanged:" + character.UUID + ">" + value});
    });

  }
  componentWillMount() {
    console.log("lixp bingin test");
    global.constants.doco_charact_g[0].write(this.stringtoHex(this.state.skin_test_on_command));
  }

  /**
     * 更新固件后重新链接设备
     */

  _handleAppStateChange(appState) {

  }


  componentWillUnmount() {
    global.constants.doco_charact_g[0].write(this.stringtoHex(this.state.skin_test_off_command));
    this._s3.remove();
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
      console.log("begin skin test");
    }
    render() {
      return (
        <View style={styles.container} >


          <View style={styles.topView}>  
            <Text style={styles.skin_remind_text_class}>{this.state.test_text_string}</Text>        
          </View>

          <View style={styles.middleView}>
            <Image style={styles.skin_test_img_class} source={require("../Resources/girl.png")} />
          </View>
          <View style={styles.time_contbox}>
            <Image style={styles.lasttime_down_class} source={require("../Resources/lasttime_down.png")} />
            <Image style={styles.lasttime_up_class} source={require("../Resources/lasttime_up.png")} />
            <Text style={styles.latest_time_value_class}>{this.state.latest_time_value}</Text>     
          </View> 
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
    zIndex: 100
    // height:600,
    // height:1800,
  },
  topView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
    // height:40,
  },
  skin_test_img_class: {
    marginTop: 0,
    marginBottom: 50,
    width: 220,
    height: 320,
    zIndex: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  lasttime_down_class: {
    marginTop: 40,
    width: 70,
    height: 70,
    zIndex: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  lasttime_up_class: {
    marginTop: -66,
    // marginBottom:100,
    width: 64,
    height: 64,
    zIndex: 101,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  skin_remind_text_class: {
    marginTop: 50,
    // marginLeft:25,
    // color:'#000000',
    fontSize: 24
  },
  middleView: {
    flex: 1,
    flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    marginTop: 0
  },
  time_contbox: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    zIndex: 100
  },
  latest_time_value_class: {
    // position:'absolute',
    marginTop: -54,
    // marginLeft:162,
    // color:'#000000',
    alignSelf: 'center',
    fontSize: 40,
    zIndex: 102,
    color: '#FAFAFA'
  },
  latest_time_union_class: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 195,
    // color:'#000000',
    fontSize: 34,
    zIndex: 102,
    color: '#FAFAFA'
  }


});

const KEY_OF_MAINPAGE = 'MainPage';
