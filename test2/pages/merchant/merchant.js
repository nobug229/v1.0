Page({
  data: {
    restaurantCount: 0, // 餐厅数量
    dishCount: 0, // 菜品数量
    todayIncome: 0, // 今日收入
    restaurants: [], // 餐厅列表
    orders: [] // 订单列表
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
   * 页面加载时执行
   * 加载餐厅数据和订单数据
   */
  onLoad() {
    this.loadRestaurants();
    this.loadOrders();
  },

  /**
   * 加载餐厅数据
   * 模拟餐厅列表数据
   */
  loadRestaurants() {
    const restaurants = [
      {
        id: 1,
        name: '炭火烧烤',
        description: '正宗炭火烧烤，美味可口'
      }
    ];

    this.setData({
      restaurants: restaurants,
      restaurantCount: restaurants.length
    });
  },

  /**
   * 加载订单数据
   * 模拟订单列表数据
   */
  loadOrders() {
    const orders = [
      {
        id: this.generateOrderNumber(),
        time: new Date().toLocaleString(),
        amount: 38.00,
        status: '待接单'
      }
    ];

    this.setData({
      orders: orders
    });
  },

  /**
   * 接单
   */
  acceptOrder(e) {
    const index = e.currentTarget.dataset.index;
    const orders = this.data.orders;
    
    if (orders[index].status === '待接单') {
      orders[index].status = '已接单';
      orders[index].orderNumber = this.generateOrderNumber();
      
      this.setData({
        orders: orders
      });
      
      wx.showToast({
        title: '接单成功',
        icon: 'success'
      });
    }
  }
});