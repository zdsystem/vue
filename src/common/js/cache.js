// import storage from 'good-storage'

// 定义关键字
const SEARCH_KEY = '__SEARCH__'
// 定义最大长度
const SEARCH_MAX_LENGTH = 7

// 存储搜索历史
export function saveSearch(userInput) {
  let searches = localStorage.getItem(SEARCH_KEY, [])
  insertArr(searches, userInput, SEARCH_MAX_LENGTH)
  localStorage.setItem(SEARCH_KEY, searches)
  return searches
}
// Arr已存在的数组 val传入的元素 compare比较函数
export default function insertArr(arr, val, maxLen) {
  // if (!arr.indexOf(val)) {
  //   return
  // }
  // if (arr.indexOf(val)) {
  //   arr.splice(0, 1)
  // }
  arr.unshift(val) // 插入到数组最前
  if (maxLen && arr.length > maxLen) {
    arr.pop() // 删除末位元素
  }
}
// 加载本地缓存的搜索历史
export function loadSearch() {
  return localStorage.get(SEARCH_KEY, [])
}