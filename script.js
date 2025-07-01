// Quiz Data - Perguntas sobre água potável e saneamento
const quizData = [
    {
        question: "Qual é o principal objetivo da ODS 6?",
        options: [
            "Garantir disponibilidade e manejo sustentável da água e saneamento para todos",
            "Reduzir a poluição do ar nas cidades",
            "Promover energia limpa e acessível",
            "Combater as mudanças climáticas"
        ],
        correct: 0,
        explanation: "A ODS 6 tem como objetivo garantir a disponibilidade e o manejo sustentável da água e saneamento para todos até 2030."
    },
    {
        question: "Quais são os principais contaminantes encontrados em água de poços artesianos?",
        options: [
            "Apenas bactérias",
            "Coliformes fecais, metais pesados, pH inadequado e alta turbidez",
            "Somente metais pesados",
            "Apenas problemas de pH"
        ],
        correct: 1,
        explanation: "A água de poços pode conter diversos contaminantes: coliformes fecais, metais pesados, pH inadequado e alta turbidez, todos prejudiciais à saúde."
    },
    {
        question: "Qual material filtrante é mais eficaz para remover metais pesados da água?",
        options: [
            "Areia comum",
            "Carvão ativado",
            "Zeólita",
            "Terra de automassa"
        ],
        correct: 2,
        explanation: "A zeólita é um mineral natural com propriedades excepcionais de adsorção, sendo muito eficaz na remoção de metais pesados e amônia da água."
    },
    {
        question: "Qual EPI é essencial para proteger os olhos durante análises de água?",
        options: [
            "Máscara PFF2",
            "Óculos de proteção",
            "Luvas de borracha",
            "Touca descartável"
        ],
        correct: 1,
        explanation: "Os óculos de proteção são essenciais para evitar respingos de água contaminada ou reagentes químicos nos olhos durante as análises."
    },
    {
        question: "Qual é o tempo máximo recomendado para transporte de amostras de água?",
        options: [
            "2 horas",
            "4 horas",
            "6 horas",
            "8 horas"
        ],
        correct: 2,
        explanation: "As amostras de água devem ser transportadas em caixas térmicas com gelo e analisadas em até 6 horas para garantir a integridade dos resultados."
    },
    {
        question: "Qual processo químico o carvão ativado utiliza para purificar a água?",
        options: [
            "Filtração física",
            "Troca iônica",
            "Adsorção",
            "Precipitação"
        ],
        correct: 2,
        explanation: "O carvão ativado funciona por adsorção, processo onde as impurezas orgânicas aderem à sua superfície porosa, removendo-as da água."
    },
    {
        question: "Quantos galões de 20L são necessários para montar o filtro artesanal?",
        options: [
            "1 galão",
            "2 galões",
            "3 galões",
            "4 galões"
        ],
        correct: 1,
        explanation: "O filtro artesanal é construído com 2 galões de 20L, sendo um para receber a água bruta e outro para coletar a água filtrada."
    },
    {
        question: "Qual é a função da terra de automassa no sistema de filtragem?",
        options: [
            "Remover metais pesados",
            "Filtrar bactérias",
            "Servir como barreira natural final",
            "Melhorar o sabor da água"
        ],
        correct: 2,
        explanation: "A terra de automassa atua como uma barreira natural final no sistema de filtragem, complementando a ação dos outros materiais filtrantes."
    },
    {
        question: "Segundo a ANVISA, qual parâmetro é fundamental para avaliar a qualidade microbiológica da água?",
        options: [
            "Turbidez",
            "pH",
            "Coliformes fecais",
            "Condutividade"
        ],
        correct: 2,
        explanation: "Os coliformes fecais são indicadores fundamentais da qualidade microbiológica da água, indicando possível contaminação por material fecal."
    },
    {
        question: "Qual é a principal vantagem do sistema de filtragem artesanal apresentado?",
        options: [
            "Alto custo de manutenção",
            "Baixo custo e alta eficiência para comunidades rurais",
            "Necessita de energia elétrica",
            "Funciona apenas em laboratórios"
        ],
        correct: 1,
        explanation: "O sistema de filtragem artesanal é uma solução de baixo custo e alta eficiência, ideal para comunidades rurais que não têm acesso a sistemas convencionais de tratamento."
    }
];

