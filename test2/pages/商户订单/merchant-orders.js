Page({
  data: {
    orders: []
  },

  /**
   * 页面加载时执行
   */
  onLoad() {
    this.loadOrders();
  },

  /**
   * 页面显示时执行
   */
  onShow() {
    this.loadOrders();
  },

  /**
   * 从本地存储加载订单
   */
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

  /**
   * 保存订单到本地存储
   */
  saveOrders(orders) {
    try {
      wx.setStorageSync('merchantOrders', orders);
    } catch (e) {
      console.error('保存订单失败', e);
    }
  },

  /**
   * 格式化日期
   */
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
});