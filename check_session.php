<?php
session_start();
header('Content-Type: application/json');

echo json_encode([
    'loggedIn' => !empty($_SESSION['usuario_id']),
    'userName' => $_SESSION['usuario_nome'] ?? null
]);
