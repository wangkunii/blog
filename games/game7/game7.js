// 游戏逻辑 - 初信栽培系列
class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 30;
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.currentShuffledOptions = [];
        this.playerName = '';
        this.pointsPerQuestion = 100 / 30; // 每题分值（30题100分，约3.33分/题）
        this.courseName = '祷告服侍';
        
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.certificateModal = document.getElementById('certificate-modal');
        
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.certificateBtn = document.getElementById('certificate-btn');
        this.closeCertificateBtn = document.getElementById('close-certificate-btn');
        this.playerNameInput = document.getElementById('player-name');
        
        this.questionText = document.getElementById('question-text');
        this.lessonInfo = document.getElementById('lesson-info');
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
        this.wrongAnswersContainer = document.getElementById('wrong-answers');
        this.certificateSection = document.getElementById('certificate-section');
        
        // 证书元素
        this.certName = document.getElementById('cert-name');
        this.certCourse = document.getElementById('cert-course');
        this.certScore = document.getElementById('cert-score');
        this.certDate = document.getElementById('cert-date');
        
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
        
        if (this.certificateBtn) {
            this.certificateBtn.addEventListener('click', () => this.showCertificate());
        }
        
        if (this.closeCertificateBtn) {
            this.closeCertificateBtn.addEventListener('click', () => this.closeCertificate());
        }
        
        // 回车键开始游戏
        if (this.playerNameInput) {
            this.playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.startGame();
                }
            });
        }
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
        
        // 获取玩家姓名
        const name = this.playerNameInput ? this.playerNameInput.value.trim() : '';
        this.playerName = name || '匿名玩家';
        
        const shuffled = this.shuffleArray(questions);
        this.selectedQuestions = shuffled.slice(0, Math.min(this.totalQuestions, shuffled.length));
        this.totalQuestions = this.selectedQuestions.length;
        this.userAnswers = [];
        this.score = 0;
        this.currentQuestion = 0;
        
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.selectedQuestions[this.currentQuestion];
        
        this.currentShuffledOptions = this.shuffleArray(question.options);
        
        this.questionText.textContent = question.question;
        
        if (this.lessonInfo) {
            this.lessonInfo.textContent = `(${question.lesson})`;
        }
        
        this.currentQuestionEl.textContent = this.currentQuestion + 1;
        this.totalEl.textContent = this.totalQuestions;
        
        const progress = ((this.currentQuestion) / this.totalQuestions) * 100;
        this.progressBar.style.width = progress + '%';
        
        this.optionsContainer.innerHTML = '';
        this.feedback.classList.add('hidden');
        
        this.currentShuffledOptions.forEach((option, index) => {
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
        
        const selectedOptionText = this.currentShuffledOptions[selectedIndex];
        const correctOptionIndex = this.currentShuffledOptions.indexOf(question.options[question.correct]);
        const isCorrect = selectedIndex === correctOptionIndex;
        
        this.userAnswers.push({
            question: question,
            selectedIndex: selectedIndex,
            selectedOption: selectedOptionText,
            isCorrect: isCorrect,
            shuffledOptions: [...this.currentShuffledOptions]
        });
        
        if (isCorrect) {
            buttons[selectedIndex].classList.add('correct');
            // 每答对一题加分
            this.score += this.pointsPerQuestion;
            this.feedback.textContent = `✓ 回答正确！+${this.pointsPerQuestion.toFixed(1)}分`;
            this.feedback.className = 'feedback correct';
        } else {
            buttons[selectedIndex].classList.add('wrong');
            buttons[correctOptionIndex].classList.add('correct');
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
        
        // 分数四舍五入保留整数
        const finalScore = Math.round(this.score);
        this.scoreEl.textContent = finalScore;
        this.totalQuestionsResultEl.textContent = this.totalQuestions;
        const percentage = finalScore;
        this.percentageEl.textContent = percentage;
        
        let encouragement = '';
        if (percentage >= 90) {
            encouragement = '🌟 太棒了！你对初信栽培知识掌握得非常扎实！';
        } else if (percentage >= 80) {
            encouragement = '🎊 优秀！你的表现非常出色！可以领取荣誉证书了！';
        } else if (percentage >= 70) {
            encouragement = '👍 做得好！继续保持对神话语的渴慕！';
        } else if (percentage >= 50) {
            encouragement = '💪 不错的开始，继续学习你会更棒！';
        } else {
            encouragement = '📚 加油！建议多读圣经，加深理解！';
        }
        
        this.encouragementEl.textContent = encouragement;
        
        // 80分以上显示证书按钮
        if (finalScore >= 80 && this.certificateSection) {
            this.certificateSection.classList.remove('hidden');
        } else if (this.certificateSection) {
            this.certificateSection.classList.add('hidden');
        }
        
        this.showWrongAnswers();
        
        // 保存成绩到本地存储
        this.saveToLeaderboard(finalScore);
    }
    
    showCertificate() {
        if (this.certName) this.certName.textContent = this.playerName;
        if (this.certCourse) this.certCourse.textContent = this.courseName;
        if (this.certScore) this.certScore.textContent = Math.round(this.score);
        if (this.certDate) this.certDate.textContent = new Date().toLocaleDateString('zh-CN');
        
        this.certificateModal.classList.remove('hidden');
    }
    
    closeCertificate() {
        this.certificateModal.classList.add('hidden');
    }
    
    saveToLeaderboard(score) {
        const key = `game2Leaderboard_${this.courseName}`;
        const leaderboard = JSON.parse(localStorage.getItem(key) || '[]');
        
        leaderboard.push({
            name: this.playerName,
            score: score,
            date: new Date().toLocaleString('zh-CN')
        });
        
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem(key, JSON.stringify(leaderboard.slice(0, 20)));
    }
    
    showWrongAnswers() {
        const wrongAnswers = this.userAnswers.filter(a => !a.isCorrect);
        this.wrongAnswersContainer.innerHTML = '';
        
        if (wrongAnswers.length === 0) {
            this.wrongAnswersContainer.innerHTML = '<div class="no-wrong">🎉 恭喜！你全部答对了！</div>';
            return;
        }
        
        const title = document.createElement('h3');
        title.className = 'wrong-title';
        title.textContent = `❌ 答错的题目（共 ${wrongAnswers.length} 题）`;
        this.wrongAnswersContainer.appendChild(title);
        
        wrongAnswers.forEach((answer, index) => {
            const card = document.createElement('div');
            card.className = 'wrong-card';
            
            const qNum = document.createElement('span');
            qNum.className = 'question-num';
            qNum.textContent = `第 ${this.userAnswers.indexOf(answer) + 1} 题`;
            
            const lesson = document.createElement('span');
            lesson.className = 'question-lesson';
            lesson.textContent = `(${answer.question.lesson})`;
            
            const qText = document.createElement('div');
            qText.className = 'question-content';
            qText.textContent = answer.question.question;
            
            const optionsList = document.createElement('div');
            optionsList.className = 'options-list';
            
            answer.shuffledOptions.forEach((opt, optIdx) => {
                const optItem = document.createElement('div');
                const isUserSelected = optIdx === answer.selectedIndex;
                const isCorrect = opt === answer.question.options[answer.question.correct];
                
                if (isCorrect) {
                    optItem.className = 'option-item correct';
                    optItem.innerHTML = `${opt} <span class="tag">✓ 正确答案</span>`;
                } else if (isUserSelected) {
                    optItem.className = 'option-item wrong';
                    optItem.innerHTML = `${opt} <span class="tag">✗ 你的选择</span>`;
                } else {
                    optItem.className = 'option-item';
                    optItem.textContent = opt;
                }
                
                optionsList.appendChild(optItem);
            });
            
            const explanation = document.createElement('div');
            explanation.className = 'explanation';
            explanation.innerHTML = `<strong>💡 解析：</strong>${answer.question.explanation}`;
            
            card.appendChild(qNum);
            card.appendChild(lesson);
            card.appendChild(qText);
            card.appendChild(optionsList);
            card.appendChild(explanation);
            
            this.wrongAnswersContainer.appendChild(card);
        });
    }
    
    restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.totalQuestions = 30;
        this.resultScreen.classList.add('hidden');
        this.certificateSection.classList.add('hidden');
        this.certificateModal.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.progressBar.style.width = '0%';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
