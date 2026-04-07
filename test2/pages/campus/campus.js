Page({
  data: {
    activeTab: 'announcement', // 当前激活的标签
    announcements: [], // 公告列表
    clubDynamics: [], // 社团动态列表
    canPost: false // 是否可以发布社团动态
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
   * 页面加载时执行
   * 检查登录状态，检查用户类型，加载公告和社团动态数据
   */
  onLoad() {
    if (!this.checkLogin()) return;
    const app = getApp();
    const userType = app.getUserType();
    
    // 只有社团账号可以发布社团动态
    this.setData({
      canPost: userType === 3
    });
    
    // 加载初始数据
    this.loadAnnouncements();
    this.loadClubDynamics();
  },

  /**
   * 页面显示时执行
   * 重新检查登录状态
   */
  onShow() {
    this.checkLogin();
  },

  /**
   * 切换标签
   * @param {Object} e - 事件对象
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 加载公告数据
   * 模拟公告列表数据
   */
  loadAnnouncements() {
    // 模拟加载公告数据
    const announcements = [
      {
        id: 1,
        title: '关于举办校园文化节的通知',
        time: '2026-03-10',
        content: '为丰富校园文化生活，学校将于本周末举办校园文化节，欢迎广大师生参加。'
      },
      {
        id: 2,
        title: '期末考试安排通知',
        time: '2026-03-09',
        content: '期末考试将于下周开始，请同学们做好准备。'
      },
      {
        id: 3,
        title: '奖学金评选结果公示',
        time: '2026-03-08',
        content: '2025-2026学年奖学金评选结果已公示，详见附件。'
      }
    ];

    this.setData({
      announcements: announcements
    });
  },

  /**
   * 加载社团动态数据
   * 模拟社团动态列表数据
   */
  loadClubDynamics() {
    // 模拟加载社团动态数据
    const clubDynamics = [
      {
        id: 1,
        title: '摄影社举办春季摄影展',
        author: '摄影社',
        time: '2026-03-10',
        content: '摄影社将于本周末举办春季摄影展，展示社员们的优秀作品。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20club%20activity&image_size=square'
      },
      {
        id: 2,
        title: '音乐社举办校园音乐会',
        author: '音乐社',
        time: '2026-03-09',
        content: '音乐社将于下周五举办校园音乐会，欢迎大家前来欣赏。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20club%20performance&image_size=square'
      }
    ];

    this.setData({
      clubDynamics: clubDynamics
    });
  },

  /**
   * 跳转到公告详情页面
   */
  goToAnnouncementDetail() {
    wx.navigateTo({
      url: '/pages/announcement/announcement'
    });
  },

  /**
   * 跳转到社团动态详情页面
   */
  goToClubDynamicDetail() {
    wx.navigateTo({
      url: '/pages/club-dynamic/club-dynamic'
    });
  },

  /**
   * 跳转到发布社团动态页面
   */
  goToPostClubDynamic() {
    wx.navigateTo({
      url: '/pages/post/post'
    });
  }
});