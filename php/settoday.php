<?php

include 'common.php';

$lower = verify_user();
if (!$lower) exit(0);
$date = $_POST['date'];
$items = $_POST['items'];
$note = $_POST['note'];
$db->delete("todo_days", [
    "AND" => [
        "lower" => $lower,
        "date" => $date
    ]
]);
$db->insert("todo_days", [
    "lower" => $lower,
    "date" => $date,
    "items [JSON]" => $items,
    "note" => $note
]);

?>