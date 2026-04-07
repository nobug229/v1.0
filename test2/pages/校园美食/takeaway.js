Page({
  data: {
    restaurants: [] // 餐厅列表
  },

  /**
   * 检查登录状态
   * 未登录则跳转到登录页
   */
  checkLogin() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.reLaunch({
        url: '/pages/登录/login'
      });
      return false;
    }
    return true;
  },

  /**
   * 页面加载时执行
   * 检查登录状态，加载餐厅数据
   */
  onLoad() {
    if (!this.checkLogin()) return;
    this.loadRestaurants();
  },

  /**
   * 页面显示时执行
   * 重新检查登录状态
   */
  onShow() {
    this.checkLogin();
  },

  /**
   * 获取汉字拼音首字母
   * @param {string} str - 汉字字符串
   * @returns {string} 拼音首字母
   */
  getPinyinFirstLetter(str) {
    const pinyinMap = {
      '炭': 'T', '火': 'H', '烧': 'S', '烤': 'K'
    };
    if (!str || str.length === 0) return '';
    const firstChar = str.charAt(0);
    return pinyinMap[firstChar] || firstChar.toUpperCase();
  },

  /**
   * 按拼音首字母排序
   * @param {Array} restaurants - 餐厅数组
   * @returns {Array} 排序后的餐厅数组
   */
  sortRestaurantsByPinyin(restaurants) {
    return restaurants.sort((a, b) => {
      const letterA = this.getPinyinFirstLetter(a.name);
      const letterB = this.getPinyinFirstLetter(b.name);
      return letterA.localeCompare(letterB);
    });
  },

  /**
   * 加载餐厅数据
   * 模拟餐厅列表数据
   */
  loadRestaurants() {
    let restaurants = [
      {
        id: 1,
        name: '炭火烧烤',
        description: '正宗炭火烧烤，美味可口',
        tags: ['烧烤', '热卖'],
        minPrice: 25,
        rating: 4.9
      }
    ];

    restaurants = this.sortRestaurantsByPinyin(restaurants);

    this.setData({
      restaurants: restaurants
    });
  },

  /**
   * 跳转到餐厅详情页面
   */
  goToRestaurant(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/餐厅详情/restaurant?id=${id}`
    });
  }
});