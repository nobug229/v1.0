Page({
  data: {
    dishes: [], // 菜品列表
    cartCount: 0, // 购物车数量
    totalPrice: 0 // 总价格
  },

  /**
   * 页面加载时执行
   * 加载菜品数据
   */
  onLoad() {
    this.loadDishes();
    this.loadCart();
  },

  /**
   * 从本地存储加载购物车数据
   */
  loadCart() {
    try {
      const savedDishes = wx.getStorageSync('cartDishes');
      if (savedDishes) {
        this.setData({
          dishes: savedDishes
        });
        this.updateCart();
      }
    } catch (e) {
      console.error('加载购物车失败', e);
    }
  },

  /**
   * 保存购物车数据到本地存储
   */
  saveCart() {
    try {
      wx.setStorageSync('cartDishes', this.data.dishes);
    } catch (e) {
      console.error('保存购物车失败', e);
    }
  },

  /**
   * 获取汉字拼音首字母
   * @param {string} str - 汉字字符串
   * @returns {string} 拼音首字母
   */
  getPinyinFirstLetter(str) {
    const pinyinMap = {
      '现': 'X', '烤': 'K', '生': 'S', '蚝': 'H',
      '韭': 'J', '菜': 'C', '鱼': 'Y', '牛': 'N',
      '肉': 'R'
    };
    if (!str || str.length === 0) return '';
    const firstChar = str.charAt(0);
    return pinyinMap[firstChar] || firstChar.toUpperCase();
  },

  /**
   * 按拼音首字母排序
   * @param {Array} dishes - 菜品数组
   * @returns {Array} 排序后的菜品数组
   */
  sortDishesByPinyin(dishes) {
    return dishes.sort((a, b) => {
      const letterA = this.getPinyinFirstLetter(a.name);
      const letterB = this.getPinyinFirstLetter(b.name);
      return letterA.localeCompare(letterB);
    });
  },

  /**
   * 加载菜品数据
   * 模拟菜品列表数据
   */
  loadDishes() {
    let dishes = [
      {
        id: 1,
        name: '现烤生蚝',
        description: '新鲜生蚝，炭火烤制',
        price: 38,
        count: 0
      },
      {
        id: 2,
        name: '烤韭菜',
        description: '新鲜韭菜，孜然调味',
        price: 8,
        count: 0
      },
      {
        id: 3,
        name: '烤鱼',
        description: '整条烤鱼，香辣可口',
        price: 68,
        count: 0
      },
      {
        id: 4,
        name: '烤牛肉',
        description: '精选牛肉，鲜嫩多汁',
        price: 45,
        count: 0
      }
    ];

    dishes = this.sortDishesByPinyin(dishes);

    this.setData({
      dishes: dishes
    });
  },

  /**
   * 增加菜品数量
   * @param {Object} e - 事件对象
   */
  increaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const dishes = this.data.dishes;
    dishes[index].count += 1;
    this.setData({
      dishes: dishes
    });
    this.updateCart();
    this.saveCart();
  },

  /**
   * 减少菜品数量
   * @param {Object} e - 事件对象
   */
  decreaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const dishes = this.data.dishes;
    if (dishes[index].count > 0) {
      dishes[index].count -= 1;
      this.setData({
        dishes: dishes
      });
      this.updateCart();
      this.saveCart();
    }
  },

  /**
   * 更新购物车
   * 计算购物车数量和总价格
   */
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

  /**
   * 跳转到订单页面
   * 如果购物车为空，提示用户添加菜品
   */
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