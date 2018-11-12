# Todolist

![](https://img.shields.io/badge/license-MIT-green.svg) ![](https://img.shields.io/badge/Powered%20by-Leohh-blue.svg)

瞎几把做的一个Todolist 2333

A full-featured and user-friendly Todolist.

## Usage

Website: [http://leohh.xyz/todo/](http://leohh.xyz/todo/)

### Sign up/in

先注册再登录没啥说的

### Plan

输入你的计划的开始时间和结束时间（左闭右开区间）

然后添加项目，每个项目包含名称name、需要完成的总数total、和在整个计划中所占权重proportion

其中proportion支持浮点数

然后Submit your plan

### Today

对于每一个项目，你可以在当天添加任意多个已完成的工作，并注以说明

然后在最下面可以对当天有一个一句话的总结

然后Submit，更新当天的完成进度

### Home

最上面是当前计划的基本信息以及总进度表

然后下面显示你的每一天以及完成了哪些项目

### Settings

目前只有设置主题颜色一项......

（待添加）

## Install

如果想在本地撘一个的话，直接下载压缩包，解压到对应目录

先npm install

然后修改以下内容

php/db.php

```php
mv php/db.sample.php php/db.php
vi php/db.php

$db = new Medoo(
    [
        'database_type' => 'mysql',
        'database_name' => 'your database name',
        'server' => 'localhost',
        'username' => 'your username',
        'password' => 'your password',
        'charset' => 'utf8',
        'port' => 3306,
        'option' => [
            PDO::ATTR_CASE => PDO::CASE_NATURAL
        ]
    ]
);
```

php/common.php

```php
mv php/common.sample.php php/common.php
vi php/common.php

$private_key = "-----BEGIN RSA PRIVATE KEY-----
This is your private key
-----END RSA PRIVATE KEY-----";

$server_key = "This is a string of 16 characters";
$server_iv = "This is a string of 16 characters";
```

js/general.js & src/utils/utils.js

```js
function encryptRSA(str) {
    var rsa = new RSAKey();
    var modulus = "here is your private key";
    var exponent = "10001";
    rsa.setPublic(modulus, exponent);
    return rsa.encrypt(str);
}
```

最后npx webpack就好

## License

该项目使用MIT协议

具体见[LICENSE](https://raw.githubusercontent.com/Leohh123/Todolist/master/LICENSE)文件
