Page({
  data: {
    restaurants: []
  },

  onLoad() {
    // 模拟加载餐厅数据
    this.loadRestaurants();
  },

  loadRestaurants() {
    // 模拟餐厅数据
    const restaurants = [
      {
        id: 1,
        name: '校园食堂',
        description: '提供各类美食，价格实惠',
        tags: ['快餐', '优惠'],
        minPrice: 15,
        rating: 4.8,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20restaurant%20interior&image_size=square'
      },
      {
        id: 2,
        name: '西式餐厅',
        description: '汉堡、披萨、意面等',
        tags: ['西餐', '新品'],
        minPrice: 20,
        rating: 4.6,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=western%20food%20restaurant&image_size=square'
      },
      {
        id: 3,
        name: '中式餐厅',
        description: '正宗中餐，口味地道',
        tags: ['中餐', '热卖'],
        minPrice: 18,
        rating: 4.9,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20restaurant&image_size=square'
      }
    ];

    this.setData({
      restaurants: restaurants
    });
  },

  goToRestaurant() {
    wx.navigateTo({
      url: '/pages/restaurant/restaurant'
    });
  }
});