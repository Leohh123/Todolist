<?php

include 'Medoo.php';
use Medoo\Medoo;

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

?>