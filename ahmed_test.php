<?php
var_dump($_FILES);
if (isset($_FILES) && !empty($_FILES)) {
    $answer_attachment_name = $_FILES["file"]["name"];
    $answer_attachment_old_loc = $_FILES["file"]["tmp_name"];
    $answer_attachment_new_loc = $_SERVER['DOCUMENT_ROOT'] . "/cis/attachments/" . rand(0,999999) . $answer_attachment_name;
    move_uploaded_file($answer_attachment_old_loc,$answer_attachment_new_loc);
}
echo ("ahmed");
?>