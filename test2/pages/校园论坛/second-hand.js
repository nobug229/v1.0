const PermissionManager = require('../../utils/permission-manager.js');

Page({
  data: {
    showFilterMenu: false,
    selectedTag: '',
    allPosts: [],
    filteredPosts: [],
    isAdmin: false
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
    this.checkAdminStatus();
    this.loadPosts();
  },

  onShow() {
    this.checkLogin();
    this.checkAdminStatus();
  },

  checkAdminStatus() {
    const isAdmin = PermissionManager.isAdmin();
    this.setData({
      isAdmin: isAdmin
    });
  },

  toggleFilterMenu() {
    this.setData({
      showFilterMenu: !this.data.showFilterMenu
    });
  },

  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: tag,
      showFilterMenu: false
    });
    this.filterPosts();
  },

  loadPosts() {
    const app = getApp();
    const dataService = app.getDataService();
    
    let posts = dataService.getCollection('posts');

    if (posts.length === 0) {
      posts = [
        {
          id: 1,
          _id: '1',
          tag: 'sell',
          tagName: '出售',
          title: '二手教材出售',
          content: '大学英语教材，几乎全新，价格面议',
          author: '张三',
          time: '2小时前',
          price: 50,
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=second%20hand%20book&image_size=square',
          isPinned: false,
          createTime: Date.now() - 2 * 60 * 60 * 1000
        },
        {
          id: 2,
          _id: '2',
          tag: 'sell',
          tagName: '出售',
          title: '二手自行车转让',
          content: '八成新，适合校园骑行，价格可议',
          author: '李四',
          time: '4小时前',
          price: 200,
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=second%20hand%20bicycle&image_size=square',
          isPinned: false,
          createTime: Date.now() - 4 * 60 * 60 * 1000
        },
        {
          id: 3,
          _id: '3',
          tag: 'lost-found',
          tagName: '失物招领',
          title: '捡到一个钱包',
          content: '在食堂门口捡到一个黑色钱包，请到失物招领处认领',
          author: '热心同学',
          time: '3小时前',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wallet&image_size=square',
          isPinned: false,
          createTime: Date.now() - 3 * 60 * 60 * 1000
        },
        {
          id: 4,
          _id: '4',
          tag: 'looking-for',
          tagName: '寻物',
          title: '寻物启事：学生卡丢失',
          content: '在图书馆丢失学生卡，姓名：王五，如有捡到请联系',
          author: '王五',
          time: '6小时前',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lost%20student%20card&image_size=square',
          isPinned: false,
          createTime: Date.now() - 6 * 60 * 60 * 1000
        },
        {
          id: 5,
          _id: '5',
          tag: 'campus-chat',
          tagName: '校园交流',
          title: '校园活动推荐',
          content: '本周末有校园音乐会，欢迎大家参加',
          author: '赵六',
          time: '8小时前',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20activity&image_size=square',
          isPinned: false,
          createTime: Date.now() - 8 * 60 * 60 * 1000
        },
        {
          id: 6,
          _id: '6',
          tag: 'campus-chat',
          tagName: '校园交流',
          title: '考研自习室推荐',
          content: '图书馆三楼自习室环境不错，适合考研复习',
          author: '考研党',
          time: '10小时前',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=library%20study%20room&image_size=square',
          isPinned: false,
          createTime: Date.now() - 10 * 60 * 60 * 1000
        }
      ];
      
      dataService.setStorage('posts', posts);
    }

    this.setData({
      allPosts: posts,
      filteredPosts: posts
    });
  },

  filterPosts() {
    const { selectedTag, allPosts } = this.data;
    
    let filteredPosts = allPosts;
    
    if (selectedTag) {
      filteredPosts = allPosts.filter(post => post.tag === selectedTag);
    }
    
    filteredPosts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.createTime - a.createTime;
    });
    
    this.setData({
      filteredPosts: filteredPosts
    });
  },

  deletePost(e) {
    const postId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这篇帖子吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const dataService = app.getDataService();
          
          dataService.deleteFromCollection('posts', postId);
          
          this.loadPosts();
          this.filterPosts();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  pinPost(e) {
    const postId = e.currentTarget.dataset.id;
    const app = getApp();
    const dataService = app.getDataService();
    
    const allPosts = this.data.allPosts;
    const post = allPosts.find(p => p._id === postId || p.id === postId);
    
    if (post) {
      post.isPinned = !post.isPinned;
      
      dataService.updateCollection('posts', post._id || post.id.toString(), {
        isPinned: post.isPinned
      });
      
      this.setData({
        allPosts: allPosts
      });
      
      this.filterPosts();
      
      wx.showToast({
        title: post.isPinned ? '已置顶' : '已取消置顶',
        icon: 'success'
      });
    }
  },

  goToPost() {
    wx.navigateTo({
      url: '/pages/发帖/post'
    });
  },

  goToPostDetail(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/帖子详情/post-detail?id=${postId}`
    });
  }
});
