// Dados das áreas de estudo
const studyAreas = {
    filosofia: {
        title: 'Filosofia',
        icon: 'fas fa-brain',
        color: '#4CAF50',
        topics: [
            {
                title: 'O que é Filosofia?',
                content: 'A Filosofia é o estudo dos problemas fundamentais relacionados à existência, conhecimento, valores, razão, mente e linguagem.',
                questions: [
                    {
                        question: 'Qual é o principal objetivo da Filosofia?',
                        options: [
                            'Ganhar dinheiro',
                            'Buscar a sabedoria e compreensão fundamental',
                            'Fazer experimentos científicos',
                            'Criar obras de arte'
                        ],
                        correct: 1
                    },
                    {
                        question: 'Quem é considerado o pai da Filosofia ocidental?',
                        options: [
                            'Platão',
                            'Aristóteles',
                            'Sócrates',
                            'Tales de Mileto'
                        ],
                        correct: 2
                    }
                ]
            },
            {
                title: 'Ética e Moral',
                content: 'A Ética é o estudo filosófico dos princípios que guiam o comportamento humano, enquanto a Moral são as regras e costumes de uma sociedade.',
                questions: [
                    {
                        question: 'Qual a diferença principal entre Ética e Moral?',
                        options: [
                            'Não há diferença',
                            'A Ética é teórica, a Moral é prática',
                            'A Moral é universal, a Ética é individual',
                            'A Ética é religiosa, a Moral é secular'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    },
    historia: {
        title: 'História',
        icon: 'fas fa-landmark',
        color: '#2196F3',
        topics: [
            {
                title: 'Brasil Colônia',
                content: 'O período colonial brasileiro começou em 1500 com a chegada dos portugueses e terminou em 1822 com a Independência.',
                questions: [
                    {
                        question: 'Quando começou o período colonial no Brasil?',
                        options: [
                            '1500',
                            '1822',
                            '1889',
                            '1494'
                        ],
                        correct: 0
                    }
                ]
            },
            {
                title: 'Revolução Industrial',
                content: 'A Revolução Industrial foi um conjunto de mudanças que aconteceram na Europa nos séculos XVIII e XIX. A principal característica dessa revolução foi a substituição do trabalho artesanal pelo assalariado e com o uso das máquinas.',
                questions: [
                    {
                        question: 'Qual foi a principal mudança trazida pela Revolução Industrial?',
                        options: [
                            'O fim da escravidão',
                            'A substituição do trabalho artesanal pelo uso de máquinas',
                            'O início da democracia',
                            'A descoberta da América'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    },
    geografia: {
        title: 'Geografia',
        icon: 'fas fa-globe-americas',
        color: '#FF9800',
        topics: [
            {
                title: 'Clima e Tempo',
                content: 'Clima é o conjunto de condições atmosféricas que caracterizam uma região, analisado por um longo período. Tempo é o estado momentâneo da atmosfera em um determinado local.',
                questions: [
                    {
                        question: 'Qual a diferença entre clima e tempo?',
                        options: [
                            'São a mesma coisa',
                            'Clima é momentâneo, tempo é prolongado',
                            'Clima é prolongado, tempo é momentâneo',
                            'Não há relação entre eles'
                        ],
                        correct: 2
                    }
                ]
            }
        ]
    },
    sociologia: {
        title: 'Sociologia',
        icon: 'fas fa-users',
        color: '#9C27B0',
        topics: [
            {
                title: 'O que é Sociologia?',
                content: 'A Sociologia é a ciência que estuda a sociedade, os padrões de relações sociais, interação social e cultura da vida cotidiana.',
                questions: [
                    {
                        question: 'Qual é o objeto de estudo da Sociologia?',
                        options: [
                            'O indivíduo isolado',
                            'A sociedade e as relações sociais',
                            'A natureza',
                            'A economia'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    }
};

// Função para criar o HTML das áreas de estudo
function createStudyAreas() {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    Object.entries(studyAreas).forEach(([key, area]) => {
        const section = document.createElement('section');
        section.className = 'study-area';
        section.id = key;

        const header = document.createElement('div');
        header.className = 'study-area-header';
        header.style.backgroundColor = area.color;
        header.innerHTML = `
            <i class="${area.icon}" aria-hidden="true"></i>
            <h2>${area.title}</h2>
        `;

        const content = document.createElement('div');
        content.className = 'study-area-content';

        area.topics.forEach((topic, index) => {
            const topicElement = document.createElement('div');
            topicElement.className = 'topic-item';
            topicElement.setAttribute('tabindex', '0');
            topicElement.innerHTML = `
                <i class="fas fa-book" aria-hidden="true"></i>
                <span>${topic.title}</span>
            `;

            topicElement.addEventListener('click', () => showTopicModal(area, topic));
            topicElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    showTopicModal(area, topic);
                }
            });

            content.appendChild(topicElement);
        });

        section.appendChild(header);
        section.appendChild(content);
        mainContent.appendChild(section);
    });
}

// Função para mostrar o modal do tópico
function showTopicModal(area, topic) {
    const modal = document.createElement('div');
    modal.className = 'study-modal';
    modal.innerHTML = `
        <div class="study-modal-content">
            <div class="study-modal-header" style="background-color: ${studyAreas[area].color};">
                <h2>${topic.title}</h2>
                <button class="study-modal-close">&times;</button>
            </div>
            <div class="study-modal-body">
                <p class="study-topic-description">${topic.content}</p>
                
                ${topic.questions ? `
                    <div class="study-quiz-section">
                        <h3>Teste seu Conhecimento</h3>
                        ${topic.questions.map((q, qIndex) => `
                            <div class="study-quiz-question">
                                <p class="question-text">${q.question}</p>
                                <div class="question-options">
                                    ${q.options.map((option, oIndex) => `
                                        <button 
                                            class="option-btn" 
                                            data-correct="${oIndex === q.correct}"
                                            onclick="this.classList.add(this.dataset.correct === 'true' ? 'correct-answer' : 'wrong-answer')"
                                        >
                                            ${option}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // Close modal functionality
    const closeBtn = modal.querySelector('.study-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);

    // Adicionar estilos diretamente ao documento
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Estilos para a seção de quiz */
        .study-quiz-section {
            background-color: #f9f9f9 !important;
            border-radius: 8px !important;
            padding: 15px !important;
            margin-top: 20px !important;
        }

        /* Estilo para cada questão do quiz */
        .study-quiz-question {
            margin-bottom: 50px !important;  
            background-color: white !important;
            border-radius: 20px !important;  
            padding: 40px !important;  
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;  
            transition: all 0.3s ease !important;
            width: 100% !important;  
            max-width: 900px !important;  
            margin-left: auto !important;  
            margin-right: auto !important;
        }

        /* Texto da pergunta */
        .question-text {
            font-size: 1.3em !important;
            font-weight: bold !important;
            margin-bottom: 20px !important;
            color: #333 !important;
            line-height: 1.4 !important;
        }

        /* Container das opções */
        .question-options {
            display: flex !important;
            flex-direction: column !important;
            gap: 60px !important;  
            width: 100% !important;
            align-items: stretch !important;
        }

        /* Estilo dos botões de opção */
        .option-btn {
            padding: 50px 55px !important;  
            border: 5px solid #e0e0e0 !important;
            border-radius: 25px !important;  
            background-color: white !important;
            text-align: left !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            width: 100% !important;
            min-height: 120px !important;  
            box-sizing: border-box !important;
            font-size: 1.5em !important;  
            line-height: 1.8 !important;
            position: relative !important;
            outline: none !important;
            letter-spacing: 0.7px !important;
        }

        /* Efeito de hover nos botões */
        .option-btn:hover {
            background-color: #f5f5f5 !important;
            transform: scale(1.02) !important;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        }

        /* Estilo para resposta correta */
        .option-btn.correct-answer {
            background-color: #4CAF50 !important;
            color: white !important;
            border-color: #45a049 !important;
        }

        /* Estilo para resposta incorreta */
        .option-btn.wrong-answer {
            background-color: #f44336 !important;
            color: white !important;
            border-color: #d32f2f !important;
        }
    `;
    
    // Adicionar estilos ao body para garantir que sejam aplicados
    document.body.appendChild(styleElement);
}

// Inicializar as áreas de estudo quando o documento carregar
document.addEventListener('DOMContentLoaded', createStudyAreas);