// Quiz State for Inline Version
let inlineCurrentQuestion = 0;
let inlineScore = 0;
let inlineSelectedAnswer = null;
let inlineQuizCompleted = false;
let inlineUserAnswers = [];

// Inline Quiz Functions
function scrollToInlineQuiz() {
    document.getElementById('quiz').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    setTimeout(() => {
        startInlineQuiz();
    }, 1000);
}

function startInlineQuiz() {
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-result-inline').style.display = 'none';
    resetInlineQuiz();
    showInlineQuestion();
}

function resetInlineQuiz() {
    inlineCurrentQuestion = 0;
    inlineScore = 0;
    inlineSelectedAnswer = null;
    inlineQuizCompleted = false;
    inlineUserAnswers = [];
    updateInlineProgress();
}

function showInlineQuestion() {
    if (inlineCurrentQuestion >= quizData.length) {
        showInlineResult();
        return;
    }

    const question = quizData[inlineCurrentQuestion];
    inlineSelectedAnswer = null;
    
    // Update question
    document.getElementById('quiz-question-inline').innerHTML = `
        <h4>Pergunta ${inlineCurrentQuestion + 1}</h4>
        <p>${question.question}</p>
    `;
    
    // Update options
    const optionsElement = document.getElementById('quiz-options-inline');
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        optionElement.addEventListener('click', () => selectInlineAnswer(index));
        optionsElement.appendChild(optionElement);
    });
    
    // Update progress and counter
    updateInlineProgress();
    document.getElementById('quiz-counter-inline').textContent = `${inlineCurrentQuestion + 1}/${quizData.length}`;
    
    // Reset next button
    const nextButton = document.getElementById('quiz-next-inline');
    nextButton.disabled = true;
    nextButton.textContent = 'Próxima Pergunta';
}

function selectInlineAnswer(answerIndex) {
    if (inlineSelectedAnswer !== null) return; // Prevent multiple selections
    
    inlineSelectedAnswer = answerIndex;
    const question = quizData[inlineCurrentQuestion];
    const options = document.querySelectorAll('#quiz-options-inline .quiz-option');
    
    // Store user answer
    inlineUserAnswers[inlineCurrentQuestion] = answerIndex;
    
    // Show correct/incorrect answers
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none'; // Disable further clicks
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === answerIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
    
    // Update score
    if (answerIndex === question.correct) {
        inlineScore++;
    }
    
    // Show explanation
    const explanationElement = document.createElement('div');
    explanationElement.className = 'quiz-explanation';
    explanationElement.innerHTML = `
        <strong style="color: #00bcd4;">Explicação:</strong><br>
        ${question.explanation}
    `;
    document.getElementById('quiz-options-inline').appendChild(explanationElement);
    
    // Enable next button
    const nextButton = document.getElementById('quiz-next-inline');
    nextButton.disabled = false;
    
    // Change button text for last question
    if (inlineCurrentQuestion === quizData.length - 1) {
        nextButton.textContent = 'Ver Resultado';
    }
}

function nextInlineQuestion() {
    inlineCurrentQuestion++;
    showInlineQuestion();
}

function updateInlineProgress() {
    const progress = (inlineCurrentQuestion / quizData.length) * 100;
    document.getElementById('quiz-progress-inline').style.width = `${progress}%`;
}

