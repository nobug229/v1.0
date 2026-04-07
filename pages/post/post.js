Page({
  data: {
    selectedTag: '',
    title: '',
    content: '',
    price: '',
    images: []
  },

  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: tag
    });
  },

  bindTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  bindContentInput(e) {
    this.setData({
      content: e.detail.value
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

  getTagName(tag) {
    const tagNames = {
      'sell': '出售',
      'lost-found': '失物招领',
      'looking-for': '寻物',
      'campus-chat': '校园交流'
    };
    return tagNames[tag] || tag;
  },

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