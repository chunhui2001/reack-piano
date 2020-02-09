
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

export default new Lang();

