<?php

include 'common.php';

$lower = verify_user();
if (!$lower) exit(0);
$db->delete("todo_plan", [
    "lower" => $lower
]);
$db->insert("todo_plan", [
    "lower" => $lower,
    "plan [JSON]" => $_POST['plan'],
    "begin" => $_POST['begin'],
    "end" => $_POST['end']
]);

?>