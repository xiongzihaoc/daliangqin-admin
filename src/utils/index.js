// 时间转换
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}'
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
// 格式化时间
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
      '日'
      // +
      // d.getHours() +
      // '时' +
      // d.getMinutes() +
      // '分'
    )
  }
}

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

//  根据身份证获取出生日期（yyyy-MM-dd）
export function GetBirthday(psidno) {
  var birthdayno, birthdaytemp
  if (psidno.length == 18) {
    birthdayno = psidno.substring(6, 14)
  } else if (psidno.length == 15) {
    birthdaytemp = psidno.substring(6, 12)
    birthdayno = "19" + birthdaytemp
  } else {
    return "";
  }
  var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
  return birthday
}

//  根据输入的身份证获取性别代码
export function Getsex(psidno) {
  var sexno, sex
  if (psidno.length == 18) {
    sexno = psidno.substring(16, 17)
  } else if (psidno.length == 15) {
    sexno = psidno.substring(14, 15)
  } else {
    return "";
  }
  var tempid = sexno % 2;
  if (tempid == 0) {
    sex = 'F'
  } else {
    sex = 'M'
  }
  return sex
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
// 时间验证规则
export function validateTime(rule, value, callback) {
  let time = new Date().valueOf()
  if (!value) {
    return callback(new Error("请选择时间"));
  } else if (value > time) {
    return callback(new Error("检测时间不能大于现在时间"));
  } else {
    callback();
  }
}
// 血糖保留一位小数
export function validateGlucoseScore(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入空腹血糖"));
  } else if (value.indexOf(".") != -1 && value.split(".").length > 2) {
    callback(new Error("请输入正确格式的血糖")); //防止输入多个小数点
  } else if (value.indexOf(".") != -1 && value.split(".")[1].length > 1) {
    callback(new Error("请输入正确的小数位数")); //小数点后两位
  } else {
    callback();
  }
};
// 文化程度
export const educationType = [
  { id: 1, label: "研究生", value: "POSTGRADUATE" },
  { id: 2, label: "大学本科", value: "UNDERGRADUATE" },
  { id: 3, label: "大学专科和专科", value: "SPECIALIST" },
  { id: 4, label: "中专", value: "TECHNICAL_SECONDARY" },
  { id: 5, label: "技工学校", value: "MECHANIC" },
  { id: 6, label: "高中", value: "SENIOR_MIDDLE" },
  { id: 7, label: "初中", value: "JUNIOR_HIGH" },
  { id: 8, label: "小学", value: "PRIMARY_SCHOOL" },
  { id: 9, label: "文盲或半文盲", value: "ILLITERATE_OR_SEMI_LITERATE" },
  { id: 10, label: "其他", value: "OTHER" },

]
// 医生类型列表
export const doctorTypeList = [
  { id: 1, label: "医师", value: "PHYSICIAN" },
  { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
  { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
  { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
]

// 随访方式列表
export const followTypeList = [
  { id: 1, label: "门诊随访", value: "OUTPATIENT" },
  { id: 2, label: "家庭随访", value: "FAMILY" },
  { id: 3, label: "电话随访", value: "PHONE" },
  { id: 4, label: "视频随访", value: "VIDEO" },
  { id: 5, label: "集体随访", value: "COLLECTIVE" },
]
// 随访类型
export const followType = [
  { id: 1, label: "高血压", value: "HIGH_BLOOD" },
  { id: 2, label: "糖尿病", value: "DIABETES" },
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
  // { id: 3, label: "H5", value: "H5" },
  // { id: 4, label: "PC", value: "PC_WEB" },
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
  { id: 3, label: "亲人", value: "RELATIVE" },
]

// 加入方式
export const resourceTypeList = [
  { id: 1, label: "医院派发", value: "ADMIN" },
  { id: 2, label: "主动加入", value: "INITIATIVE" },
]
// 性别列表
export const genderList = [
  { id: 1, label: "男", value: "MALE" },
  { id: 2, label: "女", value: "FEMALE" },
]

// 状态
export const statusList = [
  { id: 1, label: "未完成", value: "PENDING" },
  { id: 2, label: "已完成", value: "FINISH" },
  { id: 3, label: "已取消", value: "CANCEL" },
  { id: 4, label: "超时", value: "OVERDUE" }
]

// 高血压糖尿病结果列表
export const healthList = [
  { id: 1, label: "健康", value: "HEALTH" },
  { id: 2, label: "重度", value: "SERIOUS" },
  { id: 3, label: "中度", value: "MEDIUM" },
  { id: 4, label: "轻度", value: "SLIGHT" },
]

// 心率枚举
export const heartList = [
  { id: 1, label: "稍慢", value: "SLOW" },
  { id: 2, label: "稍快", value: "FAST" },
  { id: 3, label: "正常", value: "NORMAL" },
]


// 用户状态
export const userStatusList = [
  { id: 1, label: "良好", value: "HEALTH" },
  { id: 2, label: "轻微", value: "SLIGHT" },
  { id: 3, label: "严重", value: "SERIOUS" },
]

// 饮食习惯
export const eatHabitsList = [
  { id: 1, label: "清淡", value: "LIGHT" },
  { id: 2, label: "高盐", value: "HIGH_SALT" },
  { id: 3, label: "高脂 ", value: "HIGH_FAT" },
  { id: 4, label: "高糖", value: "HIGH_GLUCOSE" },
]

// 是否饮酒 抽烟
export const isSmokeList = [
  { id: 1, label: "从不", value: "NEVER" },
  { id: 2, label: "偶尔", value: "HAPLY" },
  { id: 3, label: "经常 ", value: "OFTEN" },
  { id: 4, label: "已戒", value: "QUIT" },
]

// 熬夜情况
export const stayUpLateList = [
  { id: 1, label: "从不", value: "NEVER" },
  { id: 2, label: "偶尔", value: "HAPLY" },
  { id: 3, label: "经常 ", value: "OFTEN" },
]

// 运动情况
export const exerciseList = [
  { id: 1, label: "1-3次", value: "ONE_THREE" },
  { id: 2, label: "4-7次", value: "FOUR_SEVEN" },
  { id: 3, label: "大于7次", value: "EXCEED_SEVEN" },
  { id: 4, label: "不运动 ", value: "NONE" },
]

// 慢性病史
export const chronicDiseaseList = [
  { id: 1, label: "糖尿病", value: "DIABETES" },
  { id: 2, label: "高血压", value: "HYPERTENSION" },
  { id: 3, label: "肿瘤", value: "TUMOR" },
  { id: 4, label: "慢性支气管炎 ", value: "CHRONIC_BRONCHITIS" },
  { id: 5, label: "心脏病 ", value: "HEART_DISEASE" },
  { id: 6, label: "其他 ", value: "OTHER" },
]

//  肝肾功能情况
export const liverFunction = [
  { id: 1, label: "异常", value: "ABNORMAL" },
  { id: 2, label: "正常", value: "NORMAL" },
]

//  有无情况
export const carotidPlaque = [
  { id: 1, label: "有", value: "HAVE" },
  { id: 2, label: "无", value: "NONE" },
]

//  静坐时长
export const sitType = [
  { id: 1, label: "小于八小时", value: "BEFORE_EIGHT" },
  { id: 2, label: "大于八小时", value: "AFTER_EIGHT" },
]

// 血型类型
export const bloodTypeList = [
  { id: 1, label: "A型", value: "A" },
  { id: 2, label: "B型", value: "B" },
  { id: 3, label: "0型", value: "O" },
  { id: 4, label: "AB型", value: "AB" },
  { id: 5, label: "AB型RH阳性", value: "RH_Y" },
  { id: 6, label: "AB型RH阴性", value: "RH_N" },
  { id: 7, label: "不详", value: "UNKNOWN" },
]
// 血型类型
export const marriageList = [
  { id: 1, label: "未婚", value: "UNMARRIED" },
  { id: 2, label: "已婚", value: "MARRIED" },
  { id: 3, label: "丧偶", value: "WIDOWED" },
  { id: 4, label: "离婚", value: "DIVORCE" },
  { id: 5, label: "其他", value: "OTHER" },
]
// 转诊状态列表
export const transferStatusList = [
  { id: 1, label: "待转诊确认", value: "WAIT" },
  { id: 2, label: "转诊中", value: "ING" },
  { id: 3, label: "已转诊", value: "END" },
  { id: 4, label: "未转诊", value: "NONE" },
  { id: 5, label: "向上转诊", value: "UP" },
  { id: 6, label: "向下转诊", value: "DOWN" },
  { id: 7, label: "转诊拒绝", value: "REFUSE" },
]

export const equipmentResourceTypeList = [
  { id: 1, label: "手动录入", value: "MANUAL" },
  { id: 2, label: "设备检测", value: "DETECTION" }
]

// 所有枚举类型转义
export const formatterElement = {
  // 随访方式
  followType: {
    OUTPATIENT: "门诊随访",
    FAMILY: "家庭随访",
    PHONE: "电话随访",
    VIDEO: "视频随访",
    COLLECTIVE: "集体随访",
  },
  // 随访类型
  followTypeList: {
    HIGH_BLOOD: "高血压",
    DIABETES: "糖尿病",
  },
  // 高血压状态
  highBlood: {
    HEALTH: "健康",
    SERIOUS: "严重",
    MEDIUM: "中度",
    SLIGHT: "轻微",

  },
  // 糖尿病状态
  diabetes: {
    HEALTH: "健康",
    SERIOUS: "严重",
    MEDIUM: "中度",
    SLIGHT: "轻微",
  },
  // 心率状态
  heart: {
    NORMAL: "正常",
    SLOW: "稍慢",
    FAST: "稍快",
  },
  // 加入方式
  resource: {
    ADMIN: "医院派发",
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
    RELATIVE: "亲人"
  },
  appType: {
    DOCTOR: "医生端",
    PATIENT: "用户端",
  },
  deviceType: {
    IOS: "苹果",
    ANDROID: "安卓",
    H5: "H5",
    PC: "PC",
  },
  userStatus: {
    HEALTH: "良好",
    SLIGHT: "轻微",
    SERIOUS: "严重",
  },
  transferStatus: {
    WAIT: "待转诊确认",
    ING: "转诊中",
    END: "已转诊",
    NONE: "未转诊",
    UP: "向上转诊",
    DOWN: "向下转诊",
    REFUSE: "转诊拒绝",
  },
  transferStatus: {
    WAIT: "待转诊确认",
    ING: "转诊中",
    END: "已转诊",
    NONE: "未转诊",
    UP: "向上转诊",
    DOWN: "向下转诊",
    REFUSE: "转诊拒绝",
  },
  diseaseType: {
    HIGH_BLOOD: "高血压",
    DIABETES: "糖尿病",
    HEART_RATE: "心率",
    CORONARY_HEART_DISEASE: "冠心病",
    CHRONIC_OBSTRUCTIVE_PULMONARY: "慢性阻塞性肺疾病",
    MALIGNANT_TUMOR: "恶性肿瘤",
    STROKE: "脑卒中",
    SEVERE_MENTAL_ILLNESS: "重性精神疾病",
    TUBERCULOSIS: "结核病",
    HEPATITIS: "肝炎",
    CONGENITAL_MALFORMATIONS: "先天畸形",
    OTHER: "其他",
  }
}