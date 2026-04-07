Page({
  data: {
    name: '',
    description: '',
    minPrice: '',
    deliveryFee: '',
    images: []
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

  bindMinPriceInput(e) {
    this.setData({
      minPrice: e.detail.value
    });
  },

  bindDeliveryFeeInput(e) {
    this.setData({
      deliveryFee: e.detail.value
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

  submitRestaurant() {
    const { name, description, minPrice, deliveryFee, images } = this.data;
    
    if (!name) {
      wx.showToast({
        title: '请输入餐厅名称',
        icon: 'none'
      });
      return;
    }
    
    if (!description) {
      wx.showToast({
        title: '请输入餐厅描述',
        icon: 'none'
      });
      return;
    }
    
    if (!minPrice) {
      wx.showToast({
        title: '请输入起送价',
        icon: 'none'
      });
      return;
    }
    
    if (!deliveryFee) {
      wx.showToast({
        title: '请输入配送费',
        icon: 'none'
      });
      return;
    }

    // 模拟创建餐厅
    wx.showLoading({
      title: '创建中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '创建成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }, 2000);
  }
});