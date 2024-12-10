<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Iniciando teste de e-mail...<br>";

// Verificar se o autoloader existe
if (file_exists('vendor/autoload.php')) {
    echo "Arquivo vendor/autoload.php encontrado.<br>";
    require 'vendor/autoload.php';
} else {
    die("Erro: vendor/autoload.php não encontrado. Execute 'composer install'<br>");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    echo "Criando instância do PHPMailer...<br>";
    $mail = new PHPMailer(true);

    echo "Configurando servidor SMTP...<br>";
    $mail->SMTPDebug = 2;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'rezendecazuza@gmail.com';
    $mail->Password = 'rfvf loyu diyp fkqp';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    echo "Configurando remetente e destinatário...<br>";
    $mail->setFrom('rezendecazuza@gmail.com', 'Teste');
    $mail->addAddress('rezendecazuza@gmail.com');

    echo "Configurando conteúdo do email...<br>";
    $mail->isHTML(true);
    $mail->Subject = 'Teste de Email';
    $mail->Body    = 'Este é um email de teste para verificar se o PHPMailer está funcionando.';

    echo "Tentando enviar o email...<br>";
    $mail->send();
    echo "Email enviado com sucesso!<br>";

} catch (Exception $e) {
    echo "Erro ao enviar email: " . $mail->ErrorInfo . "<br>";
    echo "Detalhes da exceção: " . $e->getMessage() . "<br>";
    
    // Verificar configurações do PHP
    echo "<br>Verificando configurações do PHP:<br>";
    echo "PHP Version: " . phpversion() . "<br>";
    echo "OpenSSL: " . (extension_loaded('openssl') ? 'Habilitado' : 'Desabilitado') . "<br>";
    echo "SMTP: " . (getenv('SMTP') ? getenv('SMTP') : 'Não configurado') . "<br>";
}
?>
