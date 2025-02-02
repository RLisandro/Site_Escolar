-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS site_escolar;

-- Usar o banco de dados
USE site_escolar;

-- Criar tabela de feedback
CREATE TABLE IF NOT EXISTS feedback_respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experiencia VARCHAR(50),
    facilidade VARCHAR(50),
    conteudo VARCHAR(50),
    acessibilidade VARCHAR(50),
    sugestoes TEXT,
    created_at DATETIME
);
