Page({
  data: {
    account: '', // 账号名称
    phone: '', // 手机号
    userType: null // 账号类型
  },

  /**
   * 绑定账号名称输入
   * @param {Object} e - 输入事件对象
   */
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },

  /**
   * 绑定手机号输入
   * @param {Object} e - 输入事件对象
   */
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  /**
   * 选择用户类型
   * @param {Object} e - 选择事件对象
   */
  selectUserType(e) {
    const type = parseInt(e.currentTarget.dataset.type);
    this.setData({
      userType: type
    });
  },

  /**
   * 注册函数
   * 验证注册信息，模拟注册成功
   * 密码默认为123456
   * 注册成功后跳转到登录页面
   */
  register() {
    const { account, phone, userType } = this.data;
    
    if (!account) {
      wx.showToast({
        title: '请设置账号名称',
        icon: 'none'
      });
      return;
    }

    if (!phone) {
      wx.showToast({
        title: '请绑定手机号',
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

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    const defaultPassword = '123456';

    const app = getApp();
    const userInfo = {
      account: account,
      phone: phone,
      password: defaultPassword
    };
    
    app.setUserInfo(userInfo);
    app.setUserType(userType);

    wx.showToast({
      title: '注册成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/登录/login'
      });
    }, 1000);
  }
});