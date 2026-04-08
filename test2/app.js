const DataService = require('./utils/data-service.js');
const CloudConfig = require('./config/cloud-config.js');

App({
  onLaunch() {
    this.globalData = {
      userInfo: null,
      userType: null,
      currentOrder: null,
      selectedRestaurant: null,
      cloudConfig: CloudConfig,
      dataService: DataService
    };
  },

  getUserInfo() {
    return this.globalData.userInfo;
  },

  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
  },

  getUserType() {
    return this.globalData.userType;
  },

  setUserType(userType) {
    this.globalData.userType = userType;
  },

  getDataService() {
    return this.globalData.dataService;
  },

  getCloudConfig() {
    return this.globalData.cloudConfig;
  },

  initCloudDevelopment(envId) {
    if (envId) {
      this.globalData.cloudConfig.envId = envId;
      this.globalData.dataService.initCloud(envId);
    }
  }
});