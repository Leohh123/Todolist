import Vue from "vue";

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

/* The following is about encryption transmission for users */

function encryptRSA(str) {
    var rsa = new RSAKey();
    var modulus =
        "DEE27A50E5FBEE1DC329248815D3D70C07D0E2E32FF26D07B45A04AFE8688A6DF5826D5EC901EC708FAAF49E0816EBB3DDA82FDF63438F3ECEC69FB980382A01EC43816AE1F27C157317CC22B44DEF95112869EAB9A9CBF9C48DD3378FC57E59385D8C713F1680292FC0F05F27121E9E0DB35AF335FE9B255F60D273700A3BAD";
    var exponent = "10001";
    rsa.setPublic(modulus, exponent);
    return rsa.encrypt(str);
}

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
    setCookie("token", "", -1, true);
    location.reload();
}

export function post(...args) {
    var token = getCookie("token");
    setCookie("token", encryptRSA(token), null, true);
    $.post(...args);
    setCookie("token", token, null, true);
}