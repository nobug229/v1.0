Page({
  data: {
    userInfo: null,
    userType: null
  },

  onLoad() {
    const app = getApp();
    this.setData({
      userInfo: app.getUserInfo(),
      userType: app.getUserType()
    });
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  showUserInfo() {
    const app = getApp();
    const userInfo = app.getUserInfo();
    const userType = app.getUserType();
    
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    let userTypeText = '';
    switch (userType) {
      case 1:
        userTypeText = '学生账号';
        break;
      case 2:
        userTypeText = '商户账号';
        break;
      case 3:
        userTypeText = '社团账号';
        break;
      case 4:
        userTypeText = '管理员账号';
        break;
    }

    wx.showModal({
      title: '用户信息',
      content: `账号：${userInfo.account}\n类型：${userTypeText}`,
      showCancel: false
    });
  },

  showAbout() {
    wx.showModal({
      title: '关于我们',
      content: '校园服务小程序\n版本：1.0.0\n提供外卖订餐、二手交易、校园生活等服务',
      showCancel: false
    });
  }
});