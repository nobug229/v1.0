
const DataService = {
  cloudEnv: null,
  isCloudEnabled: false,

  initCloud(envId) {
    this.cloudEnv = envId;
    this.isCloudEnabled = true;
    if (wx.cloud) {
      wx.cloud.init({
        env: envId,
        traceUser: true
      });
    }
  },

  getStorage(key) {
    if (this.isCloudEnabled) {
      return this.getCloudStorage(key);
    }
    return this.getLocalStorage(key);
  },

  setStorage(key, data) {
    if (this.isCloudEnabled) {
      return this.setCloudStorage(key, data);
    }
    return this.setLocalStorage(key, data);
  },

  removeStorage(key) {
    if (this.isCloudEnabled) {
      return this.removeCloudStorage(key);
    }
    return this.removeLocalStorage(key);
  },

  getLocalStorage(key) {
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      console.error('获取本地存储失败', e);
      return null;
    }
  },

  setLocalStorage(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (e) {
      console.error('保存本地存储失败', e);
      return false;
    }
  },

  removeLocalStorage(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('删除本地存储失败', e);
      return false;
    }
  },

  getCloudStorage(key) {
    console.log('云开发接口 - 获取数据:', key);
    return this.getLocalStorage(key);
  },

  setCloudStorage(key, data) {
    console.log('云开发接口 - 保存数据:', key, data);
    return this.setLocalStorage(key, data);
  },

  removeCloudStorage(key) {
    console.log('云开发接口 - 删除数据:', key);
    return this.removeLocalStorage(key);
  },

  getCollection(collectionName) {
    if (this.isCloudEnabled) {
      return this.getCloudCollection(collectionName);
    }
    return this.getLocalCollection(collectionName);
  },

  addToCollection(collectionName, data) {
    if (this.isCloudEnabled) {
      return this.addToCloudCollection(collectionName, data);
    }
    return this.addToLocalCollection(collectionName, data);
  },

  updateCollection(collectionName, id, data) {
    if (this.isCloudEnabled) {
      return this.updateCloudCollection(collectionName, id, data);
    }
    return this.updateLocalCollection(collectionName, id, data);
  },

  deleteFromCollection(collectionName, id) {
    if (this.isCloudEnabled) {
      return this.deleteFromCloudCollection(collectionName, id);
    }
    return this.deleteFromLocalCollection(collectionName, id);
  },

  getLocalCollection(collectionName) {
    return this.getLocalStorage(collectionName) || [];
  },

  addToLocalCollection(collectionName, data) {
    const collection = this.getLocalCollection(collectionName);
    const newItem = {
      _id: Date.now().toString(),
      ...data,
      createTime: Date.now()
    };
    collection.unshift(newItem);
    this.setLocalStorage(collectionName, collection);
    return newItem;
  },

  updateLocalCollection(collectionName, id, data) {
    const collection = this.getLocalCollection(collectionName);
    const index = collection.findIndex(item => item._id === id);
    if (index !== -1) {
      collection[index] = { ...collection[index], ...data, updateTime: Date.now() };
      this.setLocalStorage(collectionName, collection);
      return collection[index];
    }
    return null;
  },

  deleteFromLocalCollection(collectionName, id) {
    const collection = this.getLocalCollection(collectionName);
    const index = collection.findIndex(item => item._id === id);
    if (index !== -1) {
      const deleted = collection.splice(index, 1)[0];
      this.setLocalStorage(collectionName, collection);
      return deleted;
    }
    return null;
  },

  getCloudCollection(collectionName) {
    console.log('云开发接口 - 获取集合:', collectionName);
    return this.getLocalCollection(collectionName);
  },

  addToCloudCollection(collectionName, data) {
    console.log('云开发接口 - 添加到集合:', collectionName, data);
    return this.addToLocalCollection(collectionName, data);
  },

  updateCloudCollection(collectionName, id, data) {
    console.log('云开发接口 - 更新集合:', collectionName, id, data);
    return this.updateLocalCollection(collectionName, id, data);
  },

  deleteFromCloudCollection(collectionName, id) {
    console.log('云开发接口 - 从集合删除:', collectionName, id);
    return this.deleteFromLocalCollection(collectionName, id);
  },

  callCloudFunction(functionName, data = {}) {
    console.log('云开发接口 - 调用云函数:', functionName, data);
    return Promise.resolve({ result: null });
  }
};

module.exports = DataService;
