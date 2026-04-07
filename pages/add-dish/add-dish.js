Page({
  data: {
    restaurants: [],
    restaurantIndex: 0,
    name: '',
    description: '',
    price: '',
    images: []
  },

  onLoad() {
    // 模拟加载餐厅列表
    this.loadRestaurants();
  },

  loadRestaurants() {
    const restaurants = [
      {
        id: 1,
        name: '校园食堂'
      },
      {
        id: 2,
        name: '西式餐厅'
      },
      {
        id: 3,
        name: '中式餐厅'
      }
    ];

    this.setData({
      restaurants: restaurants
    });
  },

  bindRestaurantChange(e) {
    this.setData({
      restaurantIndex: e.detail.value
    });
  },

  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  bindDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  bindPriceInput(e) {
    this.setData({
      price: e.detail.value
    });
  },

  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: 9 - that.data.images.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    });
  },

  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },

  submitDish() {
    const { restaurants, restaurantIndex, name, description, price, images } = this.data;
    
    if (!name) {
      wx.showToast({
        title: '请输入菜品名称',
        icon: 'none'
      });
      return;
    }
    
    if (!description) {
      wx.showToast({
        title: '请输入菜品描述',
        icon: 'none'
      });
      return;
    }
    
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
        wx.navigateBack();
      }, 1000);
    }, 2000);
  }
});