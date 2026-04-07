Page({
  data: {
    dishes: [],
    cartCount: 0,
    totalPrice: 0
  },

  onLoad() {
    // 模拟加载菜品数据
    this.loadDishes();
  },

  loadDishes() {
    // 模拟菜品数据
    const dishes = [
      {
        id: 1,
        name: '宫保鸡丁',
        description: '经典川菜，口感麻辣鲜香',
        price: 18,
        count: 0,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20rice%20dish&image_size=square'
      },
      {
        id: 2,
        name: '牛肉面',
        description: '传统面食，汤鲜味美',
        price: 15,
        count: 0,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20noodle%20dish&image_size=square'
      },
      {
        id: 3,
        name: '清炒时蔬',
        description: '新鲜蔬菜，健康营养',
        price: 10,
        count: 0,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vegetable%20stir%20fry&image_size=square'
      }
    ];

    this.setData({
      dishes: dishes
    });
  },

  increaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const dishes = this.data.dishes;
    dishes[index].count += 1;
    this.setData({
      dishes: dishes
    });
    this.updateCart();
  },

  decreaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const dishes = this.data.dishes;
    if (dishes[index].count > 0) {
      dishes[index].count -= 1;
      this.setData({
        dishes: dishes
      });
      this.updateCart();
    }
  },

  updateCart() {
    const dishes = this.data.dishes;
    let cartCount = 0;
    let totalPrice = 0;
    
    dishes.forEach(dish => {
      cartCount += dish.count;
      totalPrice += dish.price * dish.count;
    });
    
    this.setData({
      cartCount: cartCount,
      totalPrice: totalPrice
    });
  },

  goToOrder() {
    if (this.data.cartCount === 0) {
      wx.showToast({
        title: '请先添加菜品',
        icon: 'none'
      });
      return;
    }
    
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
});