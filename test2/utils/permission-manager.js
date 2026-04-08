const PermissionManager = {
  getUserType() {
    const app = getApp();
    return app.getUserType();
  },

  isAdmin() {
    return this.getUserType() === 3;
  },

  isMerchant() {
    return this.getUserType() === 2;
  },

  isStudent() {
    return this.getUserType() === 1;
  },

  canDeletePost() {
    return this.isAdmin();
  },

  canPinPost() {
    return this.isAdmin();
  },

  canEditPost(postAuthorId) {
    if (!postAuthorId || typeof postAuthorId !== 'string') {
      return false;
    }
    
    const app = getApp();
    const userInfo = app.getUserInfo();
    if (!userInfo) return false;
    if (this.isAdmin()) return true;
    return userInfo.account === postAuthorId;
  },

  canManageRestaurant() {
    return this.isMerchant();
  },

  canViewAllOrders() {
    return false;
  },

  canManageUsers() {
    return false;
  },

  checkPermission(permission) {
    const permissions = {
      'delete_post': this.canDeletePost(),
      'pin_post': this.canPinPost(),
      'edit_post': this.canEditPost(),
      'manage_restaurant': this.canManageRestaurant(),
      'view_all_orders': this.canViewAllOrders(),
      'manage_users': this.canManageUsers()
    };
    
    return permissions[permission] || false;
  },

  getPermissions() {
    return {
      isAdmin: this.isAdmin(),
      isMerchant: this.isMerchant(),
      isStudent: this.isStudent(),
      canDeletePost: this.canDeletePost(),
      canPinPost: this.canPinPost(),
      canManageRestaurant: this.canManageRestaurant(),
      canViewAllOrders: this.canViewAllOrders(),
      canManageUsers: this.canManageUsers()
    };
  }
};

module.exports = PermissionManager;
