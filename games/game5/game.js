// 游戏逻辑 - 查经法
class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = questions.length;
        
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
        this.totalEl.textContent = this.totalQuestions;
        this.totalQuestionsEl.textContent = this.totalQuestions;
        this.totalQuestionsResultEl.textContent = this.totalQuestions;
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }
    
    startGame() {
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.showQuestion();
    }
    
    showQuestion() {
        const question = questions[this.currentQuestion];
        this.questionText.textContent = question.question;
        this.currentQuestionEl.textContent = this.currentQuestion + 1;
        
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
        const question = questions[this.currentQuestion];
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
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        this.percentageEl.textContent = percentage;
        
        let encouragement = '';
        if (percentage >= 90) {
            encouragement = '🌟 太棒了！你掌握了很好的查经方法！';
        } else if (percentage >= 70) {
            encouragement = '👍 做得好！继续操练读经技巧！';
        } else if (percentage >= 50) {
            encouragement = '💪 不错的开始，多练习会更熟练！';
        } else {
            encouragement = '📚 建议系统学习查经法课程！';
        }
        
        this.encouragementEl.textContent = encouragement;
    }
    
    restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.resultScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.progressBar.style.width = '0%';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 确保questions数组已加载
    if (typeof questions !== 'undefined' && questions.length > 0) {
        new QuizGame();
    } else {
        console.error('题目数据未加载');
        document.getElementById('total-questions').textContent = '加载中...';
    }
});
