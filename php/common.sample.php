<?php

include 'db.php';

$private_key = "-----BEGIN RSA PRIVATE KEY-----
This is your private key
-----END RSA PRIVATE KEY-----";

$server_key = "This is a string of 16 characters";
$server_iv = "This is a string of 16 characters";

function decrypt_rsa($str)
{
    global $private_key;
    $hex_encrypt_data = trim($str);
    $encrypt_data = pack("H*", $hex_encrypt_data);
    openssl_private_decrypt($encrypt_data, $decrypt_data, $private_key);
    return $decrypt_data;
}

function encrypt_aes($data, $key, $iv)
{
    // The following is the old code
    // $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);
    // return base64_encode($encrypted);
    $padded = $data;
    if (strlen($padded) % 16) {
        $padded = str_pad($padded, strlen($padded) + 16 - strlen($padded) % 16, "\0");
    }
    $encrypted = openssl_encrypt($padded, "AES-128-CBC", $key, OPENSSL_NO_PADDING, $iv);
    return base64_encode($encrypted);
}

function decrypt_aes($data, $key, $iv)
{
    // The following is the old code
    // $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, base64_decode($data), MCRYPT_MODE_CBC, $iv);
    // return rtrim($decrypted, "\0");
    $decrypted = openssl_decrypt(base64_decode($data), "AES-128-CBC", $key, OPENSSL_NO_PADDING, $iv);
    return rtrim(rtrim($decrypted, chr(0)), chr(7));
}

function check_user($name, $pass)
{
    global $db;
    $lower = strtolower($name);
    $hash = $db->get("user", "pass", ["lower" => $lower]);
    if ($hash) {
        return password_verify($pass, $hash);
    } else {
        return false;
    }
}

function gen_token($lower, $pass)
{
    global $server_key, $server_iv;
    $token = $lower . " " . $pass . " " . time();
    return encrypt_aes($token, $server_key, $server_iv);
}

function check_token($token, $new_token = true)
{
    global $db, $server_key, $server_iv;
    $token = decrypt_aes($token, $server_key, $server_iv);
    $args = explode(" ", $token);
    if (count($args) != 3) {
        return null;
    }
    if (!preg_match("/^[0-9]+$/", $args[2])) {
        return null;
    }
    $stamp = intval($args[2]);
    $present = time();
    if ($present - $stamp > 86400) {
        return null;
    }
    if (!check_user($args[0], $args[1])) {
        return null;
    }
    if ($new_token) {
        return gen_token($args[0], $args[1]);
    } else {
        return true;
    }
}

function split_token($token) // you should make sure the token is valid
{
    global $server_key, $server_iv;
    $token = decrypt_aes($token, $server_key, $server_iv);
    $args = explode(" ", $token);
    return [
        "lower" => $args[0],
        "pass" => $args[1]
    ];
}

function verify_user()
{
    global $_COOKIE;
    $token = decrypt_rsa($_COOKIE['token']);
    if (check_token($token, false)) {
        $user = split_token($token);
        return $user['lower'];
    }
    return null;
}

function whoami()
{
    global $db;
    return $db->get("user", "name", ["lower" => verify_user()]);
}

?>