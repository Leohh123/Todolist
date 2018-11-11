<?php

include 'common.php';

$lower = verify_user();
if (!$lower) {
    echo "[]";
    exit(0);
}
$res = $db->get("todo_plan", [
    "plan [JSON]", "begin", "end"
], [
    "lower" => $lower
]);
if ($res) {
    echo json_encode($res);
} else {
    $db->insert("todo_plan", [
        "lower" => $lower,
        "plan [JSON]" => [],
        "begin" => "",
        "end" => ""
    ]);
    echo json_encode([
        "plan" => [],
        "begin" => "",
        "end" => ""
    ]);
}

?>