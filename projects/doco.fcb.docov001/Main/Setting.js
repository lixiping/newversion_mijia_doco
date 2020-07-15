'use strict';

import { Entrance, Package } from "miot";
import { strings, Styles } from 'miot/resources';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import { firstAllOptions, secondAllOptions } from "miot/ui/CommonSetting/CommonSetting";
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const { first_options, second_options } = SETTING_KEYS;

export default class Setting extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title={strings.setting}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => {
            global.constants.app_real_status = 0;
            navigation.goBack();
          }
          }
        />
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      sliderValue: 25,
      switchValue: false,
      showDot: []
    };
  }

  render() {
    // 显示部分一级菜单项
    const firstOptions = [
      // first_options.FIRMWARE_UPGRADE,
      // first_options.VOICE_AUTH,
      
      first_options.SHARE,
      // first_options.BTGATEWAY,
      // first_options.IFTTT,
      first_options.LEGAL_INFO,
      first_options.LOCATION,
      first_options.NAME,
      first_options.MORE,
      first_options.HELP  
      /*
     first_options.FIRMWARE_UPGRADE,
     first_options.VOICE_AUTH,
     first_options.SHARE,
     first_options.BTGATEWAY,
     first_options.IFTTT,
     first_options.MEMBER_SET,
     first_options.BTGATEWAY,
     first_options.LOCATION,
      //first_options.MEMBER_SET,
      //first_options.BTGATEWAY,
      */
    ];
    // 显示部分二级菜单项
    const secondOptions = [
      // second_options.AUTO_UPGRADE,
      second_options.TIMEZONE
    ];
    // 显示固件升级二级菜单
    const extraOptions = {
      // showUpgrade: true,
      // upgradePageKey: 'FirmwareUpgrade',
      // licenseUrl: require('../resources/html/license_zh.html'),
      // policyUrl: require('../resources/html/privacy_zh.html'),
      deleteDeviceMessage: '真的要删除？你不再考虑考虑',
      excludeRequiredOptions: [secondAllOptions.SECURITY],
      option: {
        privacyURL: require('../Resources/raw/privacy_zh.html'),
        agreementURL: require('../Resources/raw/license_zh.html'),
        experiencePlanURL: '',
        hideAgreement: true,
        hideUserExperiencePlan: true
      },
      syncDevice: true
      // networkInfoConfig: -1,
    };
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={styles.blank} />
          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={firstOptions}
            showDot={this.state.showDot}
            secondOptions={secondOptions}
            extraOptions={extraOptions}
          />
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }





  componentDidMount() {
    // TODO: 拉取功能设置项里面的初始值，比如开关状态，slider的value
    setTimeout((_) => this.setState({
      switchValue: true,
      sliderValue: 75,
      showDot: [
        first_options.FIRMWARE_UPGRADE
      ]
    }), 2000);
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  featureSetting: {
    backgroundColor: '#fff'
  },
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  titleContainer: {
    height: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: Styles.common.padding
  },
  title: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 14
  }
});
