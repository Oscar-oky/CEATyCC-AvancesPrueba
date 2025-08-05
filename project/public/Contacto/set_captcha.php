<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$_SESSION['captcha_text'] = $data['captcha_text'];
echo 'OK';
?>
echo 'OK';
?>