// 游戏状态管理
const gameState = {
    currentQuestion: 0,
    score: 0,
    questions: [],
    answers: [],
    gameQuestions: [],
    isAnswered: false,
    playerName: '', // 玩家姓名
    gameMode: 'single', // 游戏模式：single 或 multi
    // 多人模式玩家列表
    multiPlayers: [],
    // 道具系统
    powerUps: {
        skip: 1, // 跳过题目
        hint: 1, // 提示
        doubleScore: 1 // 双倍分数
    },
    // 连击系统
    streak: 0,
    maxStreak: 0
};

// 每轮游戏的题目数量
const POINTS_PER_QUESTION = 5;

// DOM 元素
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen'),
    leaderboard: document.getElementById('leaderboard-screen')
};

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadLeaderboard();
});

// Web Audio API 音效系统
let audioContext;

// 初始化音频上下文
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// 生成音效的函数
function generateSound(frequency, duration, type, volume = 0.3) {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

// 播放音效
function playSound(sound) {
    try {
        const ctx = initAudioContext();
        
        switch (sound) {
            case 'correct':
                // 正确音效：上升音调
                generateSound(523.25, 0.1, 'sine', 0.5); // C5
                setTimeout(() => generateSound(659.25, 0.1, 'sine', 0.5), 100); // E5
                setTimeout(() => generateSound(783.99, 0.2, 'sine', 0.5), 200); // G5
                break;
            case 'wrong':
                // 错误音效：下降音调
                generateSound(523.25, 0.1, 'sawtooth', 0.4); // C5
                setTimeout(() => generateSound(392.00, 0.1, 'sawtooth', 0.4), 100); // G4
                setTimeout(() => generateSound(261.63, 0.2, 'sawtooth', 0.4), 200); // C4
                break;
            case 'button':
                // 按钮音效：短音
                generateSound(440.00, 0.05, 'sine', 0.3); // A4
                break;
            case 'gameWin':
                // 胜利音效：上升音阶
                const winNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
                winNotes.forEach((note, index) => {
                    setTimeout(() => generateSound(note, 0.1, 'sine', 0.4), index * 100);
                });
                break;
            case 'background':
                // 简单的背景音乐
                const bgNotes = [261.63, 329.63, 392.00, 329.63];
                let bgIndex = 0;
                function playBackgroundNote() {
                    generateSound(bgNotes[bgIndex], 1.0, 'sine', 0.1);
                    bgIndex = (bgIndex + 1) % bgNotes.length;
                    setTimeout(playBackgroundNote, 1000);
                }
                playBackgroundNote();
                break;
        }
        console.log(`播放音效: ${sound}`);
    } catch (e) {
        console.log('音效播放失败:', e);
    }
}

// 初始化音效系统
document.addEventListener('DOMContentLoaded', () => {
    // 监听用户交互，解锁音频上下文
    document.addEventListener('click', () => {
        initAudioContext();
    }, { once: true });
});

// 绑定事件
function bindEvents() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('restart-btn').addEventListener('click', startGame);
    document.getElementById('review-btn').addEventListener('click', showReview);
    document.getElementById('back-to-start').addEventListener('click', () => showScreen('start'));
    
    // 模式选择按钮事件
    document.getElementById('single-mode-btn').addEventListener('click', () => selectGameMode('single'));
    document.getElementById('multi-mode-btn').addEventListener('click', () => selectGameMode('multi'));
    
    // 道具按钮事件
    document.getElementById('skip-btn').addEventListener('click', useSkip);
    document.getElementById('hint-btn').addEventListener('click', useHint);
    document.getElementById('double-score-btn').addEventListener('click', useDoubleScore);
}

// 选择游戏模式
function selectGameMode(mode) {
    gameState.gameMode = mode;
    
    // 更新按钮状态
    const singleBtn = document.getElementById('single-mode-btn');
    const multiBtn = document.getElementById('multi-mode-btn');
    
    if (mode === 'single') {
        singleBtn.className = 'btn btn-primary mode-btn';
        multiBtn.className = 'btn btn-secondary mode-btn';
    } else {
        singleBtn.className = 'btn btn-secondary mode-btn';
        multiBtn.className = 'btn btn-primary mode-btn';
    }
    
    playSound('button');
}

