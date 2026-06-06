// ===========================
// NAVIGATION
// ===========================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// BRAND FILTER
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const brandCards = document.querySelectorAll('.brand-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    brandCards.forEach(card => {
      if (filter === 'all' || card.dataset.region === filter) {
        card.setAttribute('data-hidden', 'false');
      } else {
        card.setAttribute('data-hidden', 'true');
      }
    });
  });
});

// ===========================
// WHISKY DIAGNOSIS
// ===========================

const diagnosisData = {
  steps: [
    {
      id: 'mood',
      question: '今夜の気分は？',
      hint: '正直に選んでください。あなたの「今」がヒントです。',
      options: [
        { emoji: '🌊', label: 'どっしり、落ち着いていたい', sub: 'ゆっくり一人で飲みたい気分', value: 'calm' },
        { emoji: '🎉', label: 'ちょっと特別な夜にしたい', sub: 'お祝いや特別なシーンに', value: 'special' },
        { emoji: '🔥', label: '刺激的なものが飲みたい', sub: 'いつもと違う体験を', value: 'adventurous' },
        { emoji: '🌿', label: '爽やかに、軽やかに', sub: '食事と合わせたい', value: 'fresh' },
      ]
    },
    {
      id: 'taste',
      question: 'どんな味が好きですか？',
      hint: '普段の好みでOKです。',
      options: [
        { emoji: '🍯', label: '甘い・蜂蜜・バニラ系', sub: '口当たりがまろやか', value: 'sweet' },
        { emoji: '🏔️', label: 'スモーキー・ピート系', sub: 'クセが強くてもOK', value: 'smoky' },
        { emoji: '🍎', label: 'フルーティー・華やか', sub: 'ワインやフルーツが好き', value: 'fruity' },
        { emoji: '🌰', label: 'ナッツ・スパイシー・複雑', sub: '深みのある味わいが好き', value: 'complex' },
      ]
    },
    {
      id: 'experience',
      question: 'ウイスキー歴は？',
      hint: '正直に答えるほど、ぴったりの一本が見つかります。',
      options: [
        { emoji: '🌱', label: 'ほぼ初めて', sub: '飲みやすいものが嬉しい', value: 'beginner' },
        { emoji: '🥃', label: 'たまに飲む', sub: '好きな銘柄が少しある', value: 'casual' },
        { emoji: '🎓', label: 'けっこう詳しい', sub: '色々試してきた', value: 'experienced' },
        { emoji: '👑', label: 'マニアレベル', sub: 'レアものも知っている', value: 'expert' },
      ]
    },
  ],

  results: {
    // calm + sweet
    calm_sweet_beginner:   { name: 'グレンリベット 12年', origin: 'スコットランド / スペイサイド', reason: 'まろやかな蜂蜜とフルーツの甘さが特徴。刺激が少なく、落ち着いた夜にゆっくり飲むのにぴったりです。ウイスキー入門としても世界中で愛されている定番の一本。', tags: ['🍯 蜂蜜', '🌸 花の香り', '🍑 桃', '飲みやすい'] },
    calm_sweet_casual:     { name: 'グレンモーレンジィ 10年', origin: 'スコットランド / ハイランド', reason: 'バニラとオレンジピールが優しく広がる、エレガントなシングルモルト。落ち着いたひとときに、じっくりと香りを楽しんでほしい一本です。', tags: ['🍊 オレンジ', '🍦 バニラ', '🌼 花', 'エレガント'] },
    calm_sweet_experienced:{ name: 'バルヴェニー 14年 カリビアンカスク', origin: 'スコットランド / スペイサイド', reason: 'ラム樽でフィニッシュした贅沢な甘み。バナナ、トロピカルフルーツ、バニラが複雑に絡み合う。知識があるからこそ気づける奥深さがあります。', tags: ['🍌 バナナ', '🥥 トロピカル', '🍰 甘い', '複雑'] },
    calm_sweet_expert:     { name: 'グレンドロナック 18年', origin: 'スコットランド / ハイランド', reason: 'シェリー樽100%熟成の王道。チョコレート、ドライフルーツ、スパイスが豊かに絡み合う圧倒的な複雑さ。静かな夜に、一口一口を噛み締めてください。', tags: ['🍫 チョコ', '🍇 ドライフルーツ', '🌶️ スパイス', 'シェリー'] },
    // calm + smoky
    calm_smoky_beginner:   { name: 'ボウモア 12年', origin: 'スコットランド / アイラ', reason: 'アイラ産ながら比較的マイルドなスモーク。フルーツの甘さとピートが絶妙なバランスで、スモーキー入門に最適。落ち着いた夜に少量のwater dropで。', tags: ['🏔️ 軽スモーク', '🍑 フルーツ', '🌊 潮', '入門向け'] },
    calm_smoky_casual:     { name: 'タリスカー 10年', origin: 'スコットランド / アイランズ', reason: '海の潮風とコショウのようなスパイシーさ。スモークとフルーツのバランスが良く、飲むたびに「これだ」と思わせる個性派。焚き火の前で飲みたい一本。', tags: ['🌊 潮', '🌶️ ペッパー', '🔥 スモーク', '個性的'] },
    calm_smoky_experienced:{ name: 'ラガヴーリン 16年', origin: 'スコットランド / アイラ', reason: '圧倒的なピートスモーク、その奥にある深いシェリーの甘み。ウイスキーマニアが必ずたどり着く聖地のような一本。静かな夜、何も考えず飲んでほしい。', tags: ['💨 ヘビーピート', '🍇 シェリー', '🌊 潮', '究極'] },
    calm_smoky_expert:     { name: 'オクトモア 14.1', origin: 'スコットランド / アイラ', reason: '世界最強のピートウイスキー。その数値は世界記録級。しかし単なる「煙」ではなく、深い甘みと複雑さを併せ持つ。エキスパートのあなたへの挑戦状。', tags: ['💥 超ヘビーピート', '🍯 甘み', '希少', 'マニア向け'] },
    // special + fruity
    calm_fruity_beginner:  { name: 'ハイボール向け　角瓶', origin: '日本 / サントリー', reason: '日本が誇るブレンデッドウイスキーの代表格。ハイボールにすればフルーティーさが際立ち、食事とも合わせやすい。特別な夜の乾杯にも◎。', tags: ['🍋 軽快', '🍎 フルーツ', 'ハイボール向き', '食事に合う'] },
    calm_fruity_casual:    { name: 'グレンフィディック 12年', origin: 'スコットランド / スペイサイド', reason: '世界でもっとも売れているシングルモルト。洋ナシとクリーミーさが特徴で、フルーティーなウイスキーの教科書的存在。特別な夜の入り口として完璧。', tags: ['🍐 洋ナシ', '🍦 クリーミー', '世界No.1', '定番'] },
    calm_fruity_experienced:{ name: '山崎 12年', origin: '日本 / サントリー', reason: '日本ウイスキーの最高傑作のひとつ。ミズナラ樽由来のオリエンタルな香りと、繊細なフルーツの甘み。日本人の感性が生んだ唯一無二の一本。', tags: ['🌺 ミズナラ', '🍑 桃', '🍊 柑橘', '日本の誇り'] },
    calm_fruity_expert:    { name: '余市 シングルモルト', origin: '日本 / ニッカ', reason: '北海道の海風と石炭直火蒸留が生む、力強さと繊細さの共存。フルーティーでありながらどこか骨太。日本ウイスキーの奥深さをよく知るあなたに。', tags: ['🍇 フルーツ', '🔥 直火蒸留', '🌊 海風', '力強い'] },
    // special + complex
    calm_complex_beginner: { name: 'デュワーズ 12年', origin: 'スコットランド / ブレンデッド', reason: 'スムースで飲みやすく、それでいて深みがある優秀なブレンデッド。ナッツやドライフルーツが少し感じられ、複雑な味わいへの第一歩として最高の選択。', tags: ['🌰 ナッツ', '🍬 スムース', '飲みやすい', 'コスパ◎'] },
    calm_complex_casual:   { name: 'マッカラン 12年 シェリーオーク', origin: 'スコットランド / スペイサイド', reason: 'シェリー樽100%熟成のリッチな甘み。ドライフルーツ、チョコレート、スパイスが一口に凝縮。「ウイスキーのロールスロイス」と称される名品。', tags: ['🍫 チョコ', '🍇 ドライフルーツ', '🌶️ スパイス', 'リッチ'] },
    calm_complex_experienced:{ name: 'アベラワー アブナーハ', origin: 'スコットランド / スペイサイド', reason: 'バッチリリースのカスクストレングス。毎回微妙に異なる味わいが楽しめる限定品。シェリー樽の濃密な甘みと複雑さ。経験者こそ感動できる一本。', tags: ['💎 希少', '🍷 シェリー', '🌶️ スパイシー', 'カスクストレングス'] },
    calm_complex_expert:   { name: 'グレンファークラス 25年', origin: 'スコットランド / スペイサイド', reason: 'ファミリー経営の蒸留所が誇る長期熟成。25年の時が刻んだ複雑さは言葉を超えている。本物のシェリーボムを知るあなただけが気づける凄みがある。', tags: ['👑 長期熟成', '🍷 シェリーボム', '複雑', '伝統'] },
    // adventurous
    adventurous_sweet_beginner:   { name: 'バーボン　メーカーズマーク', origin: 'アメリカ / ケンタッキー', reason: '赤いワックスのキャップでおなじみ。甘く濃厚なバニラとキャラメル。強さの中に丸みがあり、バーボン入門として世界中で愛されています。', tags: ['🍮 キャラメル', '🍦 バニラ', 'バーボン', '飲みやすい'] },
    adventurous_smoky_beginner:   { name: 'アードベッグ ウーガダール', origin: 'スコットランド / アイラ', reason: 'スモークの強さの中に、驚くほどの甘さが隠れている。初めてアイラを試す冒険者にこそ飲んでほしい、衝撃と感動の一本。', tags: ['💨 スモーク', '🍫 チョコ', '⚡ 衝撃', 'アドベンチャー'] },
    adventurous_fruity_beginner:  { name: 'グレンモーレンジィ X by Hailee Steinfeld', origin: 'スコットランド / ハイランド', reason: 'コーラやフルーツを感じる遊び心あふれる新感覚。カクテルやソーダ割りで楽しめる、ウイスキーの新しい扉を開く一本。', tags: ['🍋 軽快', '🎵 モダン', 'カクテル向き', '新感覚'] },
    adventurous_complex_beginner: { name: 'ジェムソン', origin: 'アイルランド', reason: 'トリプルディスティルドのまろやかさと、スパイシーさのバランス。アイリッシュウイスキーの入口として世界一売れている理由がわかる、懐の深い一本。', tags: ['🌶️ スパイシー', '🍀 スムース', 'アイリッシュ', '人気No.1'] },
    // fresh
    fresh_sweet_beginner:   { name: 'サントリー 碧 Ao', origin: '日本 / サントリー', reason: '5大ウイスキー産地の原酒をブレンドした野心作。軽やかでフルーティー、どんな食事にも合う万能選手。食中酒としての日本ウイスキーの新提案。', tags: ['🌏 ワールドブレンド', '🍽️ 食中酒', '軽やか', '万能'] },
    fresh_sweet_casual:     { name: 'ニッカ フロム ザ バレル', origin: '日本 / ニッカ', reason: '小さなボトルに詰まった濃密さ。51度のカスクストレングスながら飲みやすく、コスパは世界最高レベル。世界が認めた日本ウイスキーの傑作。', tags: ['🇯🇵 日本', '💪 力強い', '🏆 コスパ最高', 'フルーティー'] },
    fresh_fruity_beginner:  { name: 'ホワイトホース 12年', origin: 'スコットランド / ブレンデッド', reason: '軽いスモークとフルーティーさが絶妙。ハイボールにすると最高のバランスになる、食事中に飲みたい爽やかな一本。', tags: ['🍺 ハイボール向き', '🍎 フルーティー', '軽スモーク', '食事に◎'] },
    fresh_smoky_casual:     { name: 'ベンロマック 10年', origin: 'スコットランド / スペイサイド', reason: '軽やかなスモークとフルーツの爽快感。「スペイサイドらしさ」と「アイラのスモーク」を両立した希少な存在。食事の友として活躍します。', tags: ['🌿 スペイサイド', '🔥 軽スモーク', '🍐 フルーツ', '食中酒'] },
  }
};

