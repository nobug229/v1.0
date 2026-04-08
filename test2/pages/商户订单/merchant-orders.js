Page({
  data: {
    orders: []
  },

  onLoad() {
    this.loadOrders();
  },

  onShow() {
    this.loadOrders();
    wx.hideTabBar();
  },

  loadOrders() {
    try {
      let orders = wx.getStorageSync('merchantOrders') || [];
      
      const threeWeeksAgo = Date.now() - 21 * 24 * 60 * 60 * 1000;
      
      orders = orders.filter(order => {
        return order.createTime && order.createTime > threeWeeksAgo;
      });
      
      orders.sort((a, b) => b.createTime - a.createTime);
      
      this.setData({
        orders: orders
      });
      
      this.saveOrders(orders);
    } catch (e) {
      console.error('加载订单失败', e);
    }
  },

  saveOrders(orders) {
    try {
      wx.setStorageSync('merchantOrders', orders);
    } catch (e) {
      console.error('保存订单失败', e);
    }
  },

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  goToMerchantHome() {
    wx.reLaunch({
      url: '/pages/商家首页/merchant-home'
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/个人信息/profile'
    });
  }
});
