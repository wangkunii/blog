﻿// 《以生命影响生命的门徒训练》题库
// 每课5道题，每题4分，共30题

// 经文填空题目
const scriptureQuestions = [
  {
    id: 61,
    lesson: "第一课",
    title: "经文填空",
    question: "马太福音 28:19-20：所以，你们要去，使万民作我的门徒，奉父、子、圣灵的名给他们施洗。凡我所吩咐你们的，都教训他们遵守，我就常与你们同在，直到______的末了。",
    type: "fill",
    answer: "世界",
    explanation: "马太福音 28:19-20 是大使命的经文"  
  },
  {
    id: 62,
    lesson: "第二课",
    title: "经文填空",
    question: "马太福音 6:9-10：我们在天上的父，愿人都尊你的名为圣。愿你的______降临，愿你的旨意行在地上，如同行在天上。",
    type: "fill",
    answer: "国",
    explanation: "这是主祷文的开头部分"  
  },
  {
    id: 63,
    lesson: "第三课",
    title: "经文填空",
    question: "诗篇 1:2-3：喜爱耶和华的律法，昼夜思想，这人便为有福。他要像一棵树栽在溪水旁，按时候结果子，叶子也不枯干。凡他所做的______。",
    type: "fill",
    answer: "都顺利",
    explanation: "诗篇 1:2-3 强调了思想神话语的重要性"  
  },
  {
    id: 64,
    lesson: "第四课",
    title: "经文填空",
    question: "约翰福音 3:16：神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得______。",
    type: "fill",
    answer: "永生",
    explanation: "约翰福音 3:16 是圣经中最著名的救恩经文"  
  },
  {
    id: 65,
    lesson: "第五课",
    title: "经文填空",
    question: "罗马书 6:4：所以，我们借着洗礼归入死，和他一同埋葬，原是叫我们一举一动有新生的样式，像基督借着父的荣耀从死里______一样。",
    type: "fill",
    answer: "复活",
    explanation: "罗马书 6:4 说明了洗礼的意义"  
  },
  {
    id: 66,
    lesson: "第六课",
    title: "经文填空",
    question: "罗马书 8:13：你们若顺从肉体活着，必要死；若靠着圣灵治死身体的恶行，必要______。",
    type: "fill",
    answer: "活着",
    explanation: "罗马书 8:13 教导如何活出基督的生命"  
  },
  {
    id: 67,
    lesson: "第七课",
    title: "经文填空",
    question: "罗马书 12:2：不要效法这个世界，只要心意更新而变化，叫你们察验何为神的善良、纯全、可喜悦的______。",
    type: "fill",
    answer: "旨意",
    explanation: "罗马书 12:2 教导如何明白神的旨意"  
  },
  {
    id: 68,
    lesson: "第八课",
    title: "经文填空",
    question: "以弗所书 4:16：全身都靠他联络得合式，百节各按各职，照着各体的功用彼此相助，便叫身体渐渐增长，在爱中建立______。",
    type: "fill",
    answer: "自己",
    explanation: "以弗所书 4:16 描述了教会的运作"  
  },
  {
    id: 69,
    lesson: "第九课",
    title: "经文填空",
    question: "马太福音 25:21：主人说：好，你这又良善又忠心的仆人，你在不多的事上有忠心，我要把许多事派你管理；可以进来享受你主人的______。",
    type: "fill",
    answer: "快乐",
    explanation: "马太福音 25:21 教导忠心管家的奖赏"  
  },
  {
    id: 70,
    lesson: "第十课",
    title: "经文填空",
    question: "罗马书 1:16：我不以福音为耻；这福音本是神的大能，要救一切相信的，先是犹太人，后是______。",
    type: "fill",
    answer: "希腊人",
    explanation: "罗马书 1:16 强调福音的大能"  
  },
  {
    id: 71,
    lesson: "第十一课",
    title: "经文填空",
    question: "以弗所书 2:10：我们原是他的工作，在基督耶稣里造成的，为要叫我们行善，就是神所预备叫我们______的。",
    type: "fill",
    answer: "行",
    explanation: "以弗所书 2:10 教导人生的目的"  
  },
  {
    id: 72,
    lesson: "第十二课",
    title: "经文填空",
    question: "提摩太后书 2:2：你在许多见证人面前听见我所教训的，也要交托那忠心能教导______的人。",
    type: "fill",
    answer: "别人",
    explanation: "提摩太后书 2:2 强调门徒训练的传承"  
  }
];

