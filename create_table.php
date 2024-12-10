<?php
// Configurações do banco de dados
$host = 'localhost';
$dbname = 'site_escolar';
$username = 'root';
$password = '';

try {
    // Conexão com o banco de dados
    $pdo = new PDO( "mysql:host=$host;dbname=$dbname", $username, $password );
    $pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

    // SQL para criar a tabela
    $sql = "CREATE TABLE IF NOT EXISTS feedback_respostas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        experiencia VARCHAR(50) NOT NULL,
        facilidade VARCHAR(50) NOT NULL,
        conteudo VARCHAR(50) NOT NULL,
        acessibilidade VARCHAR(50) NOT NULL,
        sugestoes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    // Executar a query
    $pdo->exec( $sql );
    echo 'Tabela feedback_respostas criada com sucesso!';

} catch( PDOException $e ) {
    echo 'Erro ao criar tabela: ' . $e->getMessage();
}
?>
