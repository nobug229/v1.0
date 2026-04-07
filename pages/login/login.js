Page({
  data: {
    account: '',
    password: '',
    userType: 1 // 默认学生账号
  },

  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },

  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  bindUserTypeChange(e) {
    this.setData({
      userType: parseInt(e.detail.value)
    });
  },

  login() {
    const { account, password, userType } = this.data;
    
    if (!account || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      });
      return;
    }

    // 模拟登录验证
    if (account === 'test' && password === '123456') {
      const app = getApp();
      app.setUserType(userType);
      app.setUserInfo({ account, userType });
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 1000);
    } else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none'
      });
    }
  }
});