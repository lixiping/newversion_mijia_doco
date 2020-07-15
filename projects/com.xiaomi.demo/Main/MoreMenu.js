'use strict';

import { Device, DeviceEvent, Host } from "miot";
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ActionSheetIOS, Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
var BUTTONS = [
  '测试对话框',
  '确定',
];

export default class MoreMenu extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: <TitleBar type='dark' title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        // header: <TitleBar type='dark' title='www' style={{ backgroundColor: '#fff' }}
        onPressLeft={() => { navigation.goBack(); }} />,
    };
  };

  constructor(props) {
    super(props);
    console.warn('强烈推荐使用「通用设置项」: `miot/ui/CommonSetting`, 你可以在「首页」-「教程」-「插件通用设置项」中查看使用示例')
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this._createMenuData();
    this.state = {
      dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))),
    };
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': '你好，开发者！',
        'func': () => {
          this.onShowDidButtonPress();
        }
      },
      {
        'name': '弹出Alert',
        'func': () => {
          alert('测试对话框');
        }
      },
      {
        'name': '弹出ActionSheet',
        'func': () => {
          this.showActionSheet();
        }
      },
      {
        'name': 'REACT-ART',
        'func': () => {
          this.showReactART();
        }
      },
      {
        'name': '高德地图',
        'func': () => {
          this.props.navigation.navigate('mhMapDemo', { 'title': '高德地图Demo' });
        }
      },
      {
        'name': '新目录结构获取图片方式测试',
        'func': () => {
          this.props.navigation.navigate('imagePathDemo', { 'title': '新目录结构获取图片方式测试' });
        }
      },
      {
        'name': '修改设备名称',
        'func': () => {
          Host.ui.openChangeDeviceName();
        }
      },
      {
        'name': '设备共享',
        'func': () => {
          Host.ui.openShareDevicePage();
        }
      },
      {
        'name': '检查固件升级',
        'func': () => {
          Host.ui.openDeviceUpgradePage();
        }
      },
      {
        'name': '删除设备',
        'func': () => {
          Host.ui.openDeleteDevice();
        }
      },
      {
        'name': '删除设备时自定义提示',
        'func': () => {
          Host.ui.openDeleteDevice("😘 🍚 🐰");
        }
      },
      {
        'name': '安全设置',
        'func': () => {
          Host.ui.openSecuritySetting();
        }
      },
      {
        'name': '常见问题',
        'func': () => {
          Host.ui.openHelpPage();
        }
      },
      {
        'name': '反馈问题',
        'func': () => {
          Host.ui.openFeedbackInput();
        }
      },
      {
        'name': '语音设备授权',
        'func': () => {
          Host.ui.openVoiceCtrlDeviceAuthPage();
        }
      },
      {
        'name': '分享',
        'func': () => {
          Host.ui.openShareListBar('小米智能家庭', '小米智能家庭', { uri: 'https://avatars3.githubusercontent.com/u/13726966?s=40&v=4' }, 'https://iot.mi.com/new/index.html');
        }
      },
      {
        'name': '获取设备列表数据',
        'func': () => {
          Host.ui.getDevicesWithModel(Device.model).then(devices => {
            alert(JSON.stringify(devices));
          }).catch(err => {
            alert("未获取到设备");
          })
        }
      },
      {
        'name': "开启倒计时",
        'func': () => {
          let setting = { onMethod: "power_on", offMethod: 'power_off', onParam: 'on', offParam: 'off', identify: 'aaaa' }
          //   let setting = {}
          Host.ui.openCountDownPage(false, setting);
        }
      },
      {
        'name': "开启定时",
        'func': () => {
          Host.ui.openTimerSettingPageWithVariousTypeParams("power_on", ["on", "title"], 'off', "title")
        }
      },
      {
        'name': '打开自动化界面',
        'func': () => {
          Host.ui.openIftttAutoPage();
        }
      },
      {
        'name': '位置管理',
        'func': () => {
          Host.ui.openRoomManagementPage();
        }
      },
      {
        'name': '时区设置',
        'func': () => {
          Host.ui.openDeviceTimeZoneSettingPage();
        }
      },
      {
        'name': '添加到桌面',
        'func': () => {
          Host.ui.openAddToDesktopPage();
        }
      },
      {
        'name': '蓝牙网关',
        'func': () => {
          Host.ui.openBtGatewayPage();
        }
      },
      {
        'name': 'Android手机蓝牙设置页面',
        'func': () => {
          Host.ui.openPhoneBluSettingPage();
        }
      },
      {
        'name': '查看使用条款和隐私协议',
        'func': () => {
          const licenseURL = require('../Resources/raw/license_zh.html');
          const policyURL = require('../Resources/raw/privacy_zh.html');
          Host.ui.privacyAndProtocolReview('软件许可及服务协议', licenseURL, '隐私协议', policyURL);
        }
      },
      {
        'name': '授权使用条款和隐私协议',
        'func': () => {
          const licenseURL = require('../Resources/raw/license_zh.html');
          const policyURL = require('../Resources/raw/privacy_zh.html');
          let licenseKey = "license-" + Device.deviceID;
          Host.storage.get(licenseKey).then((res) => {
            // if (res === true) {
            //   // 表示已经授权过
            // } else {
            Host.ui.openPrivacyLicense('软件许可及服务协议', licenseURL, '隐私协议', policyURL).then((res) => {
              if (res) {
                // 表示用户同意授权
                Host.storage.set(licenseKey, true).then((res) => { });
              }
            }).catch((error) => {
              console.log(error)
            })
            // }
          }).catch((error) => {

          });

        }
      }
    ];
  }

  componentDidMount() {
    this.listenter = DeviceEvent.deviceTimeZoneChanged.addListener((val) => {
      console.log("deviceTimeZoneChanged", val);
    })
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require("../Resources/sub_arrow.png")} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    console.log("row" + rowID + "clicked!");
    this._menuData[rowID].func();
  }

  onShowDidButtonPress() {
    this.props.navigation.navigate('helloDeveloper');
  }

  showReactART() {
    this.props.navigation.navigate('helloReactART');
  }

  showActionSheet() {
    if (Host.isIOS)
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        destructiveButtonIndex: 1,
      },
        (buttonIndex) => {

        });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0,
  },

  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    alignSelf: 'stretch',
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1,
  },
  subArrow: {
    width: 7,
    height: 14,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20,
  }
});
