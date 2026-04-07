Page({
  data: {
    orderItems: [],
    totalPrice: 38,
    address: null
  },

  onLoad() {
    // 模拟订单商品数据
    this.loadOrderItems();
  },

  loadOrderItems() {
    const orderItems = [
      {
        id: 1,
        name: '宫保鸡丁',
        count: 1,
        price: 18
      },
      {
        id: 2,
        name: '牛肉面',
        count: 1,
        price: 15
      }
    ];

    this.setData({
      orderItems: orderItems
    });
  },

  chooseAddress() {
    // 模拟选择地址
    wx.showModal({
      title: '选择地址',
      content: '请选择收货地址',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            address: {
              name: '张三',
              phone: '13800138000',
              detail: '学生宿舍1栋101室'
            }
          });
        }
      }
    });
  },

  goToPayment() {
    if (!this.data.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: '/pages/payment/payment'
    });
  }
});