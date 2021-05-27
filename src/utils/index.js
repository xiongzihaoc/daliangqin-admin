
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 手机号验证规则
export function validatePhone(rule, value, callback) {
  const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
  if (!value) {
    return callback(new Error("请填写手机号码"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写正确的手机号码"));
  } else {
    callback();
  }
}
// 验证码验证规则
export function validateCode(rule, value, callback) {
  const reg = /^\d{6}$/;
  if (!value) {
    return callback(new Error("请填写短信验证码"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写6位短信验证码"));
  } else {
    callback();
  }
}
// 身份证验证规则
export function validateIdCard(rule, value, callback) {
  const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!value) {
    return callback(new Error("请填写身份证号"));
  } else if (!reg.test(value)) {
    return callback(new Error("请填写正确的身份证号"));
  } else {
    callback();
  }
}

// 医生类型列表
export const doctorTypeList = [
  { id: 1, label: "医师", value: "PHYSICIAN" },
  { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
  { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
  { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
]

// 随访方式列表
export const followTypeList = [
  { id: 1, label: "诊间随访", value: "CLINIC" },
  { id: 2, label: "上门随访", value: "DOOR" },
  { id: 3, label: "视频随访", value: "VIDEO" },
  { id: 4, label: "语音随访", value: "VOICE" },
]

// 角色类型
export const adminRoleTypeList = [
  { id: 1, label: "管理员", value: "ADMIN" },
  { id: 2, label: "运营人员", value: "OPERATOR" },
  { id: 3, label: "数据大图", value: "VIEWER" },
]

// 设备类型
export const deviceTypeList = [
  { id: 1, label: "苹果", value: "IOS" },
  { id: 2, label: "安卓", value: "ANDROID" },
  { id: 3, label: "H5", value: "H5" },
  { id: 4, label: "PC", value: "PC" },
]

// app类型列表
export const appTypeList = [
  { id: 1, label: "医生端", value: "DOCTOR" },
  { id: 2, label: "用户端", value: "PATIENT" },
]

// banner上下架状态
export const typeList = [
  { id: 1, label: "上架", value: "UP" },
  { id: 2, label: "下架", value: "DOWN" },
]

// 新闻资讯上下架状态
export const newsStatusList = [
  { id: 1, label: "上架", value: "SHOW" },
  { id: 2, label: "下架", value: "DELETE" },
]

// 新闻类型
export const newsTypeList = [
  { id: 1, label: "资讯", value: "NEWS" },
  { id: 2, label: "视频", value: "VIDEO" },
  { id: 3, label: "直播", value: "LIVE" },
]

// 医院级别列表
export const hospitalClassList = [
  { id: 1, label: "三甲", value: "CLASS_3_A" },
  { id: 2, label: "三乙", value: "CLASS_3_B" },
  { id: 3, label: "二甲", value: "CLASS_2_A" },
  { id: 4, label: "二乙", value: "CLASS_2_B" },
  { id: 5, label: "一级", value: "CLASS_1_A" },
]

// 关系列表
export const relationshipList = [
  { id: 1, label: "家人", value: "FAMILY" },
  { id: 2, label: "朋友", value: "FRIENDS" },
  { id: 3, label: "亲戚", value: "RELATIVE" },
]


// 性别列表
export const genderList = [
  { id: 1, label: "男", value: "MALE" },
  { id: 2, label: "女", value: "FEMALE" },
]

// 所有枚举类型转义
export const formatterElement = {
  // 随访方式
  followType: {
    CLINIC: "诊间随访",
    VOICE: "语音随访",
    DOOR: "上门随访",
    VIDEO: "视频随访"
  },
  // 高血压状态
  highBlood: {
    HEALTH: "健康",
    SERIOUS: "严重",
    MEDIUM: "中等",
    SLIGHT: "轻微",
    SLOW: "稍慢",
    FAST: "稍快",
    NORMAL: "正常",
  },
  // 糖尿病状态
  diabetes: {
    HEALTH: "健康",
    SERIOUS: "严重",
    MEDIUM: "中等",
    SLIGHT: "轻微",
    SLOW: "稍慢",
    FAST: "稍快",
    NORMAL: "正常",
  },
  // 加入方式
  resource: {
    ADMIN: "后台派发",
    INITIATIVE: "主动加入",
  },
  doctorType: {
    PHYSICIAN: "医师",
    ATTENDING_PHYSICIAN: "主治医师",
    ASSOCIATE_CHIEF_PHYSICIAN: "副主任医师",
    CHIEF_PHYSICIAN: "主任医师",
  },
  status: {
    PENDING: "未完成",
    FINISH: "已完成",
    CANCEL: "已取消",
    OVERDUE: "超时",
  },
  contentType: {
    NEWS: "资讯",
    VIDEO: "视频",
    LIVE: "直播",
  },
  // 医院级别列表
  hospitalType: {
    CLASS_3_A: "三甲",
    CLASS_3_B: "三乙",
    CLASS_2_A: "二甲",
    CLASS_2_B: "二乙",
    CLASS_1_A: "一级",
  },
  gender: {
    MALE: "男",
    FEMALE: "女"
  },
  relationship: {
    FAMILY: "家人",
    FRIENDS: "朋友",
    RELATIVE: "亲戚"
  },
  appType: {
    DOCTOR: "家人",
    PATIENT: "朋友",
  },
  deviceType: {
    IOS: "苹果",
    ANDROID: "安卓",
    H5: "H5",
    PC: "PC",
  },
}