// Fallback result
const defaultResult = { name: 'グレンリベット 12年', origin: 'スコットランド / スペイサイド', reason: 'バランス良く飲みやすい、ウイスキーの王道中の王道。どんな答えにも寄り添ってくれる懐の深い一本です。まずはここから始めましょう。', tags: ['🍯 蜂蜜', '🌸 花の香り', '定番', '飲みやすい'] };

let answers = {};
let currentStep = 0;

function buildDiagnosis() {
  const container = document.getElementById('diagnosisSteps');
  const progressContainer = document.getElementById('diagnosisProgress');

  // Build progress dots
  diagnosisData.steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    dot.id = `dot-${i}`;
    progressContainer.appendChild(dot);
  });

  // Build steps
  diagnosisData.steps.forEach((step, i) => {
    const div = document.createElement('div');
    div.className = `diagnosis-step${i === 0 ? ' active' : ''}`;
    div.id = `step-${i}`;

    div.innerHTML = `
      <p class="diagnosis-question">${step.question}</p>
      <p class="diagnosis-hint">${step.hint}</p>
      <div class="diagnosis-options">
        ${step.options.map(opt => `
          <button class="diagnosis-option" onclick="selectOption('${step.id}', '${opt.value}', ${i})">
            <span class="option-emoji">${opt.emoji}</span>
            <span>
              <span class="option-label">${opt.label}</span>
              <span class="option-sub">${opt.sub}</span>
            </span>
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });

  updateProgress();
}

