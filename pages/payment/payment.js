Page({
  data: {
    amount: 38.00,
    orderId: '20260310123456',
    orderTime: '2026-03-10 12:34:56',
    address: '张三 13800138000 学生宿舍1栋101室'
  },

  onLoad() {
    // 页面加载时的逻辑
  },

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
          url: '/pages/profile/profile'
        });
      }, 1000);
    }, 2000);
  }
});