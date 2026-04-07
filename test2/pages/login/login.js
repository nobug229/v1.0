Page({
  data: {
    account: 'admin', // 账号，默认测试账号
    password: '123456', // 密码，默认测试密码
    userType: 1 // 默认学生账号
  },

  /**
   * 绑定账号输入
   * @param {Object} e - 输入事件对象
   */
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },

  /**
   * 绑定密码输入
   * @param {Object} e - 输入事件对象
   */
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 选择用户类型
   * 支持重复点击取消选择
   * 测试账号除外，其他账号只能选择一种类型
   * @param {Object} e - 点击事件对象
   */
  selectUserType(e) {
    const selectedType = parseInt(e.currentTarget.dataset.type);
    const { account, userType } = this.data;
    
    // 非测试账号时，点击相同选项则取消选择
    if (account !== 'admin' && userType === selectedType) {
      this.setData({
        userType: null
      });
    } else {
      // 选择新的类型
      this.setData({
        userType: selectedType
      });
    }
  },

  /**
   * 登录函数
   * 验证账号密码，模拟登录验证
   * 测试账号：admin/123456 拥有所有权限
   * 炭火烧烤账号：shaokao/123456 商户账号
   * 登录成功后跳转到外卖订餐页面
   */
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

    // 测试账号验证：admin/123456 拥有所有权限
    if (account === 'admin' && password === '123456') {
      const app = getApp();
      app.setUserType(userType);
      app.setUserInfo({ account, userType, hasAllPermissions: true });
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/takeaway/takeaway'
        });
      }, 1000);
    } 
    // 炭火烧烤账号验证：shaokao/123456 商户账号
    else if (account === 'shaokao' && password === '123456') {
      const app = getApp();
      app.setUserType(2); // 强制为商户类型
      app.setUserInfo({ account, userType: 2, restaurantName: '炭火烧烤' });
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/takeaway/takeaway'
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