const questionBank = [
  {
    id: 1,
    lesson: "第一课",
    title: "作主门徒",
    question: "耶稣大使命的核心是什么？",
    options: [
      "A. 去，使万民作我的门徒",
      "B. 传讲天国的福音",
      "C. 给人施洗",
      "D. 教导人遵守一切所吩咐的"
    ],
    answer: 0,
    explanation: "大使命的核心是'去，使万民作我的门徒'（马太福音28:19-20）"
  },
  {
    id: 2,
    lesson: "第一课",
    title: "作主门徒",
    question: "主耶稣的门徒训练分为几个阶段？",
    options: [
      "A. 两个阶段",
      "B. 三个阶段",
      "C. 四个阶段",
      "D. 五个阶段"
    ],
    answer: 2,
    explanation: "主耶稣的门徒训练分为四个阶段：传福音、传生命、服侍、差派"
  },
  {
    id: 3,
    lesson: "第一课",
    title: "作主门徒",
    question: "门徒训练的第一阶段是什么？",
    options: [
      "A. 传生命（带领信主）",
      "B. 传福音（带领未信者成为初信者）",
      "C. 服侍（参与教会事工）",
      "D. 差派（出去传福音）"
    ],
    answer: 1,
    explanation: "第一阶段是传福音，带领未信者成为初信者"
  },
  {
    id: 4,
    lesson: "第一课",
    title: "作主门徒",
    question: "'门徒'一词的希腊文原意是什么？",
    options: [
      "A. 学生或学习者",
      "B. 服侍主人的仆人",
      "C. 关系亲密的朋友",
      "D. 忠心跟从的人"
    ],
    answer: 0,
    explanation: "门徒的希腊文是mathetes，原意是学生或学习者"
  },
  {
    id: 5,
    lesson: "第一课",
    title: "作主门徒",
    question: "耶稣挑选了多少个门徒？",
    options: [
      "A. 70个",
      "B. 12个",
      "C. 120个",
      "D. 500个"
    ],
    answer: 1,
    explanation: "耶稣挑选了12个门徒，代表新以色列的十二支派"
  },

  {
    id: 6,
    lesson: "第二课",
    title: "祷告",
    question: "祷告的三个可能结果是什么？",
    options: [
      "A. 立即得回答、迟延得回答、得更好的",
      "B. 得到应允、被神拒绝、按神的旨意成就",
      "C. 立即得到回应、被明确引导、完全没有回应",
      "D. 得到应允、得到更好的、应许暂时延迟"
    ],
    answer: 0,
    explanation: "祷告的三个可能结果：立即得回答、迟延得回答、神给我们更好的"
  },
  {
    id: 7,
    lesson: "第二课",
    title: "祷告",
    question: "主耶稣教导的祷告范本被称为什么？",
    options: [
      "A. 祷告指南",
      "B. 主祷文",
      "C. 山边宝训",
      "D. 大使命"
    ],
    answer: 1,
    explanation: "主耶稣教导的祷告范本被称为主祷文（马太福音6:9-13）"
  },
  {
    id: 8,
    lesson: "第二课",
    title: "祷告",
    question: "主祷文中'愿你的国降临'主要指的是什么？",
    options: [
      "A. 天国的到来",
      "B. 神的荣耀和旨意在地上通行",
      "C. 教会的建立",
      "D. 世界的末了"
    ],
    answer: 1,
    explanation: "愿你的国降临是指神的权能和旨意在地上完全通行"
  },
  {
    id: 9,
    lesson: "第二课",
    title: "祷告",
    question: "祷告最基本的态度应该是什么？",
    options: [
      "A. 态度坚决果断",
      "B. 诚实和敬畏",
      "C. 赞美和感恩",
      "D. 声音响亮清晰"
    ],
    answer: 2,
    explanation: "祷告最基本的态度是诚实和敬畏，来到神面前承认自己的需要"
  },
  {
    id: 10,
    lesson: "第二课",
    title: "祷告",
    question: "在圣经中谁被称为'祷告的人'？",
    options: [
      "A. 摩西",
      "B. 以利亚",
      "C. 但以理",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "摩西、以利亚、但以理都是圣经中著名的祷告榜样"
  },

  {
    id: 11,
    lesson: "第三课",
    title: "读经",
    question: "读经的主要目的是什么？",
    options: [
      "A. 进入神学院获得知识",
      "B. 与神建立个人的关系",
      "C. 为讲道或教导做准备",
      "D. 完成每天应尽的读经功课"
    ],
    answer: 1,
    explanation: "读经的主要目的是与神建立个人的关系"
  },
  {
    id: 12,
    lesson: "第三课",
    title: "读经",
    question: "读经过程建议从哪卷福音书开始？",
    options: [
      "A. 马太福音",
      "B. 马可福音",
      "C. 路加福音",
      "D. 约翰福音"
    ],
    answer: 3,
    explanation: "圣经建议的读经过程从约翰福音开始"
  },
  {
    id: 13,
    lesson: "第三课",
    title: "读经",
    question: "有效的读经应该包含哪些要素？",
    options: [
      "A. 读经、默想、祷告、应用",
      "B. 读经、笔记、背诵",
      "C. 祷告、听道、分享",
      "D. 读经、分析、分享"
    ],
    answer: 0,
    explanation: "有效的读经包含四个要素：读经、默想、祷告、应用"
  },
  {
    id: 14,
    lesson: "第三课",
    title: "读经",
    question: "'读经'一词强调的是什么？",
    options: [
      "A. 深入的学术研究",
      "B. 生命的喂养和滋养",
      "C. 系统的神学学习",
      "D. 信仰的社交活动"
    ],
    answer: 1,
    explanation: "读经强调生命的喂养和滋养，是内在生命的成长"
  },
  {
    id: 15,
    lesson: "第三课",
    title: "读经",
    question: "耶稣经常做什么？",
    options: [
      "A. 行神迹",
      "B. 禁食",
      "C. 祷告读经",
      "D. 讲道"
    ],
    answer: 2,
    explanation: "耶稣经常独自到旷野的地方祷告读经（马可福音1:35）"
  },

  {
    id: 16,
    lesson: "第四课",
    title: "得救的确据",
    question: "得救的确据建立在什么基础上？",
    options: [
      "A. 自己所做的善行",
      "B. 神的应许和信心",
      "C. 教会方面的认可",
      "D. 个人的感觉和经验"
    ],
    answer: 1,
    explanation: "得救的确据建立在神的应许和信心上，不是基于感觉或行为"
  },
  {
    id: 17,
    lesson: "第四课",
    title: "得救的确据",
    question: "'窄门小路'是什么？",
    options: [
      "A. 教会规定的规则",
      "B. 信徒与神之间的关系",
      "C. 门徒训练中的挑战",
      "D. 接受洗礼的必要过程"
    ],
    answer: 2,
    explanation: "窄门小路是门徒训练中的挑战，表明跟随基督的代价"
  },
  {
    id: 18,
    lesson: "第四课",
    title: "得救的确据",
    question: "圣经哪节经文说'神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不至灭亡，反得永生'？",
    options: [
      "A. 约翰福音3:16",
      "B. 罗马书5:8",
      "C. 以弗所书2:8",
      "D. 约翰一书1:9"
    ],
    answer: 0,
    explanation: "约翰福音3:16是圣经中最著名的救恩经文"
  },
  {
    id: 19,
    lesson: "第四课",
    title: "得救的确据",
    question: "得救是本乎什么？",
    options: [
      "A. 个人的好行为",
      "B. 恩，也因着信",
      "C. 丰富的知识",
      "D. 教会的仪式"
    ],
    answer: 1,
    explanation: "以弗所书2:8说：你们得救是本乎恩，也因着信"
  },
  {
    id: 20,
    lesson: "第四课",
    title: "得救的确据",
    question: "信徒可以知道自己有永生吗？",
    options: [
      "A. 不可以，只能猜测",
      "B. 可以，圣经有明确的应许",
      "C. 只有牧师才能知道",
      "D. 只有死后才知道"
    ],
    answer: 1,
    explanation: "约翰一书5:13说：我将这些话写给你们信奉神儿子之名的人，要叫你们知道自己有永生"
  },

  {
    id: 21,
    lesson: "第五课",
    title: "洗礼",
    question: "洗礼的主要意义是什么？",
    options: [
      "A. 洗净身体表面的污秽",
      "B. 与主同死、同埋葬、同复活",
      "C. 正式加入教会的仪式",
      "D. 获得医治的必要方法"
    ],
    answer: 1,
    explanation: "洗礼象征与主同死、同埋葬、同复活（罗马书6:3-4）"
  },
  {
    id: 22,
    lesson: "第五课",
    title: "洗礼",
    question: "洗礼是得救的必要条件吗？",
    options: [
      "A. 是，没有洗礼就不能得救",
      "B. 不是，得救是本乎恩，也因着信",
      "C. 有时是必要的，有时不是",
      "D. 只有通过洗礼才能进天堂"
    ],
    answer: 1,
    explanation: "洗礼不是得救的必要条件，得救是本乎恩，也因着信"
  },
  {
    id: 23,
    lesson: "第五课",
    title: "洗礼",
    question: "谁应该受洗？",
    options: [
      "A. 所有的婴儿",
      "B. 所有的成年人",
      "C. 真正相信主的人",
      "D. 只有牧师才能受洗"
    ],
    answer: 2,
    explanation: "只有真正信主的人才应该受洗，这是信心的回应"
  },
  {
    id: 24,
    lesson: "第五课",
    title: "洗礼",
    question: "洗礼是向谁作的见证？",
    options: [
      "A. 只向自己",
      "B. 向神、向教会、向世界",
      "C. 只向牧师",
      "D. 只向家人"
    ],
    answer: 1,
    explanation: "洗礼是向神、向教会、向世界作见证，表明自己是基督的门徒"
  },
  {
    id: 25,
    lesson: "第五课",
    title: "洗礼",
    question: "耶稣受洗时发生了什么？",
    options: [
      "A. 天开了，有声音说'这是我的爱子'",
      "B. 天裂开了，地也震动",
      "C. 天使显现",
      "D. 圣灵降临"
    ],
    answer: 0,
    explanation: "耶稣受洗时，天开了，有声音说'这是我的爱子，我所喜悦的'（马太福音3:16-17）"
  },

  {
    id: 26,
    lesson: "第六课",
    title: "得胜的生活",
    question: "得胜生活的秘诀是什么？",
    options: [
      "A. 依靠自己的意志力",
      "B. 依靠圣灵，顺服基督",
      "C. 多多参加教会活动",
      "D. 时常进行禁食祷告"
    ],
    answer: 1,
    explanation: "得胜生活的秘诀是依靠圣灵，顺服基督的主"
  },
  {
    id: 27,
    lesson: "第六课",
    title: "得胜的生活",
    question: "基督信徒与罪恶的关系应该是怎样的？",
    options: [
      "A. 继续犯罪，等死后再悔改",
      "B. 向罪死，向义活",
      "C. 犯罪无所谓，因为已经得救",
      "D. 尽量控制不去犯罪"
    ],
    answer: 1,
    explanation: "基督信徒应当向罪死，向义活（罗马书6:11）"
  },
  {
    id: 28,
    lesson: "第六课",
    title: "得胜的生活",
    question: "胜过试探的第一步是什么？",
    options: [
      "A. 立即面对试探",
      "B. 认清试探的本质和来源",
      "C. 直接与试探对抗",
      "D. 忽略试探的存在"
    ],
    answer: 1,
    explanation: "胜过试探的第一步是认清试探的本质和来源"
  },
  {
    id: 29,
    lesson: "第六课",
    title: "得胜的生活",
    question: "圣灵在信徒生命中的工作包括什么？",
    options: [
      "A. 只赐能力行各种神迹",
      "B. 引导、教导、加力量、结果子",
      "C. 让信徒变得富有",
      "D. 保证信徒不生病"
    ],
    answer: 1,
    explanation: "圣灵引导、教导信徒，加给力量，并结出圣灵的果子"
  },
  {
    id: 30,
    lesson: "第六课",
    title: "得胜的生活",
    question: "圣灵的果子包括哪些？（加拉太书5:22-23）",
    options: [
      "A. 信心、盼望、爱心",
      "B. 仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制",
      "C. 能力、智慧、知识",
      "D. 祷告、读经、聚会"
    ],
    answer: 1,
    explanation: "圣灵所结的果子是：仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制"
  },

  {
    id: 31,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "明白神旨意的首要条件是什么？",
    options: [
      "A. 研读圣经经文",
      "B. 与神有亲密的关系",
      "C. 有属灵长辈的引导",
      "D. 经常进行长时间祷告"
    ],
    answer: 1,
    explanation: "明白神旨意的首要条件是与神有亲密的关系"
  },
  {
    id: 32,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "神启示旨意的途径包括什么？",
    options: [
      "A. 环境和感觉",
      "B. 圣经、祷告、环境、属灵长辈的引导",
      "C. 抽签和占卜",
      "D. 个人的想法"
    ],
    answer: 1,
    explanation: "神通过圣经、祷告、环境和属灵长辈的引导来启示他的旨意"
  },
  {
    id: 33,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "神的旨意有哪些特点？",
    options: [
      "A. 总是让人发财",
      "B. 美好、完全、可喜悦",
      "C. 难以理解神秘",
      "D. 只对少数人显现"
    ],
    answer: 1,
    explanation: "罗马书12:2说神的旨意是美好、完全、可喜悦的"
  },
  {
    id: 34,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "当不明白神旨意时应该怎么做？",
    options: [
      "A. 凭自己心意决定",
      "B. 等待、祷告、寻求",
      "C. 求问算命先生",
      "D. 随世流俗而行"
    ],
    answer: 1,
    explanation: "当不明白神旨意时，应该等待、祷告、寻求神的引导"
  },
  {
    id: 35,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "耶稣说'来跟从我'的呼召是要门徒做什么？",
    options: [
      "A. 出去传福音",
      "B. 与他建立亲密的关系，学习他的样式",
      "C. 建立教会组织",
      "D. 撰写圣经经文"
    ],
    answer: 2,
    explanation: "耶稣呼召门徒来跟从他，是要与他们建立亲密关系，让他们学习他的样式"
  },

  {
    id: 36,
    lesson: "第八课",
    title: "教会生活",
    question: "教会的定义是什么？",
    options: [
      "A. 一栋建筑物",
      "B. 蒙神呼召出来的信徒群体",
      "C. 一个社会组织",
      "D. 宗教机构"
    ],
    answer: 1,
    explanation: "教会是蒙神呼召出来的信徒群体，不是建筑物"
  },
  {
    id: 37,
    lesson: "第八课",
    title: "教会生活",
    question: "基督信徒为什么要参加教会生活？",
    options: [
      "A. 法律的规定要求",
      "B. 互相勉励、彼此建造、一同敬拜神",
      "C. 为了社交的需要",
      "D. 为了被别人看见"
    ],
    answer: 1,
    explanation: "基督信徒参加教会生活是为了互相勉励、彼此建造、一同敬拜神"
  },
  {
    id: 38,
    lesson: "第八课",
    title: "教会生活",
    question: "教会生活中的'团契'是什么意思？",
    options: [
      "A. 一起吃饭做事",
      "B. 信徒之间在基督里的生命相交",
      "C. 同学会活动",
      "D. 进行慈善募捐"
    ],
    answer: 1,
    explanation: "团契（fellowship）是指信徒之间在基督里的生命相交"
  },
  {
    id: 39,
    lesson: "第八课",
    title: "教会生活",
    question: "信徒在教会中应该持什么态度？",
    options: [
      "A. 论断和指责",
      "B. 爱心、诚实、服侍",
      "C. 骄傲和分别",
      "D. 争斗和比较"
    ],
    answer: 1,
    explanation: "信徒在教会中应该持爱心、诚实、服侍的态度"
  },
  {
    id: 40,
    lesson: "第八课",
    title: "教会生活",
    question: "基督是教会的什么？",
    options: [
      "A. 创立者",
      "B. 头",
      "C. 问题顾问",
      "D. 帮助者"
    ],
    answer: 1,
    explanation: "基督是教会的头，教会是基督的身体（以弗所书1:22-23）"
  },

  {
    id: 41,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "管家职分的核心是什么？",
    options: [
      "A. 管理自己的财富",
      "B. 忠心地管理神所托付的一切",
      "C. 为别人工作服务",
      "D. 从事慈善活动"
    ],
    answer: 1,
    explanation: "管家职分的核心是忠心地管理神所托付的时间、金钱、才能等一切"
  },
  {
    id: 42,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "基督信徒应该管理哪些资源？",
    options: [
      "A. 只有金钱",
      "B. 时间、金钱、才能、身体、关系等",
      "C. 只有时间",
      "D. 只有才能"
    ],
    answer: 1,
    explanation: "基督信徒应该管理神所托付的时间、金钱、才能、身体、关系等一切资源"
  },
  {
    id: 43,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "十一奉献的意义是什么？",
    options: [
      "A. 教会的规定要求",
      "B. 承认神是主人，承认一切供应来自神",
      "C. 为了得到更多回报",
      "D. 一种税赋形式"
    ],
    answer: 1,
    explanation: "十一奉献是承认神是主人，承认一切供应来自神"
  },
  {
    id: 44,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "耶稣关于管家的教导中，什么是神所看重的？",
    options: [
      "A. 才能的大小",
      "B. 是否忠心",
      "C. 成果的数量",
      "D. 别人的评价"
    ],
    answer: 1,
    explanation: "神看重的是忠心，不是才能的大小（马太福音25:21）"
  },
  {
    id: 45,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "'又良善又忠心的仆人'会得到什么奖赏？",
    options: [
      "A. 金钱财富",
      "B. 主人的称赞和更大的责任",
      "C. 名声荣誉",
      "D. 地位权力"
    ],
    answer: 1,
    explanation: "又良善又忠心的仆人会得到主人的称赞和更大的责任（马太福音25:21）"
  },

  {
    id: 46,
    lesson: "第十课",
    title: "传福音",
    question: "传福音的主要内容是什么？",
    options: [
      "A. 教会的活动",
      "B. 耶稣基督并他钉十字架",
      "C. 道德教导",
      "D. 社会改良"
    ],
    answer: 1,
    explanation: "传福音的主要内容是耶稣基督并他钉十字架（哥林多前书2:2）"
  },
  {
    id: 47,
    lesson: "第十课",
    title: "传福音",
    question: "每个基督信徒都有传福音的使命吗？",
    options: [
      "A. 只有牧师需要传福音",
      "B. 只有传道人需要传福音",
      "C. 每个基督信徒都有使命",
      "D. 只有长老需要传福音"
    ],
    answer: 2,
    explanation: "每个基督信徒都有传福音的使命，这是大使命的要求"
  },
  {
    id: 48,
    lesson: "第十课",
    title: "传福音",
    question: "传福音的有效方法包括什么？",
    options: [
      "A. 说服他人相信",
      "B. 生命见证、分享福音信息、邀请人信主",
      "C. 辩论和争论",
      "D. 用金钱诱惑"
    ],
    answer: 1,
    explanation: "传福音的有效方法包括生命见证、分享福音信息、邀请人信主"
  },
  {
    id: 49,
    lesson: "第十课",
    title: "传福音",
    question: "福音的核心信息是什么？",
    options: [
      "A. 做好事可以得救",
      "B. 人因信耶稣基督得永生",
      "C. 遵守律法可以得救",
      "D. 行善积德可以得救"
    ],
    answer: 1,
    explanation: "福音的核心信息是人因信耶稣基督得永生（约翰福音3:16）"
  },
  {
    id: 50,
    lesson: "第十课",
    title: "传福音",
    question: "传福音时最重要的是什么？",
    options: [
      "A. 勇气和胆量",
      "B. 爱心和依靠圣灵的能力",
      "C. 知识装备",
      "D. 社会地位"
    ],
    answer: 1,
    explanation: "传福音最重要的是有爱心和依靠圣灵的能力"
  },

  {
    id: 51,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "人生的目的是什么？",
    options: [
      "A. 发财致富",
      "B. 结两种果子：生命的果子和福音的果子",
      "C. 成名成家",
      "D. 享受人生"
    ],
    answer: 1,
    explanation: "人生的目的是结两种果子：生命的果子（圣灵的果子）和福音的果子"
  },
  {
    id: 52,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "'目标'在基督信徒生命中的意义是什么？",
    options: [
      "A. 看见目标",
      "B. 从神来的方向和目的，指引人生的道路",
      "C. 做白日梦",
      "D. 不切实际的幻想"
    ],
    answer: 1,
    explanation: "目标是指从神来的方向和目的，指引人生的道路"
  },
  {
    id: 53,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "圣灵的果子包括哪些？",
    options: [
      "A. 能力、智慧、知识",
      "B. 仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制",
      "C. 信心、盼望、爱心",
      "D. 祷告、读经、聚会"
    ],
    answer: 1,
    explanation: "圣灵的果子是：仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制"
  },
  {
    id: 54,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "人生的意义在于什么？",
    options: [
      "A. 追求快乐",
      "B. 荣耀神，完成神所托付的使命",
      "C. 传宗接代",
      "D. 功成名就"
    ],
    answer: 1,
    explanation: "人生的意义在于荣耀神，完成神所托付的使命"
  },
  {
    id: 55,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "如何发现自己的人生目标？",
    options: [
      "A. 观察别人的生活",
      "B. 祷告寻求、认识自己的恩赐和使命",
      "C. 随机选择方向",
      "D. 听从世界的标准"
    ],
    answer: 1,
    explanation: "发现人生目标需要祷告寻求神，认识自己的恩赐和使命"
  },

  {
    id: 56,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "门徒训练的精神是什么？",
    options: [
      "A. 课堂教学",
      "B. 生命影响生命",
      "C. 书本学习",
      "D. 考试测试"
    ],
    answer: 1,
    explanation: "门徒训练的精神是'生命影响生命'，通过关系传递信仰"
  },
  {
    id: 57,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "门徒训练的四个阶段是什么？",
    options: [
      "A. 初信、成长、成熟、差派",
      "B. 传福音、传生命、服侍、差派",
      "C. 学习、实践、教导、差派",
      "D. 洗礼、读经、祷告、传福音"
    ],
    answer: 1,
    explanation: "门徒训练的四个阶段是：传福音、传生命、服侍、差派"
  },
  {
    id: 58,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "有效的门徒训练需要什么？",
    options: [
      "A. 详细的设施",
      "B. 有计划的过程、生命榜样、实践机会",
      "C. 大型场地",
      "D. 高学历教师"
    ],
    answer: 1,
    explanation: "有效的门徒训练需要有计划的过程、生命榜样和实践机会"
  },
  {
    id: 59,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "耶稣如何训练门徒？",
    options: [
      "A. 只听讲道",
      "B. 同在、示范服侍、差派他们出去",
      "C. 只行神迹",
      "D. 只祷告"
    ],
    answer: 1,
    explanation: "耶稣训练门徒的方式是：与他们同在、示范服侍、差派他们出去"
  },
  {
    id: 60,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "门徒训练的最终目标是什么？",
    options: [
      "A. 增加教会人数",
      "B. 使人成为主的门徒，完成大使命",
      "C. 培养牧师",
      "D. 建立组织"
    ],
    answer: 1,
    explanation: "门徒训练的最终目标是使人成为主的门徒，完成大使命"
  },

  {
    id: 61,
    lesson: "第一课",
    title: "作主门徒",
    question: "作主门徒的代价是什么？",
    options: [
      "A. 放弃一切跟从主",
      "B. 只需要相信",
      "C. 每周去教会",
      "D. 做个好人"
    ],
    answer: 0,
    explanation: "作主门徒需要牺牲，背起十字架跟从主（马太福音16:24）"
  },
  {
    id: 62,
    lesson: "第一课",
    title: "作主门徒",
    question: "门徒与主耶稣的关系是什么？",
    options: [
      "A. 师生关系",
      "B. 主仆关系",
      "C. 朋友关系",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "门徒与主耶稣既是师生、主仆，也是朋友关系"
  },
  {
    id: 63,
    lesson: "第一课",
    title: "作主门徒",
    question: "耶稣说'天国是努力进入的，努力的人就得着了'是什么意思？",
    options: [
      "A. 要用力气才能进天国",
      "B. 要迫切追求、努力寻求天国",
      "C. 只有强壮的人才能进天国",
      "D. 天国需要体力劳动"
    ],
    answer: 1,
    explanation: "努力进入天国是指要迫切追求、努力寻求神的国"
  },
  {
    id: 64,
    lesson: "第一课",
    title: "作主门徒",
    question: "下列哪些是门徒的特征？",
    options: [
      "A. 舍己",
      "B. 背起十字架",
      "C. 跟从主",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "门徒的特征包括舍己、背起十字架、跟从主"
  },
  {
    id: 65,
    lesson: "第一课",
    title: "作主门徒",
    question: "大使命的顺序是什么？",
    options: [
      "A. 传福音、施洗、教导",
      "B. 施洗、传福音、教导",
      "C. 教导、传福音、施洗",
      "D. 传福音、教导、施洗"
    ],
    answer: 0,
    explanation: "大使命的顺序是：去传福音、给人施洗、教导他们遵守主的吩咐"
  },

  {
    id: 66,
    lesson: "第二课",
    title: "祷告",
    question: "祷告应该在哪里？",
    options: [
      "A. 只有在教会",
      "B. 只有在教堂",
      "C. 随时随地",
      "D. 只有在早上"
    ],
    answer: 2,
    explanation: "我们可以随时随地向神祷告（帖撒罗尼迦前书5:17）"
  },
  {
    id: 67,
    lesson: "第二课",
    title: "祷告",
    question: "祷告的态度应该是怎样的？",
    options: [
      "A. 自满得意",
      "B. 认罪顺服",
      "C. 命令式的",
      "D. 长篇大论"
    ],
    answer: 1,
    explanation: "祷告应该怀着认罪顺服的态度"
  },
  {
    id: 68,
    lesson: "第二课",
    title: "祷告",
    question: "耶稣教导我们要'不住地祷告'是什么意思？",
    options: [
      "A. 24小时不停地说话",
      "B. 保持与神的持续沟通和等候",
      "C. 只在困难时祷告",
      "D. 每天固定时间祷告"
    ],
    answer: 1,
    explanation: "不住地祷告是指保持与神的持续沟通和等候"
  },
  {
    id: 69,
    lesson: "第二课",
    title: "祷告",
    question: "祷告蒙应允的条件是什么？",
    options: [
      "A. 信心",
      "B. 顺服神的旨意",
      "C. 圣洁的生活",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "祷告蒙应允需要信心、顺服神的旨意和圣洁的生活"
  },
  {
    id: 70,
    lesson: "第二课",
    title: "祷告",
    question: "主祷文中'免我们的债，如同我们免了人的债'教导我们什么？",
    options: [
      "A. 要赦免他人",
      "B. 不要欠债",
      "C. 只关心自己的债",
      "D. 向神求免债"
    ],
    answer: 0,
    explanation: "这句教导我们要赦免他人的罪，如同神赦免我们一样"
  },

  {
    id: 71,
    lesson: "第三课",
    title: "读经",
    question: "读经的最佳时间是什么时候？",
    options: [
      "A. 早上",
      "B. 晚上",
      "C. 中午",
      "D. 个人最合适、最安静的时间"
    ],
    answer: 3,
    explanation: "读经的最佳时间是个人最合适、最安静的时间"
  },
  {
    id: 72,
    lesson: "第三课",
    title: "读经",
    question: "读经时应该读多少？",
    options: [
      "A. 越多越好",
      "B. 少而精，注重默想",
      "C. 固定章节数",
      "D. 只读自己感兴趣的部分"
    ],
    answer: 1,
    explanation: "读经时应该少而精，注重默想和应用"
  },
  {
    id: 73,
    lesson: "第三课",
    title: "读经",
    question: "默想经文的目的是什么？",
    options: [
      "A. 记住经文",
      "B. 理解经文的意义",
      "C. 应用到生活中",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "默想经文的目的是记住、理解并应用到生活中"
  },
  {
    id: 74,
    lesson: "第三课",
    title: "读经",
    question: "读经中祷告的内容包括什么？",
    options: [
      "A. 感恩",
      "B. 认罪悔改",
      "C. 为他人代求",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "读经中的祷告应包含感恩、认罪、代求等内容"
  },
  {
    id: 75,
    lesson: "第三课",
    title: "读经",
    question: "如何保持读经的一致性？",
    options: [
      "A. 制定计划",
      "B. 建立习惯",
      "C. 寻求accountability",
      "D. 以上都是"
    ],
    answer: 3,
    explanation: "保持读经一致性需要制定计划、建立习惯和寻求accountability"
  },

  {
    id: 101,
    lesson: "第一课",
    title: "作主门徒",
    question: "作主门徒的要素包括哪些？",
    type: "multiple",
    options: [
      "A. 舍己",
      "B. 背起十字架",
      "C. 跟从主",
      "D. 只相信主"
    ],
    answer: [0, 1, 2],
    explanation: "作主门徒需要舍己、背起十字架、跟从主"
  },
  {
    id: 102,
    lesson: "第二课",
    title: "祷告",
    question: "有效的祷告应该具备哪些要素？",
    type: "multiple",
    options: [
      "A. 信心",
      "B. 顺服神的旨意",
      "C. persistence（坚持）",
      "D. 华丽的词藻"
    ],
    answer: [0, 1, 2],
    explanation: "有效的祷告需要信心、顺服神的旨意和坚持"
  },
  {
    id: 103,
    lesson: "第三课",
    title: "读经",
    question: "读经的基本要素包括哪些？",
    type: "multiple",
    options: [
      "A. 读经",
      "B. 默想",
      "C. 祷告",
      "D. 应用"
    ],
    answer: [0, 1, 2, 3],
    explanation: "读经的基本要素包括读经、默想、祷告和应用"
  },
  {
    id: 104,
    lesson: "第四课",
    title: "得救的确据",
    question: "得救的确据来自哪些方面？",
    type: "multiple",
    options: [
      "A. 神的应许",
      "B. 圣灵的内住",
      "C. 生命的改变",
      "D. 个人的感觉"
    ],
    answer: [0, 1, 2],
    explanation: "得救的确据来自神的应许、圣灵的内住和生命的改变"
  },
  {
    id: 105,
    lesson: "第五课",
    title: "洗礼",
    question: "洗礼的意义包括哪些？",
    type: "multiple",
    options: [
      "A. 与主同死",
      "B. 与主同埋葬",
      "C. 与主同复活",
      "D. 洗净罪恶"
    ],
    answer: [0, 1, 2, 3],
    explanation: "洗礼象征与主同死、同埋葬、同复活，以及洗净罪恶"
  },
  {
    id: 106,
    lesson: "第六课",
    title: "得胜的生活",
    question: "得胜生活的秘诀包括哪些？",
    type: "multiple",
    options: [
      "A. 依靠圣灵",
      "B. 顺服基督",
      "C. 研读圣经",
      "D. 与信徒相交"
    ],
    answer: [0, 1, 2, 3],
    explanation: "得胜生活需要依靠圣灵、顺服基督、研读圣经和与信徒相交"
  },
  {
    id: 107,
    lesson: "第七课",
    title: "明白神的旨意",
    question: "明白神旨意的途径包括哪些？",
    type: "multiple",
    options: [
      "A. 研读圣经",
      "B. 祷告寻求",
      "C. 环境引导",
      "D. 属灵长辈的引导"
    ],
    answer: [0, 1, 2, 3],
    explanation: "明白神旨意的途径包括研读圣经、祷告寻求、环境引导和属灵长辈的引导"
  },
  {
    id: 108,
    lesson: "第八课",
    title: "教会生活",
    question: "教会的功能包括哪些？",
    type: "multiple",
    options: [
      "A. 敬拜神",
      "B. 教导真理",
      "C. 彼此建造",
      "D. 传福音"
    ],
    answer: [0, 1, 2, 3],
    explanation: "教会的功能包括敬拜神、教导真理、彼此建造和传福音"
  },
  {
    id: 109,
    lesson: "第九课",
    title: "忠心的好管家",
    question: "基督信徒需要管理的资源包括哪些？",
    type: "multiple",
    options: [
      "A. 时间",
      "B. 金钱",
      "C. 才能",
      "D. 身体"
    ],
    answer: [0, 1, 2, 3],
    explanation: "基督信徒需要管理时间、金钱、才能和身体等资源"
  },
  {
    id: 110,
    lesson: "第十课",
    title: "传福音",
    question: "传福音的方法包括哪些？",
    type: "multiple",
    options: [
      "A. 生命见证",
      "B. 分享福音信息",
      "C. 邀请人信主",
      "D. 说服他人相信"
    ],
    answer: [0, 1, 2],
    explanation: "传福音的方法包括生命见证、分享福音信息和邀请人信主"
  },
  {
    id: 111,
    lesson: "第十一课",
    title: "有目标的人生",
    question: "人生的果子包括哪些？",
    type: "multiple",
    options: [
      "A. 仁爱、喜乐、和平",
      "B. 忍耐、恩慈、良善",
      "C. 信实、温柔、节制",
      "D. 智慧、能力、知识"
    ],
    answer: [0, 1, 2],
    explanation: "人生的果子包括仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制"
  },
  {
    id: 112,
    lesson: "第十二课",
    title: "成为门徒的计划",
    question: "门徒训练的方法包括哪些？",
    type: "multiple",
    options: [
      "A. 生命榜样",
      "B. 教导真理",
      "C. 实践机会",
      "D. 考试测试"
    ],
    answer: [0, 1, 2],
    explanation: "门徒训练的方法包括生命榜样、教导真理和实践机会"
  }
];