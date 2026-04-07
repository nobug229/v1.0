Page({
  data: {
    name: '', // 餐厅名称
    description: '', // 餐厅描述
    minPrice: '', // 起送价
    deliveryFee: '', // 配送费
    images: [] // 餐厅图片
  },

  /**
   * 餐厅名称输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的餐厅名称
   */
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  /**
   * 餐厅描述输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的餐厅描述
   */
  bindDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  /**
   * 起送价输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的起送价
   */
  bindMinPriceInput(e) {
    this.setData({
      minPrice: e.detail.value
    });
  },

  /**
   * 配送费输入事件处理函数
   * @param {Object} e - 事件对象，包含输入的配送费
   */
  bindDeliveryFeeInput(e) {
    this.setData({
      deliveryFee: e.detail.value
    });
  },

  /**
   * 选择餐厅图片
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
   * 移除餐厅图片
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
   * 提交餐厅信息
   * 验证表单数据并模拟创建餐厅
   */
  submitRestaurant() {
    const { name, description, minPrice, deliveryFee, images } = this.data;
    
    // 验证餐厅名称
    if (!name) {
      wx.showToast({
        title: '请输入餐厅名称',
        icon: 'none'
      });
      return;
    }
    
    // 验证餐厅描述
    if (!description) {
      wx.showToast({
        title: '请输入餐厅描述',
        icon: 'none'
      });
      return;
    }
    
    // 验证起送价
    if (!minPrice) {
      wx.showToast({
        title: '请输入起送价',
        icon: 'none'
      });
      return;
    }
    
    // 验证配送费
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
        wx.navigateBack(); // 创建成功后返回上一页
      }, 1000);
    }, 2000);
  }
});