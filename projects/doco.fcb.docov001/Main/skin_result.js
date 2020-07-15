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
                  // this.back_to_main()
                  global.constants.doco_charact_g[0].write("61742b736b696e3d30");
                  global.constants.skin_rst_backto_main = 1;
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
              title={getString('skin_test_result')}
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


  }
  componentWillMount() {
    // global.constants.doco_charact_g[0].write(this.stringtoHex(this.state.skin_test_on_command));
  }

  /**
     * 更新固件后重新链接设备
     */

  _handleAppStateChange(appState) {

  }


  componentWillUnmount() {

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

    back_to_main() {
      let resetActiom = StackActions.reset({
        index: 0, // 默认打开actions中的第几个页面
        actions: [// actions是页面集合
          // NavigationActions.navigate({ routeName: 'One' }),
          // NavigationActions.navigate({ routeName: 'Tow' }),
          NavigationActions.navigate({ routeName: 'MainPage' })// 这里有几个就保留几个，点击完成后就会重构导航器
        ]
      });
      this.props.navigation.dispatch(resetActiom);
    }
    skintest_fun= () => {
      // var that=this;
      console.log("begin skin test");
      // if(bt.isConnected){
      global.constants.doco_charact_g[0].write(this.stringtoHex(this.state.skin_test_on_command));
      // that.props.navigation.navigate('skin', { title: 'test' });
      this.props.navigation.goBack();

      // that.props.navigation.navigate('skin', { title: 'test' });
      // }
    }
    render() {
      return (
        <View style={styles.container} >

          <View style={styles.middleView}>
            <Image style={styles.skin_test_img_class} source={require("../Resources/skin_test_score.png")} />
            <Text style={styles.last_buttom_value_class}>{global.constants.skin_score}</Text>
            <Image style={styles.skin_test_res_img_class} source={require("../Resources/lasttimebuttom.png")} />
            <Text style={styles.skin_rst_text_class}>{global.constants.skin_rst_text}</Text>
          </View>
          <View style={styles.advervance_box_class}>
            <View style={styles.advervance_box1_class}>
              <Image style={styles.skin_status_img1_class} source={require("../Resources/skin_advice.png")} />
              <Text style={styles.skin_status_text_class}>{getString('skin_status')}</Text>
              <Text style={styles.skin_status_text1_class}>{global.constants.skin_status_text}</Text>
            </View> 
            <View style={styles.advervance_box2_class}>
              <Image style={styles.skin_status_img2_class} source={require("../Resources/skin_advice.png")} />
              <Text style={styles.skin_advice_start_text_class}>{getString('skinadvice')}</Text>
              <Text style={styles.skin_advice_text1_class}>{global.constants.skin_advice_text}</Text>
            </View> 
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

  skin_test_img_class: {
    marginTop: 0,
    // marginBottom:50,
    width: 180,
    height: 180,
    zIndex: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  retest_buttome_class: {
    position: 'absolute',
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 40,
    // marginBottom:50,
    width: 100,
    height: 100,
    zIndex: 100,
    // alignSelf: 'center',
    resizeMode: 'contain'
  },
  retest_top_class: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 50,
    marginBottom: 20,
    // marginBottom:50,
    width: 80,
    height: 80,
    zIndex: 100,
    // alignSelf: 'center',
    resizeMode: 'contain'
  },
  cat_device_class: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 60,
    marginBottom: 30,
    // marginBottom:50,
    width: 60,
    height: 60,
    zIndex: 100,
    // alignSelf: 'center',
    zIndex: 102,
    resizeMode: 'contain'
  },
  skin_test_res_img_class: {
    marginTop: 0,
    // marginBottom:50,
    width: 170,
    height: 44,
    zIndex: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  skin_status_img1_class: {
    position: 'absolute',
    marginTop: 20,
    // marginBottom:40,
    marginLeft: 10,
    width: 100,
    height: 40,
    zIndex: 100,
    // alignSelf: 'center',
    resizeMode: 'contain'
  },
  skin_status_img2_class: {
    position: 'absolute',
    marginTop: 44,
    // marginBottom:80,
    marginLeft: 10,
    width: 100,
    height: 40,
    zIndex: 100,
    // alignSelf: 'center',
    resizeMode: 'contain'
  },
  lasttime_down_class: {
    marginTop: 30,
    width: 100,
    height: 100,
    zIndex: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  lasttime_up_class: {
    marginTop: -90,
    // marginBottom:100,
    width: 80,
    height: 80,
    zIndex: 101,
    alignSelf: 'center',
    resizeMode: 'contain'
  },

  middleView: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems:'center',
    // backgroundColor: 'rgb(235,235,236)',
    zIndex: 100,
    marginTop: 0
  },
  time_contbox: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    zIndex: 100
  },
  last_buttom_value_class: {
    position: 'absolute',
    marginTop: 80,
    marginLeft: 62,
    // color:'#000000',
    fontSize: 60,
    zIndex: 102,
    color: '#D473E6'
  },
  skin_rst_text_class: {
    position: 'absolute',
    marginTop: 190,
    marginLeft: 48,
    // color:'#000000',
    fontSize: 24,
    zIndex: 102,
    color: '#FAFAFA'
  },
  skin_status_text_class: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 20,
    // color:'#000000',
    fontSize: 20,
    zIndex: 102
    // color:'#FAFAFA'
  },
  skin_status_text1_class: {
    // position:'absolute',
    flex: 1,
    flexDirection: 'row',
    marginTop: 74,
    // marginBottom:20,
    marginLeft: 20,
    // color:'#000000',
    fontSize: 18,
    zIndex: 102
    // color:'#FAFAFA'
  },
  skin_retest_text_class: {
    position: 'absolute',
    // flex: 1,
    // flexDirection: 'row',
    marginTop: 140,
    // marginBottom:20,
    marginLeft: 36,
    // color:'#000000',
    fontSize: 24,
    zIndex: 102,
    color: '#D473E6'
  },

  skin_advice_text1_class: {
    // position:'absolute',
    flex: 1,
    flexDirection: 'row',
    marginTop: 94,
    // marginBottom:20,
    marginLeft: 20,
    // color:'#000000',
    fontSize: 18,
    zIndex: 102
    // height:120,
    // color:'#FAFAFA'
  },
  skin_advice_start_text_class: {
    position: 'absolute',
    marginTop: 54,
    marginLeft: 20,
    // color:'#000000',
    fontSize: 20,
    zIndex: 102
    // color:'#FAFAFA'
  },
  skin_advice_end_text_class: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
    // color:'#000000',
    fontSize: 20,
    zIndex: 102
    // color:'#FAFAFA'
  },
  latest_time_union_class: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 195,
    // color:'#000000',
    fontSize: 34,
    zIndex: 102,
    color: '#FAFAFA'
  },
  advervance_box_class: {
    // flex: 1,
    // flexDirection: 'column',
    position: 'absolute',
    width: width - 40,
    backgroundColor: '#FFFFFF',
    height: 330,
    marginTop: 250,
    // marginBottom:100,
    marginLeft: 0,
    borderRadius: 5
  },
  advervance_box1_class: {
    position: 'absolute'
    // flex: 1,
    // flexDirection: 'row',
    // width:width-40,
    // height:40,
  },
  advervance_box2_class: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70
    // height:120,
    // flex: 1,
    // flexDirection: 'row',
    // marginBottom:30,
  },
  img_box2_class: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 200
    // marginBottom:0,
  }
});

const KEY_OF_MAINPAGE = 'MainPage';
