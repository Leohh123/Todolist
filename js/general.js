function encryptRSA(str) {
    var rsa = new RSAKey();
    var modulus =
        "DEE27A50E5FBEE1DC329248815D3D70C07D0E2E32FF26D07B45A04AFE8688A6DF5826D5EC901EC708FAAF49E0816EBB3DDA82FDF63438F3ECEC69FB980382A01EC43816AE1F27C157317CC22B44DEF95112869EAB9A9CBF9C48DD3378FC57E59385D8C713F1680292FC0F05F27121E9E0DB35AF335FE9B255F60D273700A3BAD";
    var exponent = "10001";
    rsa.setPublic(modulus, exponent);
    return rsa.encrypt(str);
}

function encryptAES(data, key, iv) {
    key = CryptoJS.enc.Latin1.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encodeURI(encrypted);
}

function decryptAES(data, key, iv) {
    key = CryptoJS.enc.Latin1.parse(key);
    iv = CryptoJS.enc.Latin1.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

function randInt(min, max) {
    var range = max - min;
    var rand = Math.random();
    return (min + Math.round(rand * range));
}

function randHex(length = 32) {
    var res = "";
    for (var i = 0; i < length; i++) {
        res += randInt(0, 15).toString(16);
    }
    return res;
}

function randString(length = 16) {
    var res = "";
    for (var i = 0; i < length; i++) {
        res += String.fromCharCode(randInt(33, 126));
    }
    return res;
}

function htmlEncode(data) {
    return $("<div/>").text(data).html();
}

function setCookie(name, value, expireMS) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireMS);
    document.cookie = name + "=" + escape(value) +
        ((expireMS == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;";
}

function getCookie(name) {
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

var KEY = randString(16);
var IV = randString(16);

function refresh() {
    var token = getCookie("token");
    if (!token) {
        setCookie("token", "", -1);
        return;
    }
    setCookie("token", encryptRSA(token));
    $.post("/user/php/refresh.php", {
        key: encryptRSA(KEY),
        iv: encryptRSA(IV)
    }, function (data) {
        data = JSON.parse(data);
        if (data.status == "OK") {
            var newToken = decryptAES(data.content, KEY, IV);
            setCookie("token", newToken, 24 * 60 * 60 * 1000);
        } else {
            setCookie("token", "", -1);
        }
    });
    setCookie("token", token);
}

function login(name, pass, succees, fail) {
    $.post("/user/php/login.php", {
        name: name,
        pass: encryptRSA(pass),
        key: encryptRSA(KEY),
        iv: encryptRSA(IV)
    }, function (data) {
        console.log(data);
        data = JSON.parse(data);
        if (data.status == "OK") {
            var newToken = decryptAES(data.content, KEY, IV);
            setCookie("token", newToken, 24 * 60 * 60 * 1000);
            if (succees) {
                succees();
            }
        } else {
            setCookie("token", "", -1);
            if (fail) {
                fail();
            }
        }
    });
}

function logout() {
    setCookie("token", "", -1);
    location.reload();
}

function post(...args) {
    var token = getCookie("token");
    setCookie("token", encryptRSA(token));
    $.post(...args);
    setCookie("token", token);
}