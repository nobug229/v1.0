Page({
  data: {
    userInfo: null, // 用户信息
    userType: null // 用户类型
  },

  /**
   * 页面加载时执行
   * 从全局获取用户信息和用户类型
   */
  onLoad() {
    const app = getApp();
    this.setData({
      userInfo: app.getUserInfo(),
      userType: app.getUserType()
    });
  },

  /**
   * 跳转到登录页面
   */
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 显示用户信息
   * 如果未登录，提示用户登录
   * 否则显示用户账号和类型
   */
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

  /**
   * 显示关于我们信息
   */
  showAbout() {
    wx.showModal({
      title: '关于我们',
      content: '校园服务小程序\n版本：1.0.0\n提供外卖订餐、二手交易、校园生活等服务',
      showCancel: false
    });
  }
});