function selectOption(stepId, value, stepIndex) {
  answers[stepId] = value;

  const current = document.getElementById(`step-${stepIndex}`);
  current.classList.remove('active');

  document.getElementById(`dot-${stepIndex}`).classList.add('done');

  if (stepIndex + 1 < diagnosisData.steps.length) {
    currentStep = stepIndex + 1;
    document.getElementById(`step-${stepIndex + 1}`).classList.add('active');
    updateProgress();
  } else {
    showResult();
  }
}

function updateProgress() {
  // Already handled per click
}

function showResult() {
  document.getElementById('diagnosisSteps').style.display = 'none';
  document.getElementById('diagnosisProgress').style.display = 'none';

  const key = `${answers.mood}_${answers.taste}_${answers.experience}`;
  const result = diagnosisData.results[key] || defaultResult;

  const resultEl = document.getElementById('diagnosisResult');
  resultEl.innerHTML = `
    <div class="result-header">
      <span class="result-label">あなたへのおすすめ</span>
      <div class="result-whisky">${result.name}</div>
      <div class="result-origin">${result.origin}</div>
      <div class="result-divider"></div>
    </div>
    <div class="result-reason">${result.reason}</div>
    <div class="result-profile-title">FLAVOR PROFILE</div>
    <div class="result-tags">
      ${result.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="result-retry">
      <button class="btn-secondary" onclick="resetDiagnosis()">もう一度試す</button>
    </div>
  `;
  resultEl.classList.add('active');
}

function resetDiagnosis() {
  answers = {};
  currentStep = 0;

  document.getElementById('diagnosisResult').classList.remove('active');
  document.getElementById('diagnosisResult').innerHTML = '';

  const stepsContainer = document.getElementById('diagnosisSteps');
  stepsContainer.style.display = 'block';
  stepsContainer.innerHTML = '';

  const progressContainer = document.getElementById('diagnosisProgress');
  progressContainer.style.display = 'flex';
  progressContainer.innerHTML = '';

  buildDiagnosis();
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

const animTargets = document.querySelectorAll(
  '.step-card, .region-card, .cask-card, .distillery-card, .brand-card, .overview-card'
);

animTargets.forEach((el, i) => {
  // Stagger delay based on position within its parent grid
  const siblings = Array.from(el.parentElement.children);
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${idx * 80}ms`;
  el.classList.add('fade-up');
  observer.observe(el);
});

// Section headers fade in
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('fade-up');
  headerObserver.observe(el);
});

// Highlight current nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('nav-active');
  }
});

// ===========================
// INIT
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  buildDiagnosis();
});
