Page({
  data: {
    clubDynamic: {
      id: 1,
      title: '摄影社举办春季摄影展',
      author: '摄影社',
      time: '2026-03-10',
      content: '尊敬的同学们：\n\n摄影社将于本周末（3月15日-16日）在校园文化中心举办春季摄影展，展示社员们的优秀作品。\n\n本次摄影展主题为"春日校园"，收录了近百幅摄影作品，涵盖校园风光、人文纪实等多个类别。我们邀请了专业摄影师担任评委，评选出优秀作品并颁发奖项。\n\n欢迎广大师生前来参观，感受摄影的魅力，与我们一起记录校园的美好瞬间。\n\n活动时间：3月15日-16日 9:00-17:00\n活动地点：校园文化中心\n\n摄影社\n2026年3月10日',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20club%20activity&image_size=square'
    },
    comments: [
      {
        id: 1,
        name: '李四',
        time: '2小时前',
        content: '很棒的活动，一定会去参观！'
      },
      {
        id: 2,
        name: '王五',
        time: '1小时前',
        content: '期待看到大家的作品！'
      }
    ]
  },

  onLoad() {
    // 页面加载逻辑
  },

  sendComment() {
    // 发送留言逻辑
    wx.showToast({
      title: '留言发送成功',
      icon: 'success'
    });
  }
});