// 切换屏幕
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// 随机打乱数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 根据题目类型获取分值
function getQuestionPoints(type) {
    switch (type) {
        case 'multiple':
            return 8; // 多选题8分
        case 'fill':
            return 6; // 填空题6分
        default:
            return 4; // 单选题4分
    }
}

// 从题库中随机选择题目
function selectRandomQuestions() {
    // 确保包含20道单选题、5道多选题、5道填空题
    const singleChoiceQuestions = questionBank.filter(q => !q.type || q.type !== 'multiple' && q.type !== 'fill');
    const multipleChoiceQuestions = questionBank.filter(q => q.type === 'multiple');
    const fillQuestions = scriptureQuestions;
    
    // 随机选择题目
    const selectedSingleChoice = shuffleArray(singleChoiceQuestions).slice(0, 20);
    const selectedMultipleChoice = shuffleArray(multipleChoiceQuestions).slice(0, 5);
    const selectedFill = shuffleArray(fillQuestions).slice(0, 5);
    
    // 合并题目
    const selectedQuestions = [...selectedSingleChoice, ...selectedMultipleChoice, ...selectedFill];
    
    // 打乱顺序
    return shuffleArray(selectedQuestions);
}



// 加载题目
function loadQuestion() {
    const question = gameState.gameQuestions[gameState.currentQuestion];
    gameState.isAnswered = false;
    
    // 更新题目编号
    document.getElementById('question-number').textContent = 
        `${gameState.currentQuestion + 1}/${gameState.gameQuestions.length}`;
    
    // 更新关卡指示器
    const level = getLevel(gameState.currentQuestion + 1);
    document.getElementById('level-indicator').textContent = level;
    
    // 更新课程标签
    document.getElementById('lesson-tag').textContent = `${question.lesson}：${question.title}`;
    
    // 更新题目文本
    let questionText = question.question;
    if (question.type === 'multiple') {
        questionText += '（多选）';
    }
    document.getElementById('question-text').textContent = questionText;
    
    // 生成选项或填空输入框
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    if (question.type === 'fill') {
        // 填空题
        const fillContainer = document.createElement('div');
        fillContainer.className = 'fill-container';
        fillContainer.innerHTML = `
            <input type="text" id="fill-input" class="fill-input" placeholder="请输入答案">
            <button id="submit-fill-btn" class="btn btn-primary">提交答案</button>
        `;
        optionsContainer.appendChild(fillContainer);
        
        // 绑定提交按钮事件
        document.getElementById('submit-fill-btn').addEventListener('click', () => {
            const fillInput = document.getElementById('fill-input');
            const userAnswer = fillInput.value.trim();
            checkFillAnswer(userAnswer);
        });
        
        // 绑定回车键事件
        document.getElementById('fill-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const fillInput = document.getElementById('fill-input');
                const userAnswer = fillInput.value.trim();
                checkFillAnswer(userAnswer);
            }
        });
    } else if (question.type === 'multiple') {
        // 多选题
        const selectedOptions = [];
        const multipleContainer = document.createElement('div');
        multipleContainer.className = 'multiple-container';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.index = index;
            optionDiv.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
                <span class="option-checkbox"></span>
            `;
            optionDiv.addEventListener('click', () => {
                if (gameState.isAnswered) return;
                
                // 切换选项状态
                if (selectedOptions.includes(index)) {
                    const indexToRemove = selectedOptions.indexOf(index);
                    selectedOptions.splice(indexToRemove, 1);
                    optionDiv.classList.remove('selected');
                } else {
                    selectedOptions.push(index);
                    optionDiv.classList.add('selected');
                }
            });
            multipleContainer.appendChild(optionDiv);
        });
        
        // 添加提交按钮
        const submitBtn = document.createElement('button');
        submitBtn.id = 'submit-multiple-btn';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = '提交答案';
        submitBtn.addEventListener('click', () => {
            if (gameState.isAnswered) return;
            if (selectedOptions.length === 0) {
                alert('请至少选择一个选项');
                return;
            }
            selectAnswer(selectedOptions);
        });
        multipleContainer.appendChild(submitBtn);
        optionsContainer.appendChild(multipleContainer);
    } else {
        // 单选题
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.index = index;
            optionDiv.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            optionDiv.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    // 隐藏反馈区域
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.classList.add('hidden');
    feedbackBox.classList.remove('correct', 'wrong');
    
    // 更新进度条
    updateProgress();
    
    // 更新道具状态
    updatePowerUps();
    
    // 更新连击显示
    updateStreakDisplay();
}

// 获取关卡名称
function getLevel(questionNumber) {
    if (questionNumber <= 5) return '初级';
    if (questionNumber <= 10) return '中级';
    if (questionNumber <= 15) return '高级';
    return '终极';
}

// 选择答案
function selectAnswer(selectedIndex) {
    if (gameState.isAnswered) return;
    
    gameState.isAnswered = true;
    
    const question = gameState.gameQuestions[gameState.currentQuestion];
    let isCorrect = false;
    
    if (question.type === 'multiple') {
        // 多选题：检查是否选择了所有正确选项
        isCorrect = JSON.stringify(selectedIndex.sort()) === JSON.stringify(question.answer.sort());
    } else {
        // 单选题：检查是否选择了正确选项
        isCorrect = selectedIndex === question.answer;
    }
    
    // 记录答案
    gameState.answers.push({
        question: question,
        selected: selectedIndex,
        isCorrect: isCorrect
    });
    
    // 更新连击系统
    if (isCorrect) {
        gameState.streak++;
        if (gameState.streak > gameState.maxStreak) {
            gameState.maxStreak = gameState.streak;
        }
        // 连击奖励
        let pointsEarned = getQuestionPoints(question.type);
        if (gameState.powerUps.doubleScore > 0) {
            pointsEarned *= 2;
            gameState.powerUps.doubleScore--;
        }
        // 连击奖励
        if (gameState.streak >= 3) {
            pointsEarned += Math.floor(gameState.streak / 3);
        }
        gameState.score += pointsEarned;
        updateScore(gameState.score);
    } else {
        gameState.streak = 0;
    }
    
    // 显示选项状态
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (question.type === 'multiple') {
            // 多选题：标记所有正确选项
            if (question.answer.includes(index)) {
                option.classList.add('correct');
            } else if (selectedIndex.includes(index)) {
                option.classList.add('wrong');
            }
        } else {
            // 单选题：标记正确选项和错误选项
            if (index === question.answer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('wrong');
            }
        }
    });
    
    // 显示反馈
    showFeedback(isCorrect, question);
}

// 检查填空题答案
function checkFillAnswer(userAnswer) {
    if (gameState.isAnswered) return;
    
    gameState.isAnswered = true;
    
    const question = gameState.gameQuestions[gameState.currentQuestion];
    const isCorrect = userAnswer === question.answer;
    
    // 记录答案
    gameState.answers.push({
        question: question,
        selected: userAnswer,
        isCorrect: isCorrect
    });
    
    // 更新连击系统
    if (isCorrect) {
        gameState.streak++;
        if (gameState.streak > gameState.maxStreak) {
            gameState.maxStreak = gameState.streak;
        }
        // 连击奖励
        let pointsEarned = getQuestionPoints(question.type);
        if (gameState.powerUps.doubleScore > 0) {
            pointsEarned *= 2;
            gameState.powerUps.doubleScore--;
        }
        // 连击奖励
        if (gameState.streak >= 3) {
            pointsEarned += Math.floor(gameState.streak / 3);
        }
        gameState.score += pointsEarned;
        updateScore(gameState.score);
    } else {
        gameState.streak = 0;
    }
    
    // 显示填空输入框状态
    const fillInput = document.getElementById('fill-input');
    const submitBtn = document.getElementById('submit-fill-btn');
    fillInput.disabled = true;
    submitBtn.disabled = true;
    
    if (isCorrect) {
        fillInput.classList.add('correct');
    } else {
        fillInput.classList.add('wrong');
    }
    
    // 显示反馈
    showFeedback(isCorrect, question);
}

// 显示反馈
function showFeedback(isCorrect, question) {
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const explanationBox = document.getElementById('explanation-box');
    
    feedbackBox.classList.remove('hidden');
    feedbackBox.classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
        feedbackIcon.textContent = '恭喜';
        feedbackText.textContent = '恭喜';
        feedbackBox.classList.add('bounce');
        
        // 播放正确音效
        playSound('correct');
    } else {
        feedbackIcon.textContent = '很遗憾';
        feedbackText.textContent = '很遗憾';
        feedbackBox.classList.add('shake');
        
        // 播放错误音效
        playSound('wrong');
    }
    
    // 隐藏解析
    explanationBox.classList.add('hidden');
    
    // 移除动画类并自动继续游戏
    setTimeout(() => {
        feedbackBox.classList.remove('bounce', 'shake');
        feedbackBox.classList.add('hidden');
        
        // 自动进入下一题
        if (gameState.currentQuestion < gameState.gameQuestions.length - 1) {
            nextQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// 更新道具状态
function updatePowerUps() {
    document.getElementById('skip-count').textContent = gameState.powerUps.skip;
    document.getElementById('hint-count').textContent = gameState.powerUps.hint;
    document.getElementById('double-score-count').textContent = gameState.powerUps.doubleScore;
    
    // 禁用已用完的道具
    document.getElementById('skip-btn').disabled = gameState.powerUps.skip <= 0;
    document.getElementById('hint-btn').disabled = gameState.powerUps.hint <= 0;
    document.getElementById('double-score-btn').disabled = gameState.powerUps.doubleScore <= 0;
}

// 更新连击显示
function updateStreakDisplay() {
    const streakElement = document.getElementById('streak-display');
    if (gameState.streak > 0) {
        streakElement.textContent = `🔥 连击 ${gameState.streak} 次`;
        streakElement.classList.remove('hidden');
        if (gameState.streak > 3) {
            streakElement.classList.add('streak-active');
        }
    } else {
        streakElement.classList.add('hidden');
        streakElement.classList.remove('streak-active');
    }
}

// 使用跳过道具
function useSkip() {
    if (gameState.powerUps.skip <= 0 || gameState.isAnswered) return;
    
    playSound('button');
    gameState.powerUps.skip--;
    gameState.answers.push({
        question: gameState.gameQuestions[gameState.currentQuestion],
        selected: -1,
        isCorrect: false,
        skipped: true
    });
    gameState.streak = 0;
    updatePowerUps();
    nextQuestion();
}

// 使用提示道具
function useHint() {
    if (gameState.powerUps.hint <= 0 || gameState.isAnswered) return;
    
    playSound('button');
    gameState.powerUps.hint--;
    
    const question = gameState.gameQuestions[gameState.currentQuestion];
    const correctIndex = question.answer;
    const options = document.querySelectorAll('.option');
    
    // 随机排除一个错误选项
    const wrongOptions = options.filter((_, index) => index !== correctIndex);
    const randomWrongIndex = Math.floor(Math.random() * wrongOptions.length);
    wrongOptions[randomWrongIndex].classList.add('hint-wrong');
    
    updatePowerUps();
}

// 使用双倍分数道具
function useDoubleScore() {
    if (gameState.powerUps.doubleScore <= 0 || gameState.isAnswered) return;
    
    playSound('button');
    const doubleScoreBtn = document.getElementById('double-score-btn');
    doubleScoreBtn.classList.add('active');
    doubleScoreBtn.textContent = '双倍分数已激活！';
    
    // 不需要立即减少数量，在答对时才减少
}

// 开始单人游戏
function startSingleGame() {
    // 重置游戏状态
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.answers = [];
    gameState.isAnswered = false;
    gameState.streak = 0;
    gameState.maxStreak = 0;
    // 重置道具
    gameState.powerUps = {
        skip: 1,
        hint: 1,
        doubleScore: 1
    };
    
    // 随机选择题目
    gameState.gameQuestions = selectRandomQuestions();
    
    // 更新UI
    updateScore(0);
    updateProgress();
    
    // 显示游戏界面
    showScreen('game');
    
    // 播放背景音乐
    playSound('background');
    
    // 播放开始音效
    playSound('button');
    
    // 加载第一题
    loadQuestion();
}

// 开始多人游戏
function startMultiGame() {
    // 重置游戏状态
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.answers = [];
    gameState.isAnswered = false;
    gameState.streak = 0;
    gameState.maxStreak = 0;
    gameState.multiPlayers = [{
        name: gameState.playerName,
        score: 0,
        ready: true
    }];
    // 重置道具
    gameState.powerUps = {
        skip: 1,
        hint: 1,
        doubleScore: 1
    };
    
    // 显示多人游戏房间界面
    showMultiplayerRoom();
}

// 开始游戏
function startGame() {
    // 获取玩家姓名
    const playerNameInput = document.getElementById('player-name');
    const playerName = playerNameInput.value.trim() || '匿名玩家';
    gameState.playerName = playerName;
    
    if (gameState.gameMode === 'single') {
        // 单人模式
        startSingleGame();
    } else {
        // 多人模式
        startMultiGame();
    }
}

// 显示多人游戏房间界面
function showMultiplayerRoom() {
    const container = document.querySelector('.container');
    const roomId = generateRoomId();
    
    // 创建房间界面
    const roomHTML = `
        <div id="multiplayer-room" class="screen active">
            <div class="room-box">
                <h2>👥 多人游戏房间</h2>
                <p>房间 ID: <span id="room-id-display">${roomId}</span></p>
                
                <div class="join-room-section">
                    <h3>🔗 加入房间</h3>
                    <div class="join-room-input">
                        <input type="text" id="join-room-id" class="room-id-input" placeholder="输入房间ID">
                        <button id="join-room-btn" class="btn btn-secondary">加入</button>
                    </div>
                </div>
                
                <div class="players-list">
                    <h3>🎮 玩家列表</h3>
                    <div id="players-list-content">
                        ${gameState.multiPlayers.map(player => `
                            <div class="player-item">
                                <span class="player-name">${player.name}</span>
                                <span class="player-status">${player.ready ? '✅ 已准备' : '⏳ 未准备'}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="room-actions">
                    <button id="start-multi-game-btn" class="btn btn-primary">🚀 开始游戏</button>
                    <button id="leave-room-btn" class="btn btn-secondary">❌ 离开房间</button>
                </div>
                
                <div class="room-info">
                    <p>📝 游戏规则：</p>
                    <ul>
                        <li>所有玩家准备就绪后开始游戏</li>
                        <li>游戏结束后显示实时排名</li>
                        <li>每人有20道题目，每题5分</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // 替换当前界面
    container.innerHTML = container.innerHTML.replace(/<div id="start-screen" class="screen active">[\s\S]*?<\/div>/, roomHTML);
    
    // 绑定按钮事件
    document.getElementById('start-multi-game-btn').addEventListener('click', startMultiGameSession);
    document.getElementById('leave-room-btn').addEventListener('click', () => showScreen('start'));
    document.getElementById('join-room-btn').addEventListener('click', joinRoom);
}

// 加入房间
function joinRoom() {
    const roomIdInput = document.getElementById('join-room-id');
    const roomId = roomIdInput.value.trim();
    
    if (!roomId) {
        alert('请输入房间ID');
        return;
    }
    
    // 模拟加入房间（实际项目中需要使用WebSocket等实时通信）
    alert(`成功加入房间 ${roomId}！`);
    
    // 模拟添加其他玩家
    const randomNames = ['小明', '小红', '小李', '小张', '小王'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    
    gameState.multiPlayers.push({
        name: randomName,
        score: 0,
        ready: true
    });
    
    // 更新玩家列表
    updatePlayersList();
}

// 生成房间ID
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// 更新玩家列表
function updatePlayersList() {
    const playersListContent = document.getElementById('players-list-content');
    if (playersListContent) {
        playersListContent.innerHTML = gameState.multiPlayers.map(player => `
            <div class="player-item">
                <span class="player-name">${player.name}</span>
                <span class="player-status">${player.ready ? '✅ 已准备' : '⏳ 未准备'}</span>
            </div>
        `).join('');
    }
}

// 开始多人游戏会话
function startMultiGameSession() {
    // 随机选择题目
    gameState.gameQuestions = selectRandomQuestions();
    
    // 更新UI
    updateScore(0);
    updateProgress();
    
    // 显示游戏界面
    showScreen('game');
    
    // 播放背景音乐
    playSound('background');
    
    // 播放开始音效
    playSound('button');
    
    // 加载第一题
    loadQuestion();
}

// 下一题
function nextQuestion() {
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion < gameState.gameQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// 更新分数显示
function updateScore(score) {
    document.getElementById('current-score').textContent = score;
}

// 更新进度条
function updateProgress() {
    const progress = ((gameState.currentQuestion) / gameState.gameQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

// 显示荣誉证书
function showCertificate() {
    const playerName = gameState.playerName || '亲爱的学员';
    const today = new Date().toLocaleDateString('zh-CN');
    
    const certificateHTML = `
        <div class="certificate-content">
            <div class="certificate-header">
                <h2>🏆 荣誉证书</h2>
            </div>
            <div class="certificate-body">
                <p class="certificate-greeting">亲爱的 ${playerName}：</p>
                <p class="certificate-congrats">恭喜你完成</p>
                <p class="certificate-title">"以生命影响生命——门徒训练课程"</p>
                <p class="certificate-message">现在你可以带门徒了！</p>
                <p class="certificate-message">祝你多多结生命的果子和福音的果子！</p>
            </div>
            <div class="certificate-footer">
                <p class="certificate-signature">QiHi小组</p>
                <p class="certificate-date">${today}</p>
            </div>
            <button class="btn btn-primary certificate-close">关闭</button>
        </div>
    `;
    
    // 创建证书弹窗
    const certificateModal = document.createElement('div');
    certificateModal.className = 'certificate-modal';
    certificateModal.innerHTML = certificateHTML;
    document.body.appendChild(certificateModal);
    
    // 添加关闭功能
    certificateModal.querySelector('.certificate-close').addEventListener('click', () => {
        certificateModal.remove();
    });
}

// 显示结果
function showResult() {
    showScreen('result');
    
    const finalScore = gameState.score;
    const correctCount = gameState.answers.filter(a => a.isCorrect).length;
    const wrongCount = gameState.gameQuestions.length - correctCount;
    const accuracy = Math.round((correctCount / gameState.gameQuestions.length) * 100);
    
    // 播放胜利音效
    playSound('gameWin');
    
    // 更新分数
    document.getElementById('final-score').textContent = finalScore;
    
    // 设置等级徽章
    const rankBadge = document.getElementById('rank-badge');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    if (finalScore === 100) {
        rankBadge.className = 'rank-badge gold';
        rankBadge.textContent = '🏆 满分王者';
        resultTitle.textContent = '🎉 太棒了！满分通关！';
        resultMessage.textContent = '你对门徒训练的内容掌握得非常透彻！';
        // 添加查看证书按钮
        setTimeout(() => {
            const actionButtons = document.querySelector('.action-buttons');
            const certificateBtn = document.createElement('button');
            certificateBtn.id = 'certificate-btn';
            certificateBtn.className = 'btn btn-primary';
            certificateBtn.textContent = '🏆 查看荣誉证书';
            certificateBtn.addEventListener('click', showCertificate);
            actionButtons.insertBefore(certificateBtn, actionButtons.firstChild);
        }, 500);
    } else if (finalScore >= 80) {
        rankBadge.className = 'rank-badge gold';
        rankBadge.textContent = '🥇 优秀学员';
        resultTitle.textContent = '🎊 恭喜闯关成功！';
        resultMessage.textContent = '你的表现非常出色，继续加油！';
        // 添加查看证书按钮
        setTimeout(() => {
            const actionButtons = document.querySelector('.action-buttons');
            const certificateBtn = document.createElement('button');
            certificateBtn.id = 'certificate-btn';
            certificateBtn.className = 'btn btn-primary';
            certificateBtn.textContent = '🏆 查看荣誉证书';
            certificateBtn.addEventListener('click', showCertificate);
            actionButtons.insertBefore(certificateBtn, actionButtons.firstChild);
        }, 500);
    } else if (finalScore >= 60) {
        rankBadge.className = 'rank-badge silver';
        rankBadge.textContent = '🥈 良好学员';
        resultTitle.textContent = '👍 闯关成功！';
        resultMessage.textContent = '你已经掌握了大部分内容，再接再厉！';
        // 添加查看证书按钮
        setTimeout(() => {
            const actionButtons = document.querySelector('.action-buttons');
            const certificateBtn = document.createElement('button');
            certificateBtn.id = 'certificate-btn';
            certificateBtn.className = 'btn btn-primary';
            certificateBtn.textContent = '🏆 查看荣誉证书';
            certificateBtn.addEventListener('click', showCertificate);
            actionButtons.insertBefore(certificateBtn, actionButtons.firstChild);
        }, 500);
    } else if (finalScore >= 40) {
        rankBadge.className = 'rank-badge bronze';
        rankBadge.textContent = '🥉 合格学员';
        resultTitle.textContent = '✨ 完成挑战！';
        resultMessage.textContent = '继续学习，你会越来越好的！';
    } else {
        rankBadge.className = 'rank-badge participant';
        rankBadge.textContent = '📚 学习学员';
        resultTitle.textContent = '💪 继续努力！';
        resultMessage.textContent = '建议重新阅读教材，加深理解！';
    }
    
    // 更新统计
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // 显示涉及的课程
    const lessonsCovered = [...new Set(gameState.gameQuestions.map(q => q.lesson))];
    const lessonsContainer = document.getElementById('lessons-covered');
    lessonsContainer.innerHTML = lessonsCovered
        .map(lesson => `<span class="lesson-tag-small">${lesson}</span>`)
        .join('');
    
    // 保存到排行榜
    saveToLeaderboard(finalScore, accuracy);
    
    // 显示排名信息
    if (gameState.gameMode === 'single') {
        showRankInfo(finalScore);
    } else if (gameState.gameMode === 'multi') {
        showMultiplayerRankings();
    }
}

// 显示单人模式排名信息
function showRankInfo(score) {
    const leaderboard = JSON.parse(localStorage.getItem('discipleshipQuizLeaderboard') || '[]');
    const playerRank = leaderboard.findIndex(entry => entry.name === gameState.playerName && entry.score === score) + 1;
    
    const rankInfo = document.createElement('div');
    rankInfo.className = 'rank-info';
    rankInfo.innerHTML = `
        <h3>🏆 排行榜排名</h3>
        <p>你的得分：<strong>${score}分</strong></p>
        <p>当前排名：<strong>${playerRank > 0 ? playerRank : '未上榜'}</strong></p>
        <button id="view-leaderboard-btn" class="btn btn-secondary">查看完整排行榜</button>
    `;
    
    const actionButtons = document.querySelector('.action-buttons');
    actionButtons.parentNode.insertBefore(rankInfo, actionButtons);
    
    // 绑定查看排行榜按钮事件
    document.getElementById('view-leaderboard-btn').addEventListener('click', () => showScreen('leaderboard'));
}

// 显示多人模式排名
function showMultiplayerRankings() {
    // 更新当前玩家分数
    const currentPlayer = gameState.multiPlayers.find(p => p.name === gameState.playerName);
    if (currentPlayer) {
        currentPlayer.score = gameState.score;
    }
    
    // 按分数排序
    gameState.multiPlayers.sort((a, b) => b.score - a.score);
    
    const rankInfo = document.createElement('div');
    rankInfo.className = 'rank-info';
    rankInfo.innerHTML = `
        <h3>👥 多人游戏排名</h3>
        <div class="multi-rankings">
            ${gameState.multiPlayers.map((player, index) => `
                <div class="multi-rank-item ${player.name === gameState.playerName ? 'current-player' : ''}">
                    <span class="multi-rank">${index + 1}</span>
                    <span class="multi-player-name">${player.name}</span>
                    <span class="multi-score">${player.score}分</span>
                </div>
            `).join('')}
        </div>
    `;
    
    const actionButtons = document.querySelector('.action-buttons');
    actionButtons.parentNode.insertBefore(rankInfo, actionButtons);
}

// 显示回顾
function showReview() {
    let reviewHTML = '<div class="review-container">';
    reviewHTML += '<h2>📖 答题回顾</h2>';
    
    gameState.answers.forEach((answer, index) => {
        const q = answer.question;
        const isCorrect = answer.isCorrect;
        
        reviewHTML += `
            <div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
                <div class="review-header">
                    <span class="review-number">第${index + 1}题</span>
                    <span class="review-lesson">${q.lesson}</span>
                    <span class="review-status">${isCorrect ? '✓ 正确' : '✗ 错误'}</span>
                </div>
                <div class="review-question">${q.question}</div>
                <div class="review-options">
                    ${q.options ? q.options.map((opt, i) => `
                        <div class="review-option ${i === q.answer ? 'correct-answer' : ''} ${i === answer.selected && !isCorrect ? 'wrong-answer' : ''}>
                            ${String.fromCharCode(65 + i)}. ${opt}
                            ${i === q.answer ? ' ✓' : ''}
                            ${i === answer.selected && !isCorrect ? ' (你的答案)' : ''}
                        </div>
                    `).join('') : q.type === 'fill' ? `
                        <div class="review-fill-answer">
                            <div class="review-correct-answer">正确答案：${q.answer}</div>
                            ${!isCorrect ? `<div class="review-user-answer">你的答案：${answer.selected}</div>` : ''}
                        </div>
                    ` : ''}
                </div>
                <div class="review-explanation">
                    <strong>解析：</strong>${q.explanation}
                </div>
            </div>
        `;
    });
    
    reviewHTML += '<button onclick="showScreen(\'result\')" class="btn btn-secondary">← 返回结果</button>';
    reviewHTML += '</div>';
    
    // 创建回顾弹窗
    const reviewModal = document.createElement('div');
    reviewModal.className = 'review-modal';
    reviewModal.innerHTML = reviewHTML;
    document.body.appendChild(reviewModal);
    
    // 添加关闭功能
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.remove();
        }
    });
}

// 保存到排行榜
function saveToLeaderboard(score, accuracy) {
    const leaderboard = JSON.parse(localStorage.getItem('discipleshipQuizLeaderboard') || '[]');
    
    const entry = {
        name: gameState.playerName,
        score: score,
        accuracy: accuracy,
        date: new Date().toLocaleDateString('zh-CN'),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    
    // 只保留前10名
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('discipleshipQuizLeaderboard', JSON.stringify(top10));
}

// 加载排行榜
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('discipleshipQuizLeaderboard') || '[]');
    const listContainer = document.getElementById('leaderboard-list');
    
    if (leaderboard.length === 0) {
        listContainer.innerHTML = '<p class="empty-leaderboard">暂无记录，快来挑战吧！</p>';
        return;
    }
    
    listContainer.innerHTML = leaderboard.map((entry, index) => `
        <div class="leaderboard-item">
            <div class="leaderboard-rank ${index < 3 ? 'top3' : 'normal'}">${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.name || '匿名玩家'}</div>
                <div class="leaderboard-detail">${entry.date} ${entry.time}</div>
            </div>
            <div class="leaderboard-score">${entry.score}分</div>
        </div>
    `).join('');
}

// 添加回顾弹窗样式
const reviewStyles = document.createElement('style');
reviewStyles.textContent = `
    .review-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        overflow-y: auto;
        padding: 20px;
    }
    
    .review-container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        padding: 30px;
    }
    
    .review-container h2 {
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 25px;
    }
    
    .review-item {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        border-left: 4px solid #ddd;
    }
    
    .review-item.correct {
        border-left-color: var(--secondary-color);
        background: #f0f9f0;
    }
    
    .review-item.wrong {
        border-left-color: var(--danger-color);
        background: #fdf2f2;
    }
    
    .review-header {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
        flex-wrap: wrap;
    }
    
    .review-number {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .review-lesson {
        background: #e8f4fd;
        color: var(--primary-color);
        padding: 2px 10px;
        border-radius: 10px;
        font-size: 0.85rem;
    }
    
    .review-status {
        margin-left: auto;
        font-weight: bold;
    }
    
    .review-item.correct .review-status {
        color: var(--secondary-color);
    }
    
    .review-item.wrong .review-status {
        color: var(--danger-color);
    }
    
    .review-question {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: var(--text-primary);
    }
    
    .review-options {
        margin-bottom: 15px;
    }
    
    .review-option {
        padding: 8px 12px;
        margin-bottom: 5px;
        border-radius: 8px;
    }
    
    .review-option.correct-answer {
        background: #d4edda;
        color: #155724;
        font-weight: 600;
    }
    
    .review-option.wrong-answer {
        background: #f8d7da;
        color: #721c24;
    }
    
    .review-explanation {
        background: #e8f4fd;
        padding: 15px;
        border-radius: 10px;
        border-left: 3px solid var(--primary-color);
    }
    
    .review-fill-answer {
        margin: 10px 0;
    }
    
    .review-correct-answer {
        background: #d4edda;
        color: #155724;
        padding: 8px 12px;
        border-radius: 8px;
        margin-bottom: 5px;
    }
    
    .review-user-answer {
        background: #f8d7da;
        color: #721c24;
        padding: 8px 12px;
        border-radius: 8px;
    }
    
    .empty-leaderboard {
        text-align: center;
        color: var(--text-secondary);
        padding: 40px;
    }
`;
document.head.appendChild(reviewStyles);
