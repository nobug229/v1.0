Page({
  data: {
    selectedFilters: [],
    allPosts: [],
    filteredPosts: []
  },

  getTagName(tag) {
    const tagNames = {
      'sell': '出售',
      'lost-found': '失物招领',
      'looking-for': '寻物',
      'campus-chat': '校园交流'
    };
    return tagNames[tag] || tag;
  },

  onLoad() {
    this.loadPosts();
  },

  toggleFilter(e) {
    const tag = e.currentTarget.dataset.tag;
    let selectedFilters = [...this.data.selectedFilters];
    
    const index = selectedFilters.indexOf(tag);
    if (index > -1) {
      selectedFilters.splice(index, 1);
    } else {
      selectedFilters.push(tag);
    }
    
    this.setData({
      selectedFilters: selectedFilters
    });
    
    this.filterPosts();
  },

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

  filterPosts() {
    const { selectedFilters, allPosts } = this.data;
    
    if (selectedFilters.length === 0) {
      this.setData({
        filteredPosts: allPosts
      });
    } else {
      const filteredPosts = allPosts.filter(post => 
        selectedFilters.includes(post.tag)
      );
      this.setData({
        filteredPosts: filteredPosts
      });
    }
  },

  goToPost() {
    wx.navigateTo({
      url: '/pages/post/post'
    });
  },

  goToPostDetail() {
    wx.navigateTo({
      url: '/pages/post-detail/post-detail'
    });
  }
});