<?php

include 'common.php';

$lower = verify_user();
$res = $db->select("todo_days", [
    "date", "items [JSON]", "note"
], [
    "lower" => $lower,
    "ORDER" => ["date" => "DESC"]
]);
echo json_encode($res);

?>