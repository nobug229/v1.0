const PermissionManager = require('../../utils/permission-manager.js');

Page({
  data: {
    userInfo: null,
    userType: null,
    userTypeText: '未登录',
    avatarUrl: '',
    isEditingName: false,
    editingName: '',
    isMerchant: false
  },

  checkLogin() {
    const app = getApp();
    if (!app.getUserInfo()) {
      wx.reLaunch({
        url: '/pages/登录/login'
      });
      return false;
    }
    return true;
  },

  onLoad() {
    if (!this.checkLogin()) return;
    this.loadUserInfo();
    this.loadAvatar();
  },

  onShow() {
    if (!this.checkLogin()) return;
    this.loadUserInfo();
    this.checkMerchantStatus();
  },

  checkMerchantStatus() {
    const isMerchant = PermissionManager.isMerchant();
    this.setData({
      isMerchant: isMerchant
    });
    
    if (isMerchant) {
      wx.hideTabBar();
    }
  },

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
          userTypeText = '商家账号';
          break;
        case 3:
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

  chooseAvatar() {
    const that = this;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success(res) {
        if (res.tapIndex === 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
              that.saveAvatar(res.tempFilePaths[0]);
            }
          });
        } else if (res.tapIndex === 1) {
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

  goToLogin() {
    wx.navigateTo({
      url: '/pages/登录/login'
    });
  },

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
        url: '/pages/商户订单/merchant-orders'
      });
    } else {
      wx.showToast({
        title: '跳转到订单页面',
        icon: 'none'
      });
    }
  },

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
      url: '/pages/收货地址/address'
    });
  },

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
      url: '/pages/我的店铺/my-shop'
    });
  },

  logout() {
    const app = getApp();
    app.setUserInfo(null);
    app.setUserType(null);
    
    wx.showToast({
      title: '退出登录成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/登录/login'
      });
    }, 1000);
  },

  startEditName() {
    const userInfo = this.data.userInfo;
    this.setData({
      isEditingName: true,
      editingName: userInfo ? userInfo.account : ''
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
  },

  goToMerchantHome() {
    wx.reLaunch({
      url: '/pages/商家首页/merchant-home'
    });
  }
});
