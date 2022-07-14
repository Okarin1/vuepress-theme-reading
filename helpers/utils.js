// 时间格式化
export function formatDate(time, fmt = "yyyy-MM-dd hh:mm:ss") {
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 添"0"操作
function padLeftZero(str) {
  return ("00" + str).substr(str.length)
}

// 比对时间
export function compareDate(a, b) {
  const aDateNum = getTimeNum(a.frontmatter.date)
  const bDateNum = getTimeNum(b.frontmatter.date)
  if (aDateNum === 0 && bDateNum === 0) return 0
  return bDateNum - aDateNum
}

// 获取时间的数字类型
export function getTimeNum(date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}
