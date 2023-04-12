// 默认缓存期限为7天
// const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 1;
const DEFAULT_CACHE_TIME = 60 * 5;

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = () => {
  const storage = localStorage;
  // private storage = sessionStorage;
  const prefixKey = '';

  const getKey = (key: string) => `${prefixKey}${key}`;

  /**
   * @description 设置缓存
   * @param {string} key 缓存键
   * @param {*} value 缓存值
   * @param expire
   */
  const set = (key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) => {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    });
    storage.setItem(getKey(key), stringData);
  };

  /**
   * 从缓存删除某项
   * @param {string} key
   */
  const remove = (key: string) => {
    storage.removeItem(getKey(key));
  };

  /**
   * 读取缓存
   * @param {string} key 缓存键
   * @param {*=} def 默认值
   */
  const get = <T = any>(key: string, def: any = null): T => {
    const item = storage.getItem(getKey(key));
    if (item) {
      try {
        const data = JSON.parse(item);
        const { value, expire } = data;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value;
        }
        remove(getKey(key));
      } catch (e) {
        return def;
      }
    }
    return def;
  };

  /**
   * 清空所有缓存
   * @memberOf Cache
   */
  const clear = (): void => {
    storage.clear();
  };

  /**
   * 设置cookie
   * @param {string} name cookie 名称
   * @param {*} value cookie 值
   * @param {number=} expire 过期时间
   * 如果过期时间为设置，默认关闭浏览器自动删除
   * @example
   */
  const setCookie = (name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) => {
    document.cookie = `${getKey(name)}=${value}; Max-Age=${expire}`;
  };

  /**
   * 根据名字获取cookie值
   * @param name
   */
  const getCookie = (name: string): string => {
    const cookieArr = document.cookie.split('; ');
    for (let i = 0, { length } = cookieArr; i < length; i++) {
      const kv = cookieArr[i].split('=');
      if (kv[0] === getKey(name)) {
        return kv[1];
      }
    }
    return '';
  };

  /**
   * 根据名字删除指定的cookie
   * @param {string} key
   */
  const removeCookie = (key: string) => {
    setCookie(key, 1, -1);
  };

  /**
   * 清空cookie，使所有cookie失效
   */
  const clearCookie = (): void => {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      keys.forEach((item) => {
        document.cookie = `${item}=0;expire=${new Date(0).toUTCString()}`;
      });
    }
  };

  return { set, get, remove, clear, getCookie, setCookie, removeCookie, clearCookie };
};

const Storage = createStorage();

export default Storage;
