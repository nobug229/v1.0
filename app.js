App({
  onLaunch() {
    // 全局数据
    this.globalData = {
      userInfo: null,
      userType: null, // 1: 学生, 2: 商户, 3: 社团, 4: 管理员
      currentOrder: null,
      selectedRestaurant: null
    };
  },

  // 获取用户信息
  getUserInfo() {
    return this.globalData.userInfo;
  },

  // 设置用户信息
  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
  },

  // 获取用户类型
  getUserType() {
    return this.globalData.userType;
  },

  // 设置用户类型
  setUserType(userType) {
    this.globalData.userType = userType;
  }
});