Page({
  data: {
    userInfo: null, // 用户信息
    userType: null, // 用户类型
    userTypeText: '未登录', // 用户类型文本
    avatarUrl: '', // 头像URL
    isEditingName: false, // 是否正在编辑账号名称
    editingName: '' // 正在编辑的账号名称
  },

  /**
   * 检查登录状态
   * 未登录则跳转到登录页
   */
  checkLogin() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return false;
    }
    return true;
  },

  /**
   * 页面加载时触发
   * 检查登录状态，加载用户信息和头像
   */
  onLoad() {
    if (!this.checkLogin()) return;
    this.loadUserInfo();
    this.loadAvatar();
  },

  /**
   * 页面显示时触发
   * 检查登录状态，重新加载用户信息，确保数据最新
   */
  onShow() {
    if (!this.checkLogin()) return;
    this.loadUserInfo();
  },

  /**
   * 加载用户信息
   * 从全局应用获取用户信息和用户类型，并更新页面显示
   */
  loadUserInfo() {
    const app = getApp();
    const userInfo = app.getUserInfo();
    const userType = app.getUserType();
    
    this.setData({
      userInfo: userInfo,
      userType: userType
    });

    if (userType) {
      let userTypeText = '';
      switch (userType) {
        case 1:
          userTypeText = '学生账号';
          break;
        case 2:
          userTypeText = '商户账号';
          break;
        case 3:
          userTypeText = '社团账号';
          break;
        case 4:
          userTypeText = '管理员账号';
          break;
      }
      this.setData({
        userTypeText: userTypeText
      });
    } else {
      this.setData({
        userTypeText: '未登录'
      });
    }
  },

  /**
   * 加载头像
   * 从本地存储中获取头像
   */
  loadAvatar() {
    try {
      const avatarUrl = wx.getStorageSync('avatarUrl');
      if (avatarUrl) {
        this.setData({
          avatarUrl: avatarUrl
        });
      }
    } catch (e) {
      console.error('加载头像失败', e);
    }
  },

  /**
   * 选择头像
   * 从相册或摄像头选择图片作为头像，并本地存储
   */
  chooseAvatar() {
    const that = this;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success(res) {
        if (res.tapIndex === 0) {
          // 从相册选择
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
              that.saveAvatar(res.tempFilePaths[0]);
            }
          });
        } else if (res.tapIndex === 1) {
          // 拍照
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success(res) {
              that.saveAvatar(res.tempFilePaths[0]);
            }
          });
        }
      }
    });
  },

  /**
   * 保存头像
   * 将头像保存到本地存储
   * @param {string} avatarUrl - 头像临时路径
   */
  saveAvatar(avatarUrl) {
    const that = this;
    try {
      wx.setStorageSync('avatarUrl', avatarUrl);
      that.setData({
        avatarUrl: avatarUrl
      });
      wx.showToast({
        title: '头像设置成功',
        icon: 'success'
      });
    } catch (e) {
      wx.showToast({
        title: '头像设置失败',
        icon: 'none'
      });
    }
  },

  /**
   * 跳转到登录页面
   */
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 跳转到订单页面
   * 检查用户是否已登录，未登录则提示登录
   */
  goToOrders() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    const userType = app.getUserType();
    if (userType === 2) {
      wx.navigateTo({
        url: '/pages/merchant-orders/merchant-orders'
      });
    } else {
      wx.showToast({
        title: '跳转到订单页面',
        icon: 'none'
      });
    }
  },

  /**
   * 跳转到地址管理页面
   * 检查用户是否已登录，未登录则提示登录
   */
  goToAddresses() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/address/address'
    });
  },

  /**
   * 跳转到我的店铺页面
   * 检查用户是否已登录，未登录则提示登录
   */
  goToMyShop() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/my-shop/my-shop'
    });
  },

  /**
   * 退出登录
   * 清除用户信息和用户类型，并跳转到登录页面
   */
  logout() {
    const app = getApp();
    app.setUserInfo(null);
    app.setUserType(null);
    
    wx.showToast({
      title: '退出登录成功',
      icon: 'success'
    });
    
    // 跳转到登录页面
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }, 1000);
  },

  /**
   * 开始编辑账号名称
   */
  startEditName() {
    const userInfo = this.data.userInfo;
    this.setData({
      isEditingName: true,
      editingName: userInfo ? userInfo.account : ''
    });
  },

  /**
   * 取消编辑账号名称
   */
  cancelEditName() {
    this.setData({
      isEditingName: false,
      editingName: ''
    });
  },

  /**
   * 绑定账号名称输入
   * @param {Object} e - 输入事件对象
   */
  bindNameInput(e) {
    this.setData({
      editingName: e.detail.value
    });
  },

  /**
   * 保存账号名称
   */
  saveName() {
    const editingName = this.data.editingName.trim();
    
    if (!editingName) {
      wx.showToast({
        title: '账号名称不能为空',
        icon: 'none'
      });
      return;
    }

    const app = getApp();
    const userInfo = app.getUserInfo();
    
    if (userInfo) {
      userInfo.account = editingName;
      app.setUserInfo(userInfo);
      
      this.setData({
        userInfo: userInfo,
        isEditingName: false,
        editingName: ''
      });
      
      wx.showToast({
        title: '账号名称修改成功',
        icon: 'success'
      });
    }
  }
});