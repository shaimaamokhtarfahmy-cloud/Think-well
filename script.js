// ==========================================
// ⬇️ تعليمات إضافة المنهج (Syllabus) ⬇️
// أضف الأبواب (chapter) والدروس (branches) والأسئلة (questions).
// كل درس (branch) يمثل وحشاً جديداً يجب على الطفل هزيمته!
// ==========================================


   const syllabus = [
  {
    chapter: "1. قلعة الفعل (Verb to BE)",
    branches: [
      {
        title: "المضارع: Am, Is, Are",
        lesson: "📜 اللفافة السحرية: نستخدم (Verb to Be) في المضارع لنوصف أنفسنا أو الآخرين. الملك (I) يأخذ (Am). والمفرد (He, She, It) يأخذون (Is). والجمع (We, They, You) يأخذون (Are)!",
        questions: [
          { q: "I _____ a brave hero.", options: ["am", "is", "are"], a: "am" },
          { q: "She _____ fighting the monster.", options: ["am", "is", "are"], a: "is" },
          { q: "We _____ ready to win!", options: ["am", "is", "are"], a: "are" }
        ]
      },
      {
        title: "الماضي: Was, Were",
        lesson: "📜 اللفافة السحرية: عندما نتحدث عن الماضي، يتحول الفعل! المفرد (I, He, She, It) يرتدون درع (Was). والجمع (We, They, You) يرتدون درع (Were)!",
        questions: [
          { q: "Yesterday, it _____ a dark night.", options: ["was", "were", "is"], a: "was" },
          { q: "They _____ inside the castle.", options: ["was", "were", "am"], a: "were" }
        ]
      }
    ]
  },
  {
    chapter: "2. وادي الفعل (Verb to DO)",
    branches: [
      {
        title: "المضارع: Do, Does",
        lesson: "📜 اللفافة السحرية: نستخدم (Verb to Do) للمساعدة في النفي والسؤال في المضارع. المفرد المشاكس (He, She, It) يحبون حرف S فيأخذون (Does). أما الباقي (I, We, They, You) فيأخذون (Do)!",
        questions: [
          { q: "_____ you want to fight?", options: ["Do", "Does", "Did"], a: "Do" },
          { q: "He _____ not like the monsters.", options: ["do", "does", "did"], a: "does" }
        ]
      },
      {
        title: "الماضي: Did",
        lesson: "📜 اللفافة السحرية: في الماضي، يتحد الجميع! كل الضمائر (المفرد والجمع) تستخدم سيفاً واحداً وقوياً وهو (Did) لنفي أو السؤال عن شيء حدث وانتهى.",
        questions: [
          { q: "_____ you see the dragon yesterday?", options: ["Do", "Does", "Did"], a: "Did" },
          { q: "I _____ not fail the mission.", options: ["do", "does", "did"], a: "did" }
        ]
      }
    ]
  },
  {
    chapter: "3. غابة الملكية (Verb to HAVE)",
    branches: [
      {
        title: "المضارع: Have, Has",
        lesson: "📜 اللفافة السحرية: نستخدمه للتعبير عن الملكية (عندي/لدي). المفرد (He, She, It) يأخذون الكلمة القصيرة (Has). والـ (I) مع الجمع (We, They, You) يأخذون الكلمة الطويلة (Have)!",
        questions: [
          { q: "I _____ a golden sword.", options: ["have", "has", "had"], a: "have" },
          { q: "The knight (He) _____ a strong shield.", options: ["have", "has", "had"], a: "has" }
        ]
      },
      {
        title: "الماضي: Had",
        lesson: "📜 اللفافة السحرية: عندما كان عندنا شيء في الماضي وضاع أو انتهى، نستخدم (Had) مع جميع الضمائر بدون استثناء!",
        questions: [
          { q: "We _____ a map, but we lost it.", options: ["have", "has", "had"], a: "had" },
          { q: "She _____ a pet dragon last year.", options: ["have", "has", "had"], a: "had" }
        ]
      }
    ]
  }
];
// ==========================================
// نهاية منطقة المنهج
// ==========================================

let cIdx = 0;
let bIdx = 0;
let qIdx = 0;
let needsLesson = true;

// قائمة الوحوش (تتغير مع كل درس جديد)
const monsters = ["🐉", "👾", "👹", "👻", "🦖", "🕷️", "🦂", "🦇"];
let currentMonsterHP = 100;

window.onload = () => {
  populateIndex();
  resetMonster();
};

function populateIndex() {
  const select = document.getElementById('lesson-index');
  select.innerHTML = '';
  syllabus.forEach((chap, cIndex) => {
    let optGroup = document.createElement('optgroup');
    optGroup.label = chap.chapter;
    chap.branches.forEach((branch, bIndex) => {
      let opt = document.createElement('option');
      opt.value = `${cIndex}-${bIndex}`;
      opt.innerText = branch.title;
      optGroup.appendChild(opt);
    });
    select.appendChild(optGroup);
  });
}

function jumpToLesson() {
  const val = document.getElementById('lesson-index').value;
  const [c, b] = val.split('-');
  cIdx = parseInt(c);
  bIdx = parseInt(b);
  qIdx = 0;
  needsLesson = true;
  resetMonster();
  showFeedback("ظهر وحش جديد! ⚠️");
}

function resetMonster() {
  const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
  const monsterEmoji = document.getElementById('monster-emoji');
  monsterEmoji.innerText = randomMonster;
  monsterEmoji.classList.remove('defeat-anim');
  currentMonsterHP = 100;
  document.getElementById('hp-bar-fill').style.width = '100%';
}

function drawQuestion() {
  if (cIdx >= syllabus.length) {
    alert("🏆 مبرووووك! لقد هزمت جميع وحوش الأفعال المساعدة وأنقذت مملكة القواعد!");
    return;
  }
  document.getElementById('lesson-index').value = `${cIdx}-${bIdx}`;
  if (needsLesson) showLessonUI(false);
  else showQuestion();
}

function showLessonUI(isRetry) {
  const branchData = syllabus[cIdx].branches[bIdx];
  document.getElementById('lesson-title').innerText = branchData.title;
  let textToShow = branchData.lesson;
  if (isRetry) {
    document.getElementById('lesson-title').innerText = "🛡️ صد الوحش هجومك!";
    textToShow = "اقرأ اللفافة السحرية لتعرف نقطة ضعفه:\n\n" + textToShow;
  }
  document.getElementById('lesson-text').innerText = textToShow;
  document.getElementById('lesson-section').classList.remove('hidden');
  document.getElementById('question-section').classList.add('hidden');
  document.getElementById('quiz-modal').classList.remove('hidden');
}

function showQuestion() {
  const chapterData = syllabus[cIdx];
  const branchData = chapterData.branches[bIdx];
  const questionData = branchData.questions[qIdx];
  document.getElementById('chapter-branch-label').innerText = `${chapterData.chapter} - ${branchData.title}`;
  document.getElementById('question-counter').innerText = `ضربة ${qIdx + 1} من ${branchData.questions.length}`;
  document.getElementById('question-text').innerText = questionData.q;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  questionData.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt, questionData.a);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('lesson-section').classList.add('hidden');
  document.getElementById('question-section').classList.remove('hidden');
  document.getElementById('quiz-modal').classList.remove('hidden');
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    document.getElementById('quiz-modal').classList.add('hidden');
    showFeedback("⚡ ضربة موجعة!");
    const hero = document.getElementById('hero');
    const monster = document.getElementById('monster-emoji');
    hero.classList.add('attack-anim');
    setTimeout(() => hero.classList.remove('attack-anim'), 500);
    setTimeout(() => {
      monster.classList.add('damage-anim');
      setTimeout(() => monster.classList.remove('damage-anim'), 500);
      const totalQuestionsInBranch = syllabus[cIdx].branches[bIdx].questions.length;
      const damage = 100 / totalQuestionsInBranch;
      currentMonsterHP -= damage;
      if (currentMonsterHP < 0) currentMonsterHP = 0;
      document.getElementById('hp-bar-fill').style.width = `${currentMonsterHP}%`;
      qIdx++;
      needsLesson = false;
      if (qIdx >= totalQuestionsInBranch) {
        monster.classList.add('defeat-anim');
        showFeedback("🎉 تم القضاء على الوحش!");
        setTimeout(() => {
          qIdx = 0;
          bIdx++;
          needsLesson = true;
          if (bIdx >= syllabus[cIdx].branches.length) {
            bIdx = 0;
            cIdx++;
          }
          if(cIdx < syllabus.length) {
            resetMonster();
          } else {
            drawQuestion(); // لطباعة رسالة الفوز النهائي عند انتهاء المصفوفة كاملة
          }
        }, 1500);
      }
    }, 250);
  } else {
    needsLesson = true;
    showLessonUI(true);
  }
}

function showFeedback(text) {
  const feedback = document.getElementById('feedback-message');
  feedback.innerText = text;
  feedback.classList.remove('hidden');
  feedback.style.animation = 'none';
  feedback.offsetHeight;
  feedback.style.animation = 'popIn 1.5s ease-out forwards';
}
