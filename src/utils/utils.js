var countID = 0;
export function genID() {
    return ++countID;
}

export function padNumber(num, fill = 2) {
    return new Array(Math.max(1, fill - String(num).length + 1)).join("0") + String(num);
}

export function formatDate(time) {
    var d = new Date(time);
    return d.getFullYear() + "-" + padNumber(d.getMonth() + 1) + "-" + padNumber(d.getDate());
}

export function getDate() {
    return formatDate(new Date().getTime() - 14400000);
}

export function getDeltaDays(begin, end) {
    return (new Date(end).getTime() - new Date(begin).getTime()) / 86400000.0;
}

export function getPosition() {
    var tag = location.hash.toLowerCase();
    if (tag.indexOf("#today") != -1) {
        return "Today";
    } else if (tag.indexOf("#plan") != -1) {
        return "Plan";
    } else if (tag.indexOf("#about") != -1) {
        return "About";
    } else if (tag.indexOf("#settings") != -1) {
        return "Settings";
    }
    return "Home";
}

export function toRate(val) {
    return Math.min(1, Math.max(0, val));
}

export function toPercentage(val) {
    return String((val * 100).toFixed(2)) + "%";
}

export var theme = getCookie("theme") || "bilibili";

export function setTheme(val) {
    setCookie("theme", val);
}

/* ------ FOR USERS ------ */

export function setCookie(name, value, expireMS, global = false) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireMS);
    document.cookie = name + "=" + escape(value) +
        ((expireMS == null) ? "" : ";expires=" + exdate.toGMTString()) + (global ? ";path=/;" : "");
}

export function getCookie(name) {
    var start, end;
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + "=");
        if (start != -1) {
            start = start + name.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return "";
}

export function logout() {
    store.remove("token");
    location.reload();
}

export function post(...args) {
    $.post(...args);
}