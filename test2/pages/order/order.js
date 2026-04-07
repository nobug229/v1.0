Page({
  data: {
    orderItems: [], // 订单商品列表
    totalPrice: 0, // 总价格
    address: null, // 收货地址
    deliveryFee: 5 // 配送费
  },

  /**
   * 页面加载时执行
   * 加载订单商品数据和默认地址
   */
  onLoad() {
    this.loadOrderItems();
    this.loadDefaultAddress();
  },

  /**
   * 页面显示时执行
   * 重新加载默认地址
   */
  onShow() {
    this.loadDefaultAddress();
  },

  /**
   * 从本地存储加载购物车数据
   */
  loadOrderItems() {
    try {
      const cartDishes = wx.getStorageSync('cartDishes') || [];
      const orderItems = cartDishes.filter(dish => dish.count > 0);
      
      let totalPrice = 0;
      orderItems.forEach(item => {
        totalPrice += item.price * item.count;
      });
      
      this.setData({
        orderItems: orderItems,
        totalPrice: totalPrice
      });
    } catch (e) {
      console.error('加载购物车失败', e);
    }
  },

  /**
   * 从本地存储加载默认地址
   */
  loadDefaultAddress() {
    try {
      const addresses = wx.getStorageSync('addresses') || [];
      const defaultAddress = addresses.find(addr => addr.isDefault);
      
      if (defaultAddress) {
        const fullAddress = defaultAddress.campusAddress + (defaultAddress.detailAddress ? ' ' + defaultAddress.detailAddress : '');
        this.setData({
          address: {
            name: defaultAddress.name,
            phone: defaultAddress.phone,
            detail: fullAddress
          }
        });
      } else {
        this.setData({
          address: null
        });
      }
    } catch (e) {
      console.error('加载默认地址失败', e);
    }
  },

  /**
   * 跳转到地址管理页面
   */
  chooseAddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    });
  },

  /**
   * 获取今日日期字符串（YYYYMMDD）
   */
  getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  },

  /**
   * 生成订单号
   * 格式：年（4位）月（2位）日（2位）接单顺序（1-999）
   */
  generateOrderNumber() {
    const todayDate = this.getTodayDate();
    const todayKey = `orderCount_${todayDate}`;
    
    let orderCount = 0;
    try {
      const storedCount = wx.getStorageSync(todayKey);
      if (storedCount) {
        orderCount = parseInt(storedCount);
      }
    } catch (e) {
      console.error('获取今日订单数失败', e);
    }
    
    orderCount += 1;
    if (orderCount > 999) {
      orderCount = 1;
    }
    
    try {
      wx.setStorageSync(todayKey, orderCount);
    } catch (e) {
      console.error('保存今日订单数失败', e);
    }
    
    const orderSequence = String(orderCount).padStart(3, '0');
    return `${todayDate}${orderSequence}`;
  },

  /**
   * 保存订单到商户订单
   */
  saveOrderToMerchant() {
    try {
      let merchantOrders = wx.getStorageSync('merchantOrders') || [];
      
      const order = {
        id: Date.now(),
        orderNumber: this.generateOrderNumber(),
        items: this.data.orderItems,
        totalPrice: this.data.totalPrice + 5,
        customerName: this.data.address.name,
        customerPhone: this.data.address.phone,
        createTime: Date.now()
      };
      
      merchantOrders.unshift(order);
      
      wx.setStorageSync('merchantOrders', merchantOrders);
    } catch (e) {
      console.error('保存商户订单失败', e);
    }
  },

  /**
   * 提交订单
   * 检查是否有默认地址，没有则跳转创建地址
   */
  submitOrder() {
    if (!this.data.address) {
      wx.showModal({
        title: '提示',
        content: '请先设置默认收货地址',
        confirmText: '去设置',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/address-edit/address-edit'
            });
          }
        }
      });
      return;
    }

    wx.showLoading({
      title: '提交中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      
      this.saveOrderToMerchant();
      
      try {
        wx.removeStorageSync('cartDishes');
      } catch (e) {
        console.error('清空购物车失败', e);
      }
      
      wx.showToast({
        title: '下单成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.switchTab({
          url: '/pages/takeaway/takeaway'
        });
      }, 1500);
    }, 1000);
  }
});