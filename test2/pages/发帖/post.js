Page({
  data: {
    selectedTag: '', // 选中的标签
    title: '', // 标题
    content: '', // 内容
    price: '', // 价格
    images: [] // 图片列表
  },

  /**
   * 选择标签
   * @param {Object} e - 事件对象
   */
  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: tag
    });
  },

  /**
   * 绑定标题输入
   * @param {Object} e - 事件对象
   */
  bindTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  /**
   * 绑定内容输入
   * @param {Object} e - 事件对象
   */
  bindContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },

  /**
   * 绑定价格输入
   * @param {Object} e - 事件对象
   */
  bindPriceInput(e) {
    this.setData({
      price: e.detail.value
    });
  },

  /**
   * 选择图片
   */
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

  /**
   * 删除图片
   * @param {Object} e - 事件对象
   */
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },

  /**
   * 获取标签显示名称
   * @param {string} tag - 标签值
   * @returns {string} - 标签显示名称
   */
  getTagName(tag) {
    const tagNames = {
      'sell': '出售',
      'lost-found': '失物招领',
      'looking-for': '寻物',
      'campus-chat': '校园交流'
    };
    return tagNames[tag] || tag;
  },

  /**
   * 提交帖子
   * 验证表单数据，模拟发布帖子
   */
  submitPost() {
    const { selectedTag, title, content, price, images } = this.data;
    
    if (!selectedTag) {
      wx.showToast({
        title: '请选择一个标签',
        icon: 'none'
      });
      return;
    }
    
    if (!title) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      });
      return;
    }
    
    if (!content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    
    if (selectedTag === 'sell' && !price) {
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      });
      return;
    }

    // 模拟发布帖子
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