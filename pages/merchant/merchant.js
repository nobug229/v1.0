Page({
  data: {
    restaurantCount: 3,
    dishCount: 12,
    todayIncome: 1234,
    restaurants: [],
    orders: []
  },

  onLoad() {
    // 模拟加载餐厅数据
    this.loadRestaurants();
    // 模拟加载订单数据
    this.loadOrders();
  },

  loadRestaurants() {
    const restaurants = [
      {
        id: 1,
        name: '校园食堂',
        description: '提供各类美食，价格实惠'
      },
      {
        id: 2,
        name: '西式餐厅',
        description: '汉堡、披萨、意面等'
      },
      {
        id: 3,
        name: '中式餐厅',
        description: '正宗中餐，口味地道'
      }
    ];

    this.setData({
      restaurants: restaurants
    });
  },

  loadOrders() {
    const orders = [
      {
        id: '20260310123456',
        time: '2026-03-10 12:34:56',
        amount: 38.00,
        status: '已完成'
      },
      {
        id: '20260310123457',
        time: '2026-03-10 11:23:45',
        amount: 25.00,
        status: '已完成'
      }
    ];

    this.setData({
      orders: orders
    });
  }
});