import LocalizedStrings from '../CommonModules/LocalizedStrings';
import IntlMessageFormat from 'intl-messageformat';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/zh-Hans.js';
import 'intl/locale-data/jsonp/zh-Hant.js';
import 'intl/locale-data/jsonp/ko-KR.js';
export const strings = {
  'en': {
    device_title: 'DOCO micro current essence import beauty instrument',
    battery_level: '%   Battery',
    System_mode: 'System mode',
    mild_mode: 'Mild',
    daily_mode: 'Daily',
    tolerance_mode: 'Tolerant',
    prefernce_setting: 'Preference',
    essence_import_export_mode: 'Micro current essence introduction',
    microcurrent_export_mode: 'Microcurrent export',
    weak_mode: 'W',
    normail_mode: 'M',
    strong_mode: 'S',
    customize_mode: 'Custom',
    micro_current_essence_introduction: 'Micro current essence introduction',
    cleansing_mode: 'Cleansing mode',
    vibration_mode: 'Vibration mode',
    hand_washing_mode: 'W  ',
    clarifying_mode: 'M  ',
    skin_replenishin_mode: 'S  ',
    clean_remind: 'Clean reminder',
    data_syn: 'Data Synchronous...',
    Skin_detection: 'SKin detection',
    anti_destiny: 'Anti-destiny water moistening',
    good_humid: '  Good',
    normal_humid: ' Normal',
    slight_shortage_water: 'Slight Dry',
    drting_water_shortage: 'Very dry',
    skin_testing_txt: 'Detecting, please do not move DOCO',
    hold_device: 'Please hold the body and put the sensor close to the skin',
    skin_test_result: 'Detection result',
    skin_status: 'Status',
    skinadvice: 'Advice',
    nice_plus: 'Great! You have become the "Anti-destiny water fairy", keep it up',
    nice_skin: 'Great! You have become the "water Fairy", keep it up',
    good_skin: 'Little fairy, your skin is still hydrated, make further efforts',
    warning_to_skin: 'Warning! Fairy, your skin needs water',
    advice1: 'The most important thing for skin maintenance is to replenish water. First, pay attention to the water in the body, then replenish water in vitro. You must take 2-3 liters of water every day, which is good for maintaining the normal metabolism of the skin.',
    advie2: 'Choose a moisturizing product with a moisturizing effect. After you wash your face, you can comfortably make a facial mask. It relieves the body‘s fatigue and relieves the skin’s pressure for a whole day. If you have the conditions or time, you can go to the nearby beauty salon to do a set of skin care, deeply nourish the skin once a week, and the skin you insist on will become more and more young',
    advice3: ' The steps of skin care should be done well. In the morning and evening, we should pay attention to water replenishment, do a good job of deep cleaning, so that the follow-up water replenishment nutrition can be better absorbed. When the skin is not completely dried, padding the skin care products，and use the essence import function to promote the essence absorption, achieve better maintenance effect.',
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    t1: 'tttttttt',
    t2: ['tl{1}'],
    t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [(v) => v > 100, 'more']],
    t4: {
      t5: [() => 'akjasdkljflkasdjf'],
      t6: ['yyy{1}']
    },
    setting: 'setting',
    featureSetting: 'Shortcut settings',
    commonSetting: 'Common settings',
    deviceName: 'Device name',
    locationManagement: 'Locations',
    shareDevice: 'Share device',
    ifttt: 'Automation',
    firmwareUpgrate: 'Check for firmware updates',
    moreSetting: 'Additional settings',
    addToDesktop: 'Add to Home screen',
    resetDevice: 'Reset device',
    licenseAndPolicy: 'User Agreement & Privacy Policy',
    device_more_activity_rename: 'Rename',
    device_more_activity_about: 'About',
    device_more_activity_help: 'Tutorial',
    device_more_activity_firmware_update: 'Check for firmware updates',
    device_more_activity_noti_quick_op: 'Notification center shortcuts',
    device_more_activity_unbind: 'Remove device',
    device_more_activity_feedback: 'Feedback',
    device_more_activity_scence: 'Automation',
    device_more_activity_help_feedback: 'Help',
    device_more_activity_reset: 'Reset',
    device_more_activity_setting: 'Settings',
    device_more_activity_common_setting: 'General settings',
    device_more_activity_network_info: 'Network info',
    device_more_activity_license_privacy: 'User Agreement and Privacy Policy',
    device_more_activity_license: 'User Agreement',
    device_more_activity_privacy: ' Privacy Policy ',
    device_more_activity_cancel_license_privacy: 'Withdraw the authorization from User Agreement and Privacy Policy',
    OpenLibList: 'open source library test',
    ViewTest: ' test view',
    cancel: "Cancel",
    ok: "OK",
    save: "Save",
    saved: "Saved successfully",
    voiceBroadcast: 'voice control'
  },
  'zh': {
    device_title: 'DOCO微电流精华导入美容仪',
    battery_level: '% 剩余电量',
    System_mode: '系统模式',
    mild_mode: '温和',
    daily_mode: '日常',
    tolerance_mode: '耐受',
    prefernce_setting: '偏好设置',
    essence_import_export_mode: '精华导入导出模式',
    microcurrent_export_mode: '微电流导出',
    weak_mode: '弱',
    normail_mode: '中',
    strong_mode: '强',
    customize_mode: '自定义',
    micro_current_essence_introduction: '微电流导入',
    cleansing_mode: '洁面模式',
    vibration_mode: '振动模式',
    hand_washing_mode: '手洗',
    clarifying_mode: '净透',
    skin_replenishin_mode: '焕肤',
    clean_remind: '洁面时长提醒',
    data_syn: '蓝牙数据同步中，请稍后...',
    Skin_detection: '肌肤检测',
    anti_destiny: '逆天湿润',
    good_humid: '良好湿润',
    normal_humid: '正常湿润',
    slight_shortage_water: '略微缺水',
    drting_water_shortage: '干燥缺水',
    skin_testing_txt: '正在检测中，请不要移动DOCO',
    hold_device: '请握住机身将传感器贴近皮肤',
    skin_test_result: '检测结果',
    skin_status: '肌肤状态',
    skinadvice: '护肤建议',
    nice_plus: '棒极啦！你已经成为“逆天水润小仙女”，继续保持哟',
    nice_skin: '棒极啦！你已经成为“水润小仙女”，继续保持哟',
    good_skin: '小仙女你肌肤水润度还行，需要再接再厉哦',
    warning_to_skin: '警告！小仙女你的肌肤需要“喝”水啦',
    advice1: '皮肤保养最重要的是补水，首先注重体内的水分，然后再进行体外补水，每天必须摄取2-3升水，这对保持皮肤正常新陈代谢大有好处哦。',
    advie2: '选择具有补水效果的保养品，洗完脸后舒舒服服做个面膜，在缓解一天身体的疲劳同时也缓解皮肤一整天的压力！有条件或者有时间可以去附近美容店做一套的皮肤护理，一周一次深度滋养皮肤，坚持护理的皮肤会越来越好越来越年轻',
    advice3: ' 护肤步骤要做好，早晚都要注意补水，做好深层清洁，让后续补水营养能更好吸收。趁肌肤未完全干透时，拍打补水保养品，可使用精华导入功能促进精华吸收，实现效果更好的保养，有效的缓解皮肤缺水的状态',
    NUM_PHOTOS: 'Usted {numPhotos, plural, ' +
      '=0 {no tiene fotos.}' +
      '=1 {tiene una foto.}' +
      'other {tiene # fotos.}}',
    t1: 'tttttttt',
    t2: ['tt{1}'],
    t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [(v) => v > 100, 'more']],
    t4: {
      t5: [() => 'akjasdkljflkasdjf'],
      t6: ['yyy{1}']
    },
    setting: '设置',
    featureSetting: '功能设置',
    commonSetting: '通用设置',
    deviceName: '设备名称',
    locationManagement: '位置管理',
    shareDevice: '设备共享',
    ifttt: '自动化',
    firmwareUpgrate: '检查固件升级',
    moreSetting: '更多设置',
    addToDesktop: '添加到桌面',
    resetDevice: '重置设备',
    licenseAndPolicy: '使用条款和隐私政策',
    device_more_activity_rename: '重命名',
    device_more_activity_about: '关于',
    device_more_activity_help: '玩法教程',
    device_more_activity_firmware_update: '检查固件更新',
    device_more_activity_noti_quick_op: '通知中心快捷开关',
    device_more_activity_unbind: '删除设备',
    device_more_activity_feedback: '反馈',
    device_more_activity_reset: '重置',
    device_more_activity_setting: '设置',
    device_more_activity_scence: '智能',
    device_more_activity_help_feedback: '使用帮助',
    device_more_activity_common_setting: '通用设置',
    device_more_activity_network_info: '网络信息',
    device_more_activity_license_privacy: '使用条款和隐私政策',
    device_more_activity_license: '使用条款',
    device_more_activity_privacy: '隐私政策',
    device_more_activity_cancel_license_privacy: '撤销“使用条款和隐私政策”授权',
    home_title: '虚拟设备',
    home_subtitle: '子设备',
    control_demo: ' 控制示例',
    cloud_debug: ' 云端调试',
    my_product: ' 创建自己的产品',
    OpenLibList: ' 第三方库测试',
    ViewTest: ' 常用的 view 测试'
  },
  'zh-tw': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    setting: '設置',
    featureSetting: '功能設定',
    commonSetting: '一般設定',
    deviceName: '裝置名稱',
    locationManagement: '位置管理',
    shareDevice: '裝置共用',
    ifttt: '自動化',
    firmwareUpgrate: '檢查韌體更新',
    moreSetting: '更多設定',
    addToDesktop: '新增到桌面',
    resetDevice: '重置裝置',
    licenseAndPolicy: '用戶協議和隱私政策'
  },
  'zh-hk': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    setting: '設置',
    featureSetting: 'feature setting',
    commonSetting: '一般設定',
    deviceName: '裝置名稱',
    locationManagement: '位置管理',
    shareDevice: '裝置共用',
    ifttt: '自動化',
    firmwareUpgrate: '檢查韌體更新',
    moreSetting: '更多設定',
    addToDesktop: '新增到桌面',
    resetDevice: '重置裝置',
    licenseAndPolicy: '用戶協議和隱私政策'
  },
  'ko': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    featureSetting: '바로가기 설정',
    commonSetting: '일반 설정',
    deviceName: '기기 이름',
    locationManagement: '위치',
    shareDevice: '기기 공유',
    ifttt: '자동화',
    firmwareUpgrate: '펌웨어 업데이트 확인',
    moreSetting: '추가 설정',
    addToDesktop: '홈 화면에 추가',
    resetDevice: '기기 초기화',
    licenseAndPolicy: '이용 약관 & 개인 정보 보호 정책',

    device_title: '도코 마이크로 음이온 미용기기',
    battery_level: '% 배터리 잔량',
    System_mode: '시스템 모드',
    mild_mode: '마일드',
    daily_mode: '데일리',
    tolerance_mode: '내성',
    prefernce_setting: '사용자 선호 모드',
    essence_import_export_mode: '에센스 흡수 설정',
    microcurrent_export_mode: '마이크로전류 내보내기',
    weak_mode: '약',
    normail_mode: '중',
    strong_mode: '강',
    customize_mode: '사용자 모드',
    micro_current_essence_introduction: '마이크로 에센스 소개',
    cleansing_mode: '클렌징모드',
    vibration_mode: '진동모드',
    hand_washing_mode: '핸드워싱',
    clarifying_mode: '클린모드',
    skin_replenishin_mode: '환한 피부',
    clean_remind: '세안 시간 리마인드',
    data_syn: '데이터 동기화...',
    Skin_detection: '스킨 테스트',
    anti_destiny: '촉촉한 소녀 피부',
    good_humid: '양호단계',
    normal_humid: '정상단계',
    slight_shortage_water: '수분 부족 단계',
    drting_water_shortage: '건조&수분 부족 단계',
    skin_testing_txt: '테스트 시 기기를 움직이지 말아주세요',
    hold_device: '기기 본체를 잡고 센서를 피부에 가깝게 대주세요',
    skin_test_result: '테스트 결과',
    skin_status: '피부 상태',
    skinadvice: '제안',
    nice_plus: '좋아요! 당신의 피부는 "촉촉한 소녀 피부"가 되었습니다.지금처럼 컨디션을 유지해주세요.',
    nice_skin: '좋아요! 당신의 피부는 "수분 촉촉" 단계입니다.',
    good_skin: '당신의 피부는 수분이 부족해지고 있어요.',
    warning_to_skin: '주의!  당신의 피부는 수분이 필요해요.',
    advice1: '피부 관리의 기초는 수분보충이므로 체내 수분 유지에 신경써주세요. 매일 2-3 리터 물을 마셔주면 피부 신진대사를 원활하게 해줍니다',
    advie2: '수분 보충 제품 사용과 세안 후 마스크 팩으로 피로를 풀며 피부 스트레스를 완화시켜 주세요. 여유가 되면 피부과에서 주 1회 피부관리를 하시는 것도 좋습니다. 피부 깊숙한 곳 까지 영양을 공급하여 하루하루 나아진 피부를 경험하실 수 있습니다.',
    advice3: ' 평소 스킨케어 기초단계를 꼼꼼히 해주세요.아침 저녁으로 수분 보충에 신경써주시고, 딥 클렌징 후 수분과 영양이 잘 흡수되도록 해주세요. 피부에 수분기가 있을 때 에센스 제품을 두드린 뒤, 에센스 흡수 모드로 유효 성분을 피부에 흡수시켜 주세요. 당신의 피부를 좀 더 효과적으로 개선시킬 수 있습니다.',
    NUM_PHOTOS: 'Usted {numPhotos, plural, ' +
      '=0 {no tiene fotos.}' +
      '=1 {tiene una foto.}' +
      'other {tiene # fotos.}}',
    t1: 'tttttttt',
    t2: ['tt{1}'],
    t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [(v) => v > 100, 'more']],
    t4: {
      t5: [() => 'akjasdkljflkasdjf'],
      t6: ['yyy{1}']
    },
    setting: 'setting',
    featureSetting: 'Shortcut settings',
    commonSetting: 'Common settings',
    deviceName: 'Device name',
    locationManagement: 'Locations',
    shareDevice: 'Share device',
    ifttt: 'Automation',
    firmwareUpgrate: 'Check for firmware updates',
    moreSetting: 'Additional settings',
    addToDesktop: 'Add to Home screen',
    resetDevice: 'Reset device',
    licenseAndPolicy: 'User Agreement & Privacy Policy',
    device_more_activity_rename: 'Rename',
    device_more_activity_about: 'About',
    device_more_activity_help: 'Tutorial',
    device_more_activity_firmware_update: 'Check for firmware updates',
    device_more_activity_noti_quick_op: 'Notification center shortcuts',
    device_more_activity_unbind: 'Remove device',
    device_more_activity_feedback: 'Feedback',
    device_more_activity_scence: 'Automation',
    device_more_activity_help_feedback: 'Help',
    device_more_activity_reset: 'Reset',
    device_more_activity_setting: 'Settings',
    device_more_activity_common_setting: 'General settings',
    device_more_activity_network_info: 'Network info',
    device_more_activity_license_privacy: 'User Agreement and Privacy Policy',
    device_more_activity_license: 'User Agreement',
    device_more_activity_privacy: ' Privacy Policy ',
    device_more_activity_cancel_license_privacy: 'Withdraw the authorization from User Agreement and Privacy Policy',
    OpenLibList: 'open source library test',
    ViewTest: ' test view',
    cancel: "Cancel",
    ok: "OK",
    save: "Save",
    saved: "Saved successfully",
    voiceBroadcast: 'voice control'



  }
};
export const localStrings = new LocalizedStrings(strings);

export function getString(key, obj = null) {
  if (obj) {
    return new IntlMessageFormat(localStrings[key], localStrings.language).format(obj);
  } else {
    return localStrings[key];
  }
}