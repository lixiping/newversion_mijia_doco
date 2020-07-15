import { ListItemWithSwitch } from 'miot/ui/ListItem';
import MHDatePicker from 'miot/ui/MHDatePicker';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, View } from 'react-native';
// import tr from "miot/resources/strings/tr";
import { Styles } from "miot/resources";

export default class MHDatePickerDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title="时间选择器"
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => navigation.goBack()}
        />
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      value: false,
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      valueText: '',
      valueText1: '',
      valueText2: '',
      valueText3: '',
      valueText4: '',
      valueText5: '',
      valueText6: '',
      current: [2019, 6, 3]
    };
  }

  render() {

    // Date 类型的传参有三种写法
    // 第一种
    // let current = new Date();
    // current.setDate(current.getDate() - 1); // 初始值为昨天，‘去日不可追’

    // let min = new Date();
    // min.setFullYear(2018);
    // min.setMonth(3);
    // min.setDate(16); // 2018-04-16

    // let max = new Date();
    // max.setFullYear(current.getFullYear() + 10);
    // max.setMonth(3);
    // max.setDate(16); // 十年以后的-04-16

    // 第二种
    // let current = ['2019', '06', '03'];
    // let min = ['2018', '04', '16'];
    // let max = ['2029', '04', '16'];

    // 第三种
    // let current = [2019, 6, 3];
    let min = [2018, 4, 16];
    let max = [2029, 4, 16];

    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <Separator />
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <ListItemWithSwitch
              title="开始日期"
              value={this.state.value}
              valueText={this.state.valueText}
              onPress={() => this.setState({ visible: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="开启时间(24小时制)"
              value={this.state.value1}
              valueText={this.state.valueText1}
              onPress={() => this.setState({ visible1: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="开启时间(12小时制)"
              value={this.state.value2}
              valueText={this.state.valueText2}
              onPress={() => this.setState({ visible2: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="开启时间(12小时制)-大字体适配"
              value={this.state.value6}
              valueText={this.state.valueText6}
              onPress={() => this.setState({ visible6: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="选择一段时间"
              value={this.state.value3}
              valueText={this.state.valueText3}
              onPress={() => this.setState({ visible3: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="开始日期(自定义)"
              value={this.state.value4}
              valueText={this.state.valueText4}
              onPress={() => this.setState({ visible4: true })}
              onValueChange={(value) => console.log(value)}
            />
            <ListItemWithSwitch
              title="选择一段时间(自定义)"
              value={this.state.value5}
              valueText={this.state.valueText5}
              onPress={() => this.setState({ visible5: true })}
              onValueChange={(value) => console.log(value)}
            />
            <MHDatePicker
              visible={this.state.visible}
              title="开启日期"
              type={MHDatePicker.TYPE.DATE}
              onDismiss={() => this.onDismiss('')}
              onSelect={(res) => this.onSelect(res, '')}
            />
            <MHDatePicker
              visible={this.state.visible1}
              title="开始时间"
              type={MHDatePicker.TYPE.TIME24}
              onDismiss={() => this.onDismiss('1')}
              onSelect={(res) => this.onSelect(res, '1')}
            />
            <MHDatePicker
              visible={this.state.visible2}
              title="开始时间"
              type={MHDatePicker.TYPE.TIME12}
              onDismiss={() => this.onDismiss('2')}
              onSelect={(res) => this.onSelect(res, '2')}
            />
            <MHDatePicker
              visible={this.state.visible6}
              title="开始时间-字体大小不随系统字体大小变化而变化-我设置最多显示两行"
              datePickerStyle={{
                unlimitedHeightEnable: true,
                allowFontScaling: false,
                titleNumberOfLines: 2,
                titleStyle: { fontSize: 28, lineHeight: 30, padding: 10 },
                subTitleStyle: { fontSize: 24, lineHeight: 28 },
                leftButtonStyle: { fontSize: 26, lineHeight: 30 },
                rightButtonStyle: { fontSize: 26, lineHeight: 30 },
                pickerInnerStyle: {
                  lineColor: Styles.common.hairlineColor,
                  textColor: '#666666',
                  fontSize: 25,
                  selectTextColor: "#333333",
                  selectFontSize: 30,
                  unitTextColor: '#333333',
                  unitFontSize: 20,
                  rowHeight: 58,
                  selectBgColor: "#f3f3f3"
                }
              }}
              type={MHDatePicker.TYPE.TIME12}
              onDismiss={() => this.onDismiss('6')}
              onSelect={(res) => this.onSelect(res, '6')}
            />
            <MHDatePicker
              visible={this.state.visible3}
              title="想要睡多久呢"
              type={MHDatePicker.TYPE.SINGLE}
              singleType={MHDatePicker.SINGLE_TYPE.MINUTE}
              onDismiss={() => this.onDismiss('3')}
              onSelect={(res) => this.onSelect(res, '3')}
            />
            <MHDatePicker
              animationType="slide"
              visible={this.state.visible4}
              title="自定义标题(自己处理多语言)"
              showSubtitle={true}
              confirmColor="#f0ac3d"
              type={MHDatePicker.TYPE.DATE}
              current={this.state.current}
              min={min}
              max={max}
              onSelect={(res) => this.onSelect(res, '4')}
              onDismiss={() => this.onDismiss('4')}
            />
            <MHDatePicker
              animationType="slide"
              visible={this.state.visible5}
              title="自定义标题(自己处理多语言)，隐藏副标题"
              showSubtitle={false}
              confirmColor="#f0ac3d"
              type={MHDatePicker.TYPE.SINGLE}
              singleType={MHDatePicker.SINGLE_TYPE.MINUTE}
              current={['12']}
              min={['10']}
              max={['15']}
              onSelect={(res) => this.onSelect(res, '5')}
              onDismiss={() => this.onDismiss('5')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ current: [2019, 7, 10] });
    }, 3000);
  }

  // `Modal` 隐藏了，父组件必须要同步更新状态，但不必用 `setState` 触发 `render`
  onDismiss(index) {
    console.log('onDismiss');
    // this.state['visible' + index] = false;
    this.setState({ [`visible${ index }`]: false });
  }

  onSelect(res, index) {
    console.log(res);
    this.setState({ [`valueText${ index }`]: res.rawString });
  }

}
