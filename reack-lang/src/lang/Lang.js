
function Lang () {

}

// 格式化 B, KB, MB, GB, TB, PB, EB
Lang.prototype.unitSize = function (size) {
    if (size == null) return null;
	var unit_k = 1024.0;
    var unit_m = unit_k * 1024;
    var unit_g = unit_m * 1024;
    var unit_t = unit_g * 1024;
    var unit_p = unit_t * 1024;
    var unit_e = unit_p * 1024;
    if (size > unit_e) return (size / unit_e).toFixed(2) + "E";
    else if (size > unit_p) return (size / unit_p).toFixed(2) + "PB";
    else if (size > unit_t) return (size / unit_t).toFixed(2) + "TB";
    else if (size > unit_g) return (size / unit_g).toFixed(2) + "GB";
    else if (size > unit_m) return (size / unit_m).toFixed(2) + "MB";
    else if (size > unit_k) return (size / unit_k).toFixed(2) + "KB";
    else return size + "B";
}

// 1年123天17小时34分14秒
Lang.prototype.unitTime = function (ms) {
    var unit_ms = 1000.0;
    var unit_min = unit_ms * 60;
    var unit_hour = unit_min * 60;
    var unit_day = unit_hour * 24;
    var unit_year = unit_day * 365;
    if ( ms >= unit_year) return Math.floor(ms / unit_year) + '年' + this.unitTime(ms % unit_year);
    else if ( ms >= unit_day) return Math.floor(ms / unit_day) + '天' + this.unitTime(ms % unit_day);
    else if ( ms >= unit_hour) return Math.floor(ms / unit_hour) + '小时' + this.unitTime(ms % unit_hour);
    else if ( ms >= unit_min) return Math.floor(ms / unit_min) + '分' + this.unitTime(ms % unit_min);
    else if ( ms >= unit_ms || ms < unit_ms) return Math.round(ms / unit_ms) > 0 ? Math.round(ms / unit_ms) + '秒' : "";
}

// 移除数组的最后一个元素
Lang.prototype.arrayPop = function (arr) {
    if (!arr || arr.length === 0) return arr;
    arr.pop();
    return arr;
}

// 生成uuid
Lang.prototype.genUuid = function (obj) {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                          var r = Math.random() * 16 | 0;
                          var v = c === 'x' ? r : (r & 0x3 | 0x8);
                          return v.toString(16);
                        });
}

// 替换字符串中可能出现的换行符
Lang.prototype.getInlineString = function (strContent) {
    let inlineString = strContent.replace(/\r\n/g, ' '); //IE9、FF、chrome
    inlineString = inlineString.replace(/\n/g, ' '); //IE7-8
    return inlineString;
}

// 对象 转json
Lang.prototype.getJsonify = function (jsonString) {
    let jsonify = this.getInlineString(jsonString);
    return JSON.parse(jsonify)
}

// 如果属性值是空字符串则设置为空
Lang.prototype.setEmptyValueToNull = function (obj) {
  if (obj == null) {
    return null;
  }
  if (typeof obj !== 'object') {
    if (obj === '') {
      return null;
    }
    return obj;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (value === '') {
      obj[key] = null;
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      obj[key] = value.map(it => this.setEmptyValueToNull(it)).filter(f => f);
    } else if (typeof value === 'object') {
      obj[key] = this.setEmptyValueToNull(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

Lang.prototype.toQueryString = function(obj) {
  if (!obj) {
    return '';
  }
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    if ((!key || key.trim().length === '') && (!value || value.trim().length === '')) {
      continue;
    }
    result = result + (key + '=' + (value ? value : '') + '&');
  }
  if (result.length > 0) {
    result = '?' + result.substr(0, result.length - 1);
  }
  return result;
}

// 解析url
Lang.prototype.parseUrl = function (url) {
    if (url == null || url.trim() === '') {
      return {};
    }
    // http://example.com:3000/pathname/?search=test#hash
    var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: url,
        protocol: match[1],  // http:
        host: match[2], // example.com:3000
        hostname: match[3], // example.com
        port: match[4], // 3000
        pathname: match[5], // /pathname/
        search: match[6], // ?search=test
        hash: match[7] // #hash
    }
}

Lang.prototype.blank = function(obj) {
  if (!obj) {
    return true;
  }
  let l = Object.entries(obj);
  return !l || l.length === 0;
}

export default new Lang();

