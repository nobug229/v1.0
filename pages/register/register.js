Page({
  data: {
    account: '',
    password: '',
    confirmPassword: '',
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

  bindConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  bindUserTypeChange(e) {
    this.setData({
      userType: parseInt(e.detail.value)
    });
  },

  register() {
    const { account, password, confirmPassword, userType } = this.data;
    
    if (!account || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return;
    }

    // 模拟注册成功
    wx.showToast({
      title: '注册成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }, 1000);
  }
});