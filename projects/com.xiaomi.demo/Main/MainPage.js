'use strict';

import {
  Device, Package, Host, Entrance, Service, DeviceEvent, PackageEvent
} from "miot";
import TitleBar from "miot/ui/TitleBar";
import React from 'react';
import {
  Image, PixelRatio, StyleSheet, Text, TouchableHighlight, View, ListView
} from 'react-native';
import { getString } from './MHLocalizableString';

export default class MainPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBar
            type="dark"
            title={navigation.state["params"] ? navigation.state.params.name : Device.name}
            subTitle={getString('NUM_PHOTOS', { 'numPhotos': 1 })}
            onPressLeft={() => {
              Package.exit();
            }}
            onPressRight={() => {
              navigation.navigate('Setting', { 'title': '设置' });
            }} />
        </View>
    };
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._createMenuData();
    this.state = { dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))) };
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': '常用功能',
        'func': () => {
          this.props.navigation.navigate('tutorialDemo', { title: '常用功能' });
        }
      },
      {
        'name': '设备控制(Device)',
        'func': () => {
          this.props.navigation.navigate('DeviceControl', { title: '设备控制(Device)' });
        }
      },
      {
        'name': 'Native交互(Host)',
        'func': () => {
          this.props.navigation.navigate('HostDemo', { title: 'Native交互(Host)' });
        }
      },
      {
        'name': '接口服务(Service)',
        'func': () => {
          this.props.navigation.navigate('ServiceDemo', { title: '接口服务(Service)' });
        }
      },
      {
        'name': 'UI能力(miot/ui)',
        'func': () => {
          this.props.navigation.navigate('UIDemo', { title: 'UI能力(miot/ui)' });
        }
      },
      {
        'name': '第三方库能力',
        'func': () => {
          this.props.navigation.navigate('ThirdPartyDemo', { title: '第三方库能力' });
        }
      },
      {
        'name': '旧-设置页面(不推荐使用)',
        'func': () => {
          this.props.navigation.navigate('moreMenu', { title: '设置页面(不推荐使用)' });
        }
      }
    ];
  }

  componentWillUnmount() {
    this._deviceOnlineListener && this._deviceOnlineListener.remove();
  }

  componentWillMount() {
    // const licenseURL = require('../Resources/raw/license_zh.html');
    // const policyURL = require('../Resources/raw/privacy_zh.html');
    // let options = {
    //   hideAgreement: false,
    //   hideUserExperiencePlan: true,
    //   agreementURL: licenseURL,
    //   privacyURL: policyURL
    // }
    // Host.ui.alertLegalInformationAuthorization(options).then((res) => {
    // }).catch((error) => {
    //   console.log(error)
    // })
    this._deviceOnlineListener = DeviceEvent.deviceStatusChanged.addListener((device, newstatus) => {
      console.log(device.isOnline);
      alert(`设备状态改变:${ JSON.stringify(newstatus) }`);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  componentDidMount() {
    console.log("MainPage  componentDidMount...");
    if (Package.pageParams.isBackToMainPage && Package.entrance !== Entrance.Main) {
      this.props.navigation.navigate(Package.entrance);
    }
    Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then((res) => {
      let alreadyAuthed = true;
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
      } else {
        alreadyAuthed = false;
      }
      if (alreadyAuthed) {
        console.log("已经授权");
        return;
      }
      const licenseURL = require('../Resources/raw/license_zh.html');
      const privacyURL = require('../Resources/raw/privacy_zh.html');
      let options = {};
      options.agreementURL = licenseURL;
      options.privacyURL = privacyURL;
      options.experiencePlanURL = licenseURL;
      options.hideAgreement = false;
      options.hideUserExperiencePlan = false;
      Host.ui.alertLegalInformationAuthorization(options).then((res) => {
        if (res === 'ok' || res === true || res === 'true') {
          Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': true }) } }]);
          PackageEvent.packageAuthorizationAgreed.emit();
          console.log("同意协议，进入插件");
        } else {
          console.log("不同意协议，插件退出");
          Package.exit();
          return;
        }
      }).catch((error) => {
        console.log(error);
      });
    }).catch({});
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowID)}>
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
    this._menuData[rowID].func();
  }

}





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
    marginTop: 0
  },
  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1
  },
  list: { alignSelf: 'stretch' },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  subArrow: {
    width: 7,
    height: 14
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20
  }
});
