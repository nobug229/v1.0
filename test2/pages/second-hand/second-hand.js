Page({
  data: {
    showFilterMenu: false, // 是否显示筛选菜单
    selectedTag: '', // 选中的标签
    allPosts: [], // 所有帖子
    filteredPosts: [] // 筛选后的帖子
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
   * 检查登录状态，加载初始帖子数据
   */
  onLoad() {
    if (!this.checkLogin()) return;
    this.loadPosts();
  },

  /**
   * 页面显示时执行
   * 重新检查登录状态
   */
  onShow() {
    this.checkLogin();
  },

  /**
   * 切换筛选菜单显示状态
   */
  toggleFilterMenu() {
    this.setData({
      showFilterMenu: !this.data.showFilterMenu
    });
  },

  /**
   * 选择标签
   * @param {Object} e - 事件对象
   */
  selectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: tag,
      showFilterMenu: false
    });
    this.filterPosts();
  },

  /**
   * 加载帖子数据
   */
  loadPosts() {
    const posts = [
      {
        id: 1,
        tag: 'sell',
        tagName: '出售',
        title: '二手教材出售',
        content: '大学英语教材，几乎全新，价格面议',
        author: '张三',
        time: '2小时前',
        price: 50,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=second%20hand%20book&image_size=square'
      },
      {
        id: 2,
        tag: 'sell',
        tagName: '出售',
        title: '二手自行车转让',
        content: '八成新，适合校园骑行，价格可议',
        author: '李四',
        time: '4小时前',
        price: 200,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=second%20hand%20bicycle&image_size=square'
      },
      {
        id: 3,
        tag: 'lost-found',
        tagName: '失物招领',
        title: '捡到一个钱包',
        content: '在食堂门口捡到一个黑色钱包，请到失物招领处认领',
        author: '热心同学',
        time: '3小时前',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wallet&image_size=square'
      },
      {
        id: 4,
        tag: 'looking-for',
        tagName: '寻物',
        title: '寻物启事：学生卡丢失',
        content: '在图书馆丢失学生卡，姓名：王五，如有捡到请联系',
        author: '王五',
        time: '6小时前',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lost%20student%20card&image_size=square'
      },
      {
        id: 5,
        tag: 'campus-chat',
        tagName: '校园交流',
        title: '校园活动推荐',
        content: '本周末有校园音乐会，欢迎大家参加',
        author: '赵六',
        time: '8小时前',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20activity&image_size=square'
      },
      {
        id: 6,
        tag: 'campus-chat',
        tagName: '校园交流',
        title: '考研自习室推荐',
        content: '图书馆三楼自习室环境不错，适合考研复习',
        author: '考研党',
        time: '10小时前',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=library%20study%20room&image_size=square'
      }
    ];

    this.setData({
      allPosts: posts,
      filteredPosts: posts
    });
  },

  /**
   * 根据选中的标签过滤帖子
   */
  filterPosts() {
    const { selectedTag, allPosts } = this.data;
    
    if (!selectedTag) {
      this.setData({
        filteredPosts: allPosts
      });
    } else {
      const filteredPosts = allPosts.filter(post => 
        post.tag === selectedTag
      );
      this.setData({
        filteredPosts: filteredPosts
      });
    }
  },

  /**
   * 跳转到发布帖子页面
   */
  goToPost() {
    wx.navigateTo({
      url: '/pages/post/post'
    });
  },

  /**
   * 跳转到帖子详情页面
   */
  goToPostDetail() {
    wx.navigateTo({
      url: '/pages/post-detail/post-detail'
    });
  }
});