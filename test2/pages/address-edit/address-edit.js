Page({
  data: {
    id: '',
    name: '',
    gender: 'male',
    phone: '',
    campusAddress: '',
    detailAddress: '',
    isDefault: false
  },

  /**
   * 页面加载时执行
   */
  onLoad(options) {
    if (options.id) {
      // 编辑模式
      this.setData({
        id: options.id
      });
      this.loadAddressDetail();
    }
  },

  /**
   * 返回上一页
   */
  onBack() {
    wx.navigateBack();
  },

  /**
   * 从本地存储加载地址列表
   */
  loadAddresses() {
    try {
      return wx.getStorageSync('addresses') || [];
    } catch (e) {
      console.error('加载地址失败', e);
      return [];
    }
  },

  /**
   * 保存地址列表到本地存储
   */
  saveAddresses(addresses) {
    try {
      wx.setStorageSync('addresses', addresses);
    } catch (e) {
      console.error('保存地址失败', e);
    }
  },

  /**
   * 加载地址详情
   */
  loadAddressDetail() {
    const addresses = this.loadAddresses();
    const address = addresses.find(addr => addr.id == this.data.id);
    if (address) {
      this.setData({
        name: address.name,
        gender: address.gender,
        phone: address.phone,
        campusAddress: address.campusAddress,
        detailAddress: address.detailAddress,
        isDefault: address.isDefault
      });
    }
  },

  /**
   * 绑定姓名输入
   */
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  /**
   * 选择性别
   */
  selectGender(e) {
    this.setData({
      gender: e.currentTarget.dataset.gender
    });
  },

  /**
   * 绑定手机号输入
   */
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  /**
   * 绑定校区地址输入
   */
  bindCampusAddressInput(e) {
    this.setData({
      campusAddress: e.detail.value
    });
  },

  /**
   * 绑定详细地址输入
   */
  bindDetailAddressInput(e) {
    this.setData({
      detailAddress: e.detail.value
    });
  },

  /**
   * 保存地址
   */
  saveAddress() {
    const { id, name, phone, campusAddress, gender, detailAddress, isDefault } = this.data;
    
    if (!name) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none'
      });
      return;
    }
    
    if (!phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    
    if (!campusAddress) {
      wx.showToast({
        title: '请输入收货地址',
        icon: 'none'
      });
      return;
    }
    
    let addresses = this.loadAddresses();
    
    if (id) {
      // 编辑模式
      const index = addresses.findIndex(addr => addr.id == id);
      if (index !== -1) {
        addresses[index] = {
          id: parseInt(id),
          name,
          gender,
          phone,
          campusAddress,
          detailAddress,
          isDefault
        };
      }
    } else {
      // 新增模式
      const newAddress = {
        id: Date.now(),
        name,
        gender,
        phone,
        campusAddress,
        detailAddress,
        isDefault: addresses.length === 0 ? true : isDefault
      };
      addresses.push(newAddress);
      
      if (addresses.length === 1) {
        addresses[0].isDefault = true;
      }
    }
    
    if (isDefault) {
      addresses.forEach(addr => {
        addr.isDefault = addr.id == (id ? parseInt(id) : Date.now());
      });
    }
    
    this.saveAddresses(addresses);
    
    wx.showToast({
      title: id ? '地址更新成功' : '地址添加成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  }
});