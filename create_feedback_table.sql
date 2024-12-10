-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS site_escolar;
USE site_escolar;

-- Remover tabela existente se necessário
DROP TABLE IF EXISTS feedback_respostas;

-- Criar tabela de feedback detalhada
CREATE TABLE feedback_respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Campos de avaliação
    experiencia_geral ENUM('excelente', 'bom', 'regular', 'ruim') NOT NULL 
        COMMENT 'Avaliação geral da experiência no site',
    
    facilidade_uso ENUM('muito-facil', 'facil', 'dificil', 'muito-dificil') NOT NULL 
        COMMENT 'Avaliação da facilidade de uso do site',
    
    satisfacao ENUM('1', '2', '3', '4', '5') NOT NULL 
        COMMENT 'Nível de satisfação de 1 a 5',
    
    -- Sugestões adicionais
    sugestoes TEXT COMMENT 'Sugestões de melhoria do usuário',
    
    -- Metadados de rastreamento
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do envio do feedback',
    
    -- Índices para otimização de performance
    INDEX idx_data (data_envio),
    INDEX idx_satisfacao (satisfacao)
) 
COMMENT 'Tabela para armazenar feedbacks detalhados dos usuários do site escolar'
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci;

-- Exemplo de consulta para verificar dados
-- SELECT experiencia_geral, satisfacao, data_envio 
-- FROM feedback_respostas 
-- ORDER BY data_envio DESC 
-- LIMIT 10;
