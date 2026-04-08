Page({
  data: {
    shop: null,
    isEditingName: false,
    editingName: ''
  },

  onLoad() {
    this.loadShop();
  },

  onShow() {
    this.loadShop();
    wx.hideTabBar();
  },

  loadShop() {
    try {
      const shop = wx.getStorageSync('myShop') || null;
      this.setData({
        shop: shop
      });
    } catch (e) {
      console.error('加载店铺信息失败', e);
    }
  },

  saveShop(shop) {
    try {
      wx.setStorageSync('myShop', shop);
    } catch (e) {
      console.error('保存店铺信息失败', e);
    }
  },

  createShop() {
    wx.showModal({
      title: '创建店铺',
      editable: true,
      placeholderText: '请输入店铺名称',
      success: (res) => {
        if (res.confirm && res.content) {
          const shop = {
            id: Date.now(),
            name: res.content,
            createTime: Date.now()
          };
          this.saveShop(shop);
          this.setData({
            shop: shop
          });
          wx.showToast({
            title: '店铺创建成功',
            icon: 'success'
          });
        }
      }
    });
  },

  startEditName() {
    this.setData({
      isEditingName: true,
      editingName: this.data.shop ? this.data.shop.name : ''
    });
  },

  cancelEditName() {
    this.setData({
      isEditingName: false,
      editingName: ''
    });
  },

  bindNameInput(e) {
    this.setData({
      editingName: e.detail.value
    });
  },

  saveName() {
    const editingName = this.data.editingName.trim();
    
    if (!editingName) {
      wx.showToast({
        title: '店铺名称不能为空',
        icon: 'none'
      });
      return;
    }

    const shop = this.data.shop;
    shop.name = editingName;
    this.saveShop(shop);
    
    this.setData({
      shop: shop,
      isEditingName: false,
      editingName: ''
    });
    
    wx.showToast({
      title: '店铺名称修改成功',
      icon: 'success'
    });
  },

  deleteShop() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除店铺吗？删除后无法恢复。',
      success: (res) => {
        if (res.confirm) {
          this.saveShop(null);
          this.setData({
            shop: null
          });
          wx.showToast({
            title: '店铺删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  goToMerchantHome() {
    wx.reLaunch({
      url: '/pages/商家首页/merchant-home'
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/个人信息/profile'
    });
  }
});
