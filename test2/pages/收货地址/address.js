Page({
  data: {
    addresses: []
  },

  /**
   * 页面加载时执行
   */
  onLoad() {
    this.loadAddresses();
  },

  /**
   * 页面显示时执行
   */
  onShow() {
    this.loadAddresses();
  },

  /**
   * 加载地址列表
   */
  loadAddresses() {
    try {
      const addresses = wx.getStorageSync('addresses') || [];
      this.setData({
        addresses: addresses
      });
    } catch (e) {
      console.error('加载地址失败', e);
    }
  },

  /**
   * 保存地址列表到本地存储
   */
  saveAddresses() {
    try {
      wx.setStorageSync('addresses', this.data.addresses);
    } catch (e) {
      console.error('保存地址失败', e);
    }
  },

  /**
   * 跳转到新增地址页面
   */
  addAddress() {
    if (this.data.addresses.length >= 3) {
      wx.showToast({
        title: '最多只能添加3个地址',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/编辑地址/address-edit'
    });
  },

  /**
   * 跳转到编辑地址页面
   * @param {Object} e - 事件对象
   */
  editAddress(e) {
    const index = e.currentTarget.dataset.index;
    const address = this.data.addresses[index];
    wx.navigateTo({
      url: `/pages/编辑地址/address-edit?id=${address.id}`
    });
  },

  /**
   * 删除地址
   * @param {Object} e - 事件对象
   */
  deleteAddress(e) {
    const index = e.currentTarget.dataset.index;
    const addresses = this.data.addresses;
    const deletedAddress = addresses[index];
    addresses.splice(index, 1);
    
    if (addresses.length === 1) {
      addresses[0].isDefault = true;
    }
    
    this.setData({
      addresses: addresses
    });
    this.saveAddresses();
    
    wx.showToast({
      title: '地址删除成功',
      icon: 'success'
    });
  },

  /**
   * 设置默认地址
   * @param {Object} e - 事件对象
   */
  setDefaultAddress(e) {
    const index = e.currentTarget.dataset.index;
    const addresses = this.data.addresses;
    addresses.forEach((address, i) => {
      address.isDefault = i === index;
    });
    this.setData({
      addresses: addresses
    });
    this.saveAddresses();
    
    wx.showToast({
      title: '默认地址设置成功',
      icon: 'success'
    });
  }
});