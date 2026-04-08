Page({
  data: {
    account: 'student',
    password: '123456',
    userType: 1
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

  selectUserType(e) {
    const selectedType = parseInt(e.currentTarget.dataset.type);
    const { account, userType } = this.data;
    
    if (account !== 'admin' && userType === selectedType) {
      this.setData({
        userType: null
      });
    } else {
      this.setData({
        userType: selectedType
      });
    }
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

    if (!userType) {
      wx.showToast({
        title: '请选择账号类型',
        icon: 'none'
      });
      return;
    }

    const testAccounts = {
      'student': { userType: 1, name: '学生账号' },
      'merchant': { userType: 2, name: '商家账号' },
      'admin': { userType: 3, name: '管理员账号' }
    };

    if (testAccounts[account] && password === '123456') {
      const accountInfo = testAccounts[account];
      const app = getApp();
      
      if (account === 'admin') {
        app.setUserType(userType);
        app.setUserInfo({ account, userType, hasAllPermissions: true });
      } else {
        app.setUserType(accountInfo.userType);
        app.setUserInfo({ account, userType: accountInfo.userType });
      }
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        if (accountInfo.userType === 2) {
          wx.reLaunch({
            url: '/pages/商家首页/merchant-home'
          });
        } else {
          wx.switchTab({
            url: '/pages/校园美食/takeaway'
          });
        }
      }, 1000);
    } else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none'
      });
    }
  }
});
