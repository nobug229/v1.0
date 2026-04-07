Page({
  data: {
    userInfo: null,
    userType: null,
    userTypeText: '未登录'
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const app = getApp();
    const userInfo = app.getUserInfo();
    const userType = app.getUserType();
    
    this.setData({
      userInfo: userInfo,
      userType: userType
    });

    if (userType) {
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
      this.setData({
        userTypeText: userTypeText
      });
    } else {
      this.setData({
        userTypeText: '未登录'
      });
    }
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  goToOrders() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    // 跳转到订单页面
    wx.showToast({
      title: '跳转到订单页面',
      icon: 'none'
    });
  },

  goToAddresses() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    // 跳转到地址管理页面
    wx.showToast({
      title: '跳转到地址管理页面',
      icon: 'none'
    });
  },

  goToFavorites() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    // 跳转到收藏页面
    wx.showToast({
      title: '跳转到收藏页面',
      icon: 'none'
    });
  },

  goToSettings() {
    // 跳转到设置页面
    wx.showToast({
      title: '跳转到设置页面',
      icon: 'none'
    });
  },

  goToAbout() {
    // 跳转到关于我们页面
    wx.showToast({
      title: '跳转到关于我们页面',
      icon: 'none'
    });
  },

  logout() {
    const app = getApp();
    app.setUserInfo(null);
    app.setUserType(null);
    
    wx.showToast({
      title: '退出登录成功',
      icon: 'success'
    });
    
    this.setData({
      userInfo: null,
      userType: null,
      userTypeText: '未登录'
    });
  }
});