<?php
// Habilitar exibição de erros para depuração
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Carregar o Composer autoload
require 'vendor/autoload.php';

// Importar classes do PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Configurações de conexão
$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'site_escolar';

// Conectar ao banco de dados
$conexao = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conexao->connect_error) {
    die(json_encode([
        'status' => 'error', 
        'message' => 'Erro na conexão com o banco de dados: ' . $conexao->connect_error
    ]));
}

// Log de depuração - dados recebidos
file_put_contents('debug_feedback.log', 
    date('[Y-m-d H:i:s] ') . 
    "Dados recebidos: " . 
    print_r($_POST, true) . "\n", 
    FILE_APPEND
);

// Capturar dados do formulário
$experiencia = $_POST['experiencia'] ?? null;
$facilidade = $_POST['facilidade'] ?? null;
$satisfacao = $_POST['satisfacao'] ?? null;
$sugestoes = $_POST['sugestoes'] ?? null;

// Validar dados obrigatórios
if (!$experiencia || !$facilidade || !$satisfacao) {
    file_put_contents('debug_feedback.log', 
        date('[Y-m-d H:i:s] ') . 
        "Erro: Campos obrigatórios não preenchidos\n", 
        FILE_APPEND
    );
    $conexao->close();
    die(json_encode([
        'status' => 'error', 
        'message' => 'Preencha todos os campos obrigatórios'
    ]));
}

// Preparar consulta SQL
$sql = "INSERT INTO feedback_respostas (
    experiencia_geral, 
    facilidade_uso, 
    satisfacao, 
    sugestoes
) VALUES (?, ?, ?, ?)";

// Preparar e executar statement
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    file_put_contents('debug_feedback.log', 
        date('[Y-m-d H:i:s] ') . 
        "Erro na preparação do statement: " . $conexao->error . "\n", 
        FILE_APPEND
    );
    $conexao->close();
    die(json_encode([
        'status' => 'error', 
        'message' => 'Erro na preparação do banco de dados'
    ]));
}

$stmt->bind_param(
    'ssss', 
    $experiencia, 
    $facilidade, 
    $satisfacao, 
    $sugestoes
);

// Executar e verificar resultado
if ($stmt->execute()) {
    // Enviar email com o feedback
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rezendecazuza@gmail.com';
        $mail->Password   = 'rfvf loyu diyp fkqp'; // Senha de aplicativo
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Configurar email
        $mail->setFrom('rezendecazuza@gmail.com', 'E-mail Projeto - Feedback');
        $mail->addAddress('rezendecazuza@gmail.com');

        // Conteúdo do email
        $mail->isHTML(true);
        $mail->Subject = 'Novo Feedback do E-mail Projeto';
        $mail->Body    = "
            <html>
            <body>
                <h2>Novo Feedback do E-mail Projeto</h2>
                <table border='1' cellpadding='10'>
                    <tr>
                        <th>Experiência Geral</th>
                        <td>$experiencia</td>
                    </tr>
                    <tr>
                        <th>Facilidade de Uso</th>
                        <td>$facilidade</td>
                    </tr>
                    <tr>
                        <th>Nível de Satisfação</th>
                        <td>$satisfacao</td>
                    </tr>
                    <tr>
                        <th>Sugestões</th>
                        <td>$sugestoes</td>
                    </tr>
                </table>
            </body>
            </html>
        ";

        $mail->send();
        
        file_put_contents('debug_feedback.log', 
            date('[Y-m-d H:i:s] ') . 
            "Email de feedback enviado com sucesso\n", 
            FILE_APPEND
        );
    } catch (Exception $e) {
        file_put_contents('debug_feedback.log', 
            date('[Y-m-d H:i:s] ') . 
            "Erro ao enviar email: " . $mail->ErrorInfo . "\n", 
            FILE_APPEND
        );
    }

    $stmt->close();
    $conexao->close();
    echo json_encode([
        'status' => 'success', 
        'message' => 'Feedback enviado com sucesso! Obrigado por sua contribuição.'
    ]);
} else {
    file_put_contents('debug_feedback.log', 
        date('[Y-m-d H:i:s] ') . 
        "Erro ao salvar feedback: " . $stmt->error . "\n", 
        FILE_APPEND
    );
    $stmt->close();
    $conexao->close();
    echo json_encode([
        'status' => 'error', 
        'message' => 'Erro ao salvar feedback. Tente novamente.'
    ]);
}
?>
