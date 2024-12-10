<?php
// Garantir que não há saída antes do header
ob_start();

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendFeedbackEmail($experiencia, $facilidade, $conteudo, $acessibilidade, $sugestoes) {
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rezendecazuza@gmail.com';
        $mail->Password = 'rfvf loyu diyp fkqp';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Destinatários
        $mail->setFrom('rezendecazuza@gmail.com', 'Site Escolar');
        $mail->addAddress('rezendecazuza@gmail.com');

        // Conteúdo
        $mail->isHTML(true);
        $mail->Subject = "Novo Feedback Recebido";
        
        // Corpo do email
        $mailContent = "
        <h2>Novo Feedback Recebido</h2>
        <p><strong>Experiência:</strong> {$experiencia}</p>
        <p><strong>Facilidade de Uso:</strong> {$facilidade}</p>
        <p><strong>Conteúdo:</strong> {$conteudo}</p>
        <p><strong>Acessibilidade:</strong> {$acessibilidade}</p>
        ";
        
        if ($sugestoes) {
            $mailContent .= "<p><strong>Sugestões:</strong> {$sugestoes}</p>";
        }

        $mail->Body = $mailContent;
        $mail->AltBody = strip_tags($mailContent);

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Erro ao enviar email: {$mail->ErrorInfo}");
        return false;
    }
}

// Limpar buffer no final do arquivo
ob_end_clean();