function showInlineResult() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-result-inline').style.display = 'block';
    
    const percentage = Math.round((inlineScore / quizData.length) * 100);
    const correctAnswers = inlineScore;
    const incorrectAnswers = quizData.length - inlineScore;
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excelente! Você domina muito bem o assunto sobre água potável e saneamento!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Muito bom! Você tem um bom conhecimento sobre o tema!';
        emoji = '🎉';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Continue estudando para aprimorar seus conhecimentos!';
        emoji = '👍';
    } else {
        message = 'Continue estudando! A cartilha tem todas as informações que você precisa!';
        emoji = '📚';
    }
    
    document.getElementById('quiz-result-inline').innerHTML = `
        <div class="quiz-result">
            <h3>${emoji} Quiz Concluído!</h3>
            <div class="quiz-score">${percentage}%</div>
            <div class="quiz-details" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="text-align: center; padding: 1rem; background: rgba(76, 175, 80, 0.2); border-radius: 10px; border: 2px solid #4caf50;">
                        <div style="font-size: 2rem; font-weight: bold; color: #4caf50;">${correctAnswers}</div>
                        <div style="color: #e0e0e0;">Acertos</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: rgba(244, 67, 54, 0.2); border-radius: 10px; border: 2px solid #f44336;">
                        <div style="font-size: 2rem; font-weight: bold; color: #f44336;">${incorrectAnswers}</div>
                        <div style="color: #e0e0e0;">Erros</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: rgba(0, 188, 212, 0.2); border-radius: 10px; border: 2px solid #00bcd4;">
                        <div style="font-size: 2rem; font-weight: bold; color: #00bcd4;">${quizData.length}</div>
                        <div style="color: #e0e0e0;">Total</div>
                    </div>
                </div>
            </div>
            <div class="quiz-message">${message}</div>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="quiz-restart" onclick="restartInlineQuiz()">
                    <i class="fas fa-redo"></i> Refazer Quiz
                </button>
                <button class="quiz-restart" onclick="backToQuizIntro()">
                    <i class="fas fa-home"></i> Voltar ao Início
                </button>
            </div>
        </div>
    `;
}

function restartInlineQuiz() {
    resetInlineQuiz();
    showInlineQuestion();
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-result-inline').style.display = 'none';
}

function backToQuizIntro() {
    document.getElementById('quiz-intro').style.display = 'block';
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-result-inline').style.display = 'none';
    resetInlineQuiz();
}

// DOM Elements
const modal = document.getElementById('quiz-modal');
const questionElement = document.getElementById('quiz-question');
const optionsElement = document.getElementById('quiz-options');
const nextButton = document.getElementById('quiz-next');
const progressFill = document.getElementById('quiz-progress');
const counterElement = document.getElementById('quiz-counter');
const resultElement = document.getElementById('quiz-result');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate cards on hover
    document.querySelectorAll('.info-card, .problema-card, .quimica-card, .epi-item, .material-item, .resultado-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Quiz Functions
function startQuiz() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetQuiz();
    showQuestion();
}

function closeQuiz() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetQuiz();
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    quizCompleted = false;
    userAnswers = [];
    resultElement.style.display = 'none';
    document.querySelector('.quiz-body').style.display = 'block';
    updateProgress();
}

function showQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }

    const question = quizData[currentQuestion];
    selectedAnswer = null;
    
    // Update question
    questionElement.innerHTML = `
        <h4>Pergunta ${currentQuestion + 1}</h4>
        <p>${question.question}</p>
    `;
    
    // Update options
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(optionElement);
    });
    
    // Update progress and counter
    updateProgress();
    counterElement.textContent = `${currentQuestion + 1}/${quizData.length}`;
    
    // Reset next button
    nextButton.disabled = true;
    nextButton.textContent = 'Próxima Pergunta';
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = answerIndex;
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Store user answer
    userAnswers[currentQuestion] = answerIndex;
    
    // Show correct/incorrect answers
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none'; // Disable further clicks
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === answerIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
    
    // Update score
    if (answerIndex === question.correct) {
        score++;
    }
    
    // Show explanation
    const explanationElement = document.createElement('div');
    explanationElement.className = 'quiz-explanation';
    explanationElement.style.cssText = `
        background: rgba(0, 188, 212, 0.1);
        border: 2px solid rgba(0, 188, 212, 0.3);
        border-radius: 10px;
        padding: 1.5rem;
        margin-top: 1rem;
        color: #e0e0e0;
        line-height: 1.6;
    `;
    explanationElement.innerHTML = `
        <strong style="color: #00bcd4;">Explicação:</strong><br>
        ${question.explanation}
    `;
    optionsElement.appendChild(explanationElement);
    
    // Enable next button
    nextButton.disabled = false;
    
    // Change button text for last question
    if (currentQuestion === quizData.length - 1) {
        nextButton.textContent = 'Ver Resultado';
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function updateProgress() {
    const progress = (currentQuestion / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function showResult() {
    document.querySelector('.quiz-body').style.display = 'none';
    resultElement.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    const correctAnswers = score;
    const incorrectAnswers = quizData.length - score;
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excelente! Você domina muito bem o assunto sobre água potável e saneamento!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Muito bom! Você tem um bom conhecimento sobre o tema!';
        emoji = '🎉';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Continue estudando para aprimorar seus conhecimentos!';
        emoji = '👍';
    } else {
        message = 'Continue estudando! A cartilha tem todas as informações que você precisa!';
        emoji = '📚';
    }
    
    resultElement.innerHTML = `
        <div class="quiz-result">
            <h3>${emoji} Quiz Concluído!</h3>
            <div class="quiz-score">${percentage}%</div>
            <div class="quiz-details" style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="text-align: center; padding: 1rem; background: rgba(76, 175, 80, 0.2); border-radius: 10px; border: 2px solid #4caf50;">
                        <div style="font-size: 2rem; font-weight: bold; color: #4caf50;">${correctAnswers}</div>
                        <div style="color: #e0e0e0;">Acertos</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: rgba(244, 67, 54, 0.2); border-radius: 10px; border: 2px solid #f44336;">
                        <div style="font-size: 2rem; font-weight: bold; color: #f44336;">${incorrectAnswers}</div>
                        <div style="color: #e0e0e0;">Erros</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: rgba(0, 188, 212, 0.2); border-radius: 10px; border: 2px solid #00bcd4;">
                        <div style="font-size: 2rem; font-weight: bold; color: #00bcd4;">${quizData.length}</div>
                        <div style="color: #e0e0e0;">Total</div>
                    </div>
                </div>
            </div>
            <div class="quiz-message">${message}</div>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="quiz-restart" onclick="restartQuiz()">
                    <i class="fas fa-redo"></i> Refazer Quiz
                </button>
                <button class="quiz-restart" onclick="closeQuiz()">
                    <i class="fas fa-times"></i> Fechar
                </button>
            </div>
        </div>
    `;
}

function restartQuiz() {
    resetQuiz();
    showQuestion();
}

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeQuiz();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeQuiz();
        } else if (e.key >= '1' && e.key <= '4' && selectedAnswer === null) {
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < quizData[currentQuestion].options.length) {
                selectAnswer(optionIndex);
            }
        } else if (e.key === 'Enter' && !nextButton.disabled) {
            nextQuestion();
        }
    }
});

// Add floating action button for quiz
function createFloatingQuizButton() {
    const floatingBtn = document.createElement('div');
    floatingBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, #00bcd4, #0097a7);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        color: white;
        font-size: 1.5rem;
    `;
    floatingBtn.innerHTML = '<i class="fas fa-question"></i>';
    floatingBtn.title = 'Iniciar Quiz';
    
    floatingBtn.addEventListener('click', startQuiz);
    floatingBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(0, 188, 212, 0.6)';
    });
    floatingBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0, 188, 212, 0.4)';
    });
    
    document.body.appendChild(floatingBtn);
}

// Initialize floating button when page loads
document.addEventListener('DOMContentLoaded', createFloatingQuizButton);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1000);
});

// Add scroll-to-top functionality
function createScrollToTopButton() {
    const scrollBtn = document.createElement('div');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: rgba(0, 188, 212, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s ease;
        color: white;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
    `;
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.title = 'Voltar ao topo';
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);