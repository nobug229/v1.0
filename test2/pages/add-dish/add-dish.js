Page({
  data: {
    restaurants: [], // 餐厅列表
    restaurantIndex: 0, // 选中的餐厅索引
    name: '', // 菜品名称
    description: '', // 菜品描述
    price: '', // 菜品价格
    images: [] // 菜品图片
  },

  /**
   * 页面加载时触发
   * 加载餐厅列表数据
   */
  onLoad() {
    // 模拟加载餐厅列表
    this.loadRestaurants();
  },

  /**
   * 加载餐厅列表数据
   * 模拟从服务器获取餐厅列表
   */
  loadRestaurants() {
    // 清空餐厅列表数据
    this.setData({
      restaurants: []
    });
  },

  /**
   * 餐厅选择变更事件处理函数
   * @param {Object} e - 事件对象，包含选择的餐厅索引
   */
  bindRestaurantChange(e) {
    this.setData({
      restaurantIndex: e.detail.value
    });
  },

  /**
   * 菜品名称输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的菜品名称
   */
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  /**
   * 菜品描述输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的菜品描述
   */
  bindDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  /**
   * 菜品价格输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的菜品价格
   */
  bindPriceInput(e) {
    this.setData({
      price: e.detail.value
    });
  },

  /**
   * 选择菜品图片
   * 调用微信选择图片API，支持从相册或相机选择
   */
  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: 9 - that.data.images.length, // 最多选择9张图片
      sizeType: ['original', 'compressed'], // 支持原图和压缩图
      sourceType: ['album', 'camera'], // 支持从相册和相机选择
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(tempFilePaths) // 将选择的图片添加到图片列表
        });
      }
    });
  },

  /**
   * 移除菜品图片
   * @param {Object} e - 事件对象，包含要移除的图片索引
   */
  removeImage(e) {
    const index = e.currentTarget.dataset.index; // 获取要移除的图片索引
    const images = this.data.images;
    images.splice(index, 1); // 从数组中移除图片
    this.setData({
      images: images // 更新图片列表
    });
  },

  /**
   * 提交菜品信息
   * 验证表单数据并模拟发布菜品
   */
  submitDish() {
    const { restaurants, restaurantIndex, name, description, price, images } = this.data;
    
    // 验证菜品名称
    if (!name) {
      wx.showToast({
        title: '请输入菜品名称',
        icon: 'none'
      });
      return;
    }
    
    // 验证菜品描述
    if (!description) {
      wx.showToast({
        title: '请输入菜品描述',
        icon: 'none'
      });
      return;
    }
    
    // 验证菜品价格
    if (!price) {
      wx.showToast({
        title: '请输入菜品价格',
        icon: 'none'
      });
      return;
    }

    // 模拟发布菜品
    wx.showLoading({
      title: '发布中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.navigateBack(); // 发布成功后返回上一页
      }, 1000);
    }, 2000);
  }
});