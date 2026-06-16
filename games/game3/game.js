// 游戏逻辑 - 信徒培训课程
class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 30;
        this.selectedQuestions = [];
        
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options');
        this.feedback = document.getElementById('feedback');
        
        this.currentQuestionEl = document.getElementById('current-question');
        this.totalEl = document.getElementById('total');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.progressBar = document.getElementById('progress');
        
        this.scoreEl = document.getElementById('score');
        this.totalQuestionsResultEl = document.getElementById('total-questions-result');
        this.percentageEl = document.getElementById('percentage');
        this.encouragementEl = document.getElementById('encouragement');
        
        this.init();
    }
    
    init() {
        if (typeof questions === 'undefined' || questions.length === 0) {
            console.error('题目数据未加载');
            this.totalQuestionsEl.textContent = '加载中...';
            return;
        }
        
        this.totalEl.textContent = this.totalQuestions;
        this.totalQuestionsEl.textContent = this.totalQuestions;
        this.totalQuestionsResultEl.textContent = this.totalQuestions;
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    startGame() {
        if (typeof questions === 'undefined' || questions.length === 0) {
            alert('题目数据加载失败，请刷新页面重试');
            return;
        }
        
        const shuffled = this.shuffleArray(questions);
        this.selectedQuestions = shuffled.slice(0, Math.min(30, shuffled.length));
        this.totalQuestions = this.selectedQuestions.length;
        
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.selectedQuestions[this.currentQuestion];
        this.questionText.textContent = question.question;
        this.currentQuestionEl.textContent = this.currentQuestion + 1;
        this.totalEl.textContent = this.totalQuestions;
        
        const progress = ((this.currentQuestion) / this.totalQuestions) * 100;
        this.progressBar.style.width = progress + '%';
        
        this.optionsContainer.innerHTML = '';
        this.feedback.classList.add('hidden');
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(btn);
        });
    }
    
    selectOption(selectedIndex) {
        const question = this.selectedQuestions[this.currentQuestion];
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        
        buttons.forEach(btn => btn.disabled = true);
        
        if (selectedIndex === question.correct) {
            buttons[selectedIndex].classList.add('correct');
            this.score++;
            this.feedback.textContent = '✓ 回答正确！';
            this.feedback.className = 'feedback correct';
        } else {
            buttons[selectedIndex].classList.add('wrong');
            buttons[question.correct].classList.add('correct');
            this.feedback.textContent = '✗ 回答错误';
            this.feedback.className = 'feedback wrong';
        }
        
        this.feedback.classList.remove('hidden');
        
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.totalQuestions) {
                this.showQuestion();
            } else {
                this.showResults();
            }
        }, 1500);
    }
    
    showResults() {
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        
        this.progressBar.style.width = '100%';
        
        this.scoreEl.textContent = this.score;
        this.totalQuestionsResultEl.textContent = this.totalQuestions;
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        this.percentageEl.textContent = percentage;
        
        let encouragement = '';
        if (percentage >= 90) {
            encouragement = '🌟 太棒了！你的信徒培训知识非常扎实！';
        } else if (percentage >= 70) {
            encouragement = '👍 做得好！继续保持学习！';
        } else if (percentage >= 50) {
            encouragement = '💪 不错的开始，继续努力！';
        } else {
            encouragement = '📚 加油！建议参加信徒培训课程！';
        }
        
        this.encouragementEl.textContent = encouragement;
    }
    
    restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.totalQuestions = 30;
        this.resultScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.progressBar.style.width = '0%';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});