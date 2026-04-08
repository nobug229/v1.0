const PermissionManager = require('../../utils/permission-manager.js');

Page({
  data: {
    userInfo: null,
    isMerchant: false
  },

  onLoad() {
    this.checkUserType();
  },

  onShow() {
    this.checkUserType();
  },

  checkUserType() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.reLaunch({
        url: '/pages/登录/login'
      });
      return;
    }

    if (!PermissionManager.isMerchant()) {
      wx.switchTab({
        url: '/pages/校园美食/takeaway'
      });
      return;
    }

    this.setData({
      userInfo: app.getUserInfo(),
      isMerchant: true
    });

    wx.hideTabBar();
  },

  goToMyShop() {
    wx.navigateTo({
      url: '/pages/我的店铺/my-shop'
    });
  },

  goToMerchantOrders() {
    wx.navigateTo({
      url: '/pages/商户订单/merchant-orders'
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/个人信息/profile'
    });
  }
});
