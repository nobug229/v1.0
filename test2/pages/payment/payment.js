Page({
  data: {
    amount: 38.00, // 支付金额
    orderId: '20260310123456', // 订单ID
    orderTime: '2026-03-10 12:34:56', // 订单时间
    address: '张三 13800138000 学生宿舍1栋101室' // 收货地址
  },

  /**
   * 页面加载时执行
   * 页面加载时的逻辑
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 支付函数
   * 模拟支付过程
   * 支付成功后跳转到个人中心页面
   */
  pay() {
    // 模拟支付过程
    wx.showLoading({
      title: '正在支付...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/个人信息/profile'
        });
      }, 1000);
    }, 2000);
  }
});