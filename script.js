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

// ===========================
// WHISKY DATABASE (35 distilleries)
// ===========================

const whiskyDB = [
  { name: 'グレンフィディック 12年', distillery: 'グレンフィディック', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['fruity', 'light', 'floral'], style: ['highball', 'rocks', 'straight'], minExp: 0, mood: ['fresh', 'special'], occasion: ['friends', 'meal', 'solo'], food: ['seafood', 'none', 'cheese'], reason: '世界で最も売れているシングルモルト。洋ナシとクリームの爽やかさが特徴で、どんな場面にも合わせやすい万能な一本。ウイスキー入門としても、経験者のデイリーとしても最適。', tags: ['🍐 洋ナシ', '🌿 軽やか', '🌍 世界No.1'] },
  { name: 'マッカラン 12年 シェリーオーク', distillery: 'マッカラン', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['sweet', 'complex', 'rich'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'special'], occasion: ['solo', 'special'], food: ['cheese', 'meat', 'none'], reason: 'ウイスキー界の「ロールスロイス」。シェリー樽由来のドライフルーツ、チョコレート、スパイスが複雑に絡み合う。特別な夜、ゆっくり一口ずつ楽しみたい贅沢な一本。', tags: ['🍫 チョコ', '🍇 ドライフルーツ', '👑 高級'] },
  { name: 'グレンリベット 12年', distillery: 'グレンリベット', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['fruity', 'sweet', 'light'], style: ['highball', 'rocks', 'straight'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends', 'solo'], food: ['seafood', 'none', 'cheese'], reason: '蜂蜜と花の香りが爽やかに広がる、スペイサイドの優等生。スムースで飲みやすく食事との相性も抜群。初めてシングルモルトを試す方への最初の一本として世界中で推薦されている。', tags: ['🍯 蜂蜜', '🌸 フローラル', '✨ 入門定番'] },
  { name: 'バルヴェニー 14年 カリビアンカスク', distillery: 'バルヴェニー', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['sweet', 'fruity', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['special', 'calm'], occasion: ['solo', 'special', 'friends'], food: ['sweets', 'cheese', 'none'], reason: 'ラム樽でフィニッシュした贅沢な甘み。バナナ、トロピカルフルーツ、バニラが優しく絡み合う。職人気質の蒸留所が手間を惜しまず作り上げた、甘党のウイスキー好きには堪らない一本。', tags: ['🍌 トロピカル', '🍯 蜂蜜', '🔨 職人気質'] },
  { name: 'アベラワー 12年', distillery: 'アベラワー', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['sweet', 'complex', 'rich'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'special'], occasion: ['solo', 'friends'], food: ['cheese', 'meat', 'none'], reason: 'シェリー樽とバーボン樽を組み合わせた実力派。チョコレートとドライフルーツのリッチな甘みと心地よいスパイス感。コスパも優れた隠れた名品。', tags: ['🍫 チョコ', '🍇 シェリー感', '💰 コスパ優秀'] },
  { name: 'グレンアーラヒー 12年', distillery: 'グレンアーラヒー', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['complex', 'rich', 'sweet'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'adventurous'], occasion: ['solo', 'friends'], food: ['cheese', 'meat', 'none'], reason: '近年急速に注目を集めるスペイサイドの新星。多彩なシェリー樽を使いこなす職人技が光る。濃密なリッチさの中に複雑な層があり、飲むたびに新たな発見がある。', tags: ['🍇 シェリー感', '🔥 リッチ', '🚀 注目株'] },
  { name: 'グレンファークラス 12年', distillery: 'グレンファークラス', origin: 'スコットランド / スペイサイド', region: 'scotch', flavor: ['complex', 'rich', 'sweet'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'special'], occasion: ['solo', 'special'], food: ['cheese', 'meat', 'none'], reason: '6代続く家族経営の蒸留所が守り続けるシェリー樽100%熟成の伝統。甘く濃密なシェリーボムは正統派。独立系であることへの誇りが酒質に滲み出る本物好きのための一本。', tags: ['🍇 シェリー感', '🔥 リッチ', '🏠 家族経営'] },
  { name: 'グレンモーレンジィ 10年', distillery: 'グレンモーレンジィ', origin: 'スコットランド / ハイランド', region: 'scotch', flavor: ['floral', 'fruity', 'light'], style: ['straight', 'rocks', 'highball'], minExp: 0, mood: ['calm', 'fresh', 'special'], occasion: ['solo', 'friends', 'meal'], food: ['seafood', 'cheese', 'none'], reason: 'バニラとオレンジピールが優しく広がる、エレガントなハイランドモルト。蒸留所の長いネックスチルが生む繊細な軽さと、バーボン樽由来の甘さが絶妙。食中酒としても優秀。', tags: ['🌸 エレガント', '🍊 柑橘', '🪄 多彩'] },
  { name: 'ダルモア 12年', distillery: 'ダルモア', origin: 'スコットランド / ハイランド', region: 'scotch', flavor: ['sweet', 'rich', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'special'], occasion: ['solo', 'special'], food: ['cheese', 'meat', 'sweets'], reason: '鹿のエンブレムが象徴する貫禄あるハイランドモルト。オレンジピール、チョコレート、スパイスが融合した豊かな風味。格調あるパッケージと共に、贈り物にも最適。', tags: ['🍫 チョコ', '🍊 オレンジ', '👑 貫禄'] },
  { name: 'ロッホローモンド オリジナル', distillery: 'ロッホローモンド', origin: 'スコットランド / ハイランド', region: 'scotch', flavor: ['light', 'fruity'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends'], food: ['seafood', 'meat', 'none'], reason: '独自の蒸留設備で多彩なスタイルを生み出す実験的な蒸留所。軽やかでクリーン、食事との相性が良い飲みやすいスタイル。コスパも高く、デイリーウイスキーとして活躍する一本。', tags: ['🌿 軽やか', '🌊 クリーン', '💰 コスパ'] },
  { name: 'ラガヴーリン 16年', distillery: 'ラガヴーリン', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['smoky', 'complex', 'rich'], style: ['straight', 'rocks'], minExp: 2, mood: ['calm', 'adventurous'], occasion: ['solo'], food: ['meat', 'cheese', 'none'], reason: 'アイラの聖地が生む、圧倒的なピートスモークとシェリーの深み。複雑さと強さの完璧な融合は、ウイスキーマニアが必ずたどり着く境地。静かな夜にじっくりと向き合いたい伝説の一本。', tags: ['💨 ヘビーピート', '🍇 シェリー', '🏆 伝説的'] },
  { name: 'アードベッグ 10年', distillery: 'アードベッグ', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['smoky', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['adventurous', 'calm'], occasion: ['solo', 'friends'], food: ['meat', 'seafood', 'none'], reason: 'スモークの奥に潜むチョコレートとコーヒー。単なる「煙い」では語れない複雑な味わいが世界中のウイスキーファンを熱狂させる。アードベッグを知ることはアイラを知ること。', tags: ['🔥 超スモーキー', '☕ コーヒー', '🎸 カルト的'] },
  { name: 'ラフロイグ 10年', distillery: 'ラフロイグ', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['smoky', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['adventurous', 'calm'], occasion: ['solo'], food: ['seafood', 'meat', 'none'], reason: '英国王室御用達の称号を持つアイラの王者。ヨード香と潮風を纏った強烈なスモーク、その奥に甘みがある唯一無二の個性。「これを好きになれれば本物のウイスキー好きだ」という声もある。', tags: ['🔥 強烈スモーク', '💊 ヨード', '👑 王室御用達'] },
  { name: 'ボウモア 12年', distillery: 'ボウモア', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['smoky', 'fruity', 'light'], style: ['straight', 'rocks', 'highball'], minExp: 0, mood: ['adventurous', 'calm', 'fresh'], occasion: ['solo', 'friends'], food: ['seafood', 'meat', 'none'], reason: 'スモーキーとフルーティーを両立させたアイラの橋渡し役。海沿いの倉庫で熟成する潮風の香りと意外な花やかさ。アイラウイスキー入門として世界中で愛されている。', tags: ['🔥 スモーキー', '🌸 フローラル', '⚖️ バランス'] },
  { name: 'ブルイックラディ クラシックラディ', distillery: 'ブルイックラディ', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['light', 'fruity', 'floral'], style: ['straight', 'rocks', 'highball'], minExp: 0, mood: ['fresh', 'adventurous'], occasion: ['friends', 'meal'], food: ['seafood', 'cheese', 'none'], reason: 'ピートを使わない「アンピーテッド」アイラの異端児。テロワールを重視したクリーンで繊細な味わいは、アイラ＝スモーキーの常識を覆す。革新的なスタイルが新たなファンを獲得し続けている。', tags: ['🌿 クリーン', '🧪 革新的', '🌊 アイラ'] },
  { name: 'カリラ 12年', distillery: 'カリラ', origin: 'スコットランド / アイラ', region: 'scotch', flavor: ['smoky', 'fruity'], style: ['straight', 'rocks', 'highball'], minExp: 1, mood: ['adventurous', 'fresh'], occasion: ['solo', 'friends', 'meal'], food: ['seafood', 'meat', 'none'], reason: 'ジュラ海峡を望む絶景の地に建つ蒸留所。スモーキーでありながらフルーティーさも持ち合わせ、潮風が香る独特の個性がある。ハイボールにしても美味しく、幅広い場面で楽しめる。', tags: ['🔥 スモーキー', '🌊 潮風', '🍑 フルーティー'] },
  { name: 'タリスカー 10年', distillery: 'タリスカー', origin: 'スコットランド / アイランズ', region: 'scotch', flavor: ['smoky', 'complex', 'spicy'], style: ['straight', 'rocks'], minExp: 1, mood: ['adventurous', 'calm'], occasion: ['solo', 'friends'], food: ['seafood', 'meat', 'none'], reason: 'スカイ島の荒々しい自然が凝縮された、海と火のウイスキー。潮風、コショウ、スモークが三位一体となった爆発的な余韻。一度飲んだら忘れられない個性を持つ。', tags: ['🔥 スモーキー', '🌊 潮風', '🌶️ スパイシー'] },
  { name: 'ハイランドパーク 12年', distillery: 'ハイランドパーク', origin: 'スコットランド / オークニー', region: 'scotch', flavor: ['sweet', 'smoky', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'adventurous', 'special'], occasion: ['solo', 'friends'], food: ['meat', 'cheese', 'none'], reason: '蜂蜜の甘みとピートスモークが見事に共存するオークニー島の傑作。バイキングの魂を受け継ぐ骨太な個性と、意外なほどのエレガントさが共存。スモーキーと甘みの両方を楽しみたい方に。', tags: ['🍯 蜂蜜', '🔥 スモーキー', '⚔️ バイキング'] },
  { name: 'アラン 10年', distillery: 'アラン', origin: 'スコットランド / アラン島', region: 'scotch', flavor: ['fruity', 'sweet', 'light'], style: ['straight', 'rocks', 'highball'], minExp: 0, mood: ['fresh', 'calm', 'special'], occasion: ['friends', 'meal', 'solo'], food: ['seafood', 'none', 'cheese'], reason: '美しいアラン島で生まれる、果実味豊かで華やかなシングルモルト。若い蒸留所ながらすでに高い評価を得ており、コスパの良さでも人気。フルーティーなウイスキーの理想形のひとつ。', tags: ['🍑 フルーティー', '🌸 華やか', '💎 コスパ優秀'] },
  { name: 'オーヘントッシャン アメリカンオーク', distillery: 'オーヘントッシャン', origin: 'スコットランド / ローランド', region: 'scotch', flavor: ['light', 'sweet', 'floral'], style: ['highball', 'mizuwari', 'rocks'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends'], food: ['seafood', 'none', 'cheese'], reason: '3回蒸留によって生まれる、スコッチ屈指の軽やかさ。バニラとシトラスの爽やかな香り、クリーンな口当たりは食事を選ばない。ウイスキーが苦手な方でも楽しめる入門的な一本。', tags: ['🌸 フローラル', '🌿 軽やか', '🔄 3回蒸留'] },
  { name: '山崎 12年', distillery: '山崎', origin: '日本 / サントリー', region: 'japanese', flavor: ['fruity', 'sweet', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['calm', 'special'], occasion: ['solo', 'special', 'friends'], food: ['seafood', 'meat', 'none'], reason: '日本ウイスキーの象徴。ミズナラ樽由来のオリエンタルな香りと、繊細なフルーツの甘み。日本人の感性が生んだ唯一無二の味わいは、世界の品評会で幾度も頂点を極めてきた。', tags: ['🌺 白檀', '🍯 甘み', '👑 日本No.1'] },
  { name: '白州 12年', distillery: '白州', origin: '日本 / サントリー', region: 'japanese', flavor: ['fruity', 'light', 'floral'], style: ['highball', 'rocks', 'straight'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends', 'solo'], food: ['seafood', 'none', 'meat'], reason: '南アルプスの森に囲まれた蒸留所が生む緑豊かな爽やかさ。青リンゴ、ミント、柑橘の爽快な香りはハイボールで真価を発揮する。食中酒として、また休日の昼間にも似合う一本。', tags: ['🌿 森の香り', '🍃 爽やか', '💨 清涼感'] },
  { name: '知多', distillery: '知多', origin: '日本 / サントリー', region: 'japanese', flavor: ['light', 'sweet'], style: ['highball', 'mizuwari'], minExp: 0, mood: ['fresh'], occasion: ['meal', 'friends'], food: ['seafood', 'none'], reason: '知多半島の蒸留所が生む、繊細で上品な日本のグレーンウイスキー。バニラと蜂蜜の優しい甘み、軽やかな口当たり。ハイボールにすると食事を引き立てる最高のパートナーになる。', tags: ['🌾 グレーン', '🌿 軽やか', '🍽️ 食中酒'] },
  { name: '余市 シングルモルト', distillery: '余市', origin: '日本 / ニッカ', region: 'japanese', flavor: ['smoky', 'complex', 'rich'], style: ['straight', 'rocks'], minExp: 2, mood: ['calm', 'adventurous'], occasion: ['solo'], food: ['meat', 'seafood', 'none'], reason: '北海道の海と石炭直火蒸留が生む、力強さと繊細さの共存。スコッチのような骨太なピートと日本ウイスキーらしい繊細さが同居する。ニッカ創業者・竹鶴政孝の魂が宿る一本。', tags: ['💪 力強い', '🔥 直火蒸留', '❄️ 北海道'] },
  { name: '宮城峡 シングルモルト', distillery: '宮城峡', origin: '日本 / ニッカ', region: 'japanese', flavor: ['fruity', 'sweet', 'light'], style: ['straight', 'rocks', 'highball'], minExp: 1, mood: ['calm', 'fresh'], occasion: ['solo', 'friends', 'meal'], food: ['seafood', 'none', 'cheese'], reason: '仙台近郊の峡谷に佇む蒸留所が生む、華やかで柔らかな個性。林檎や洋ナシのフルーティーさとバニラの甘み。余市とは対照的な優しい味わいで、飲みやすさと奥深さを両立している。', tags: ['🍑 フルーティー', '🌸 柔らか', '🏔️ 峡谷'] },
  { name: '秩父 ザ・フロアモルテッド', distillery: '秩父', origin: '日本 / ベンチャーウイスキー', region: 'japanese', flavor: ['complex', 'rich', 'smoky'], style: ['straight', 'rocks'], minExp: 2, mood: ['adventurous', 'special'], occasion: ['solo', 'friends'], food: ['meat', 'cheese', 'none'], reason: '日本クラフトウイスキーの先駆け。自家製フロアモルティングで丁寧に作られた麦芽から生まれる力強くも複雑な味わい。生産量が少なく入手困難だが、出会えたなら必ず試してほしい一本。', tags: ['🌾 フロアモルティング', '💎 希少', '🔥 個性的'] },
  { name: '長濱 ニューボーン', distillery: '長濱', origin: '日本 / 長濱浪漫ビール', region: 'japanese', flavor: ['light', 'fruity'], style: ['straight', 'rocks', 'highball'], minExp: 1, mood: ['adventurous', 'fresh'], occasion: ['friends', 'solo'], food: ['none', 'seafood'], reason: '滋賀・長濱の小さなクラフト蒸留所が生む若々しい個性。ニューボーンならではのフレッシュなフルーツ感と、日本の繊細な水が育てる清涼感。クラフトウイスキーの楽しさを体感できる一本。', tags: ['🌊 クリーン', '🔧 小規模', '✨ クラフト'] },
  { name: 'バッファロートレース バーボン', distillery: 'バッファロートレース', origin: 'アメリカ / ケンタッキー', region: 'bourbon', flavor: ['sweet', 'complex', 'rich'], style: ['straight', 'rocks', 'highball'], minExp: 0, mood: ['calm', 'special', 'adventurous'], occasion: ['solo', 'friends', 'special'], food: ['meat', 'none', 'sweets'], reason: '200年以上の歴史を持つ名門蒸留所の看板商品。バニラ、蜂蜜、キャラメルの豊かな甘みとオーク由来のスパイス感が見事なバランス。バーボンの入門から上級者まで満足させる懐の深さがある。', tags: ['🍦 バニラ', '🍯 蜂蜜', '📜 歴史的'] },
  { name: 'ワイルドターキー 8年', distillery: 'ワイルドターキー', origin: 'アメリカ / ケンタッキー', region: 'bourbon', flavor: ['complex', 'spicy', 'rich'], style: ['straight', 'rocks'], minExp: 1, mood: ['adventurous', 'calm'], occasion: ['solo', 'friends'], food: ['meat', 'none'], reason: '高ライ麦比率が生む骨太なスパイシーさが代名詞。アルコール度数高めでも意外なほど飲みやすく、バーボン好きの心を掴んで離さない。「これぞバーボン」という力強さを求める方に。', tags: ['💪 力強い', '🌶️ スパイシー', '🌾 高ライ麦'] },
  { name: 'IW ハーパー 12年', distillery: 'バーンハイム', origin: 'アメリカ / ケンタッキー', region: 'bourbon', flavor: ['sweet', 'light'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends'], food: ['meat', 'none'], reason: '日本市場向けに長年親しまれてきたマイルドなバーボン。12年熟成によるまろやかなバニラと蜂蜜の甘み。クセが少なく飲みやすい。ハイボールにすると誰でも楽しめる食中酒になる。', tags: ['🍦 バニラ', '🍬 スムース', '🇯🇵 日本でお馴染み'] },
  { name: 'ジャックダニエル オールドNo.7', distillery: 'ジャックダニエル', origin: 'アメリカ / テネシー', region: 'bourbon', flavor: ['sweet', 'light'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'adventurous'], occasion: ['friends', 'meal'], food: ['meat', 'none'], reason: '世界で最も知名度の高いウイスキーのひとつ。チャコール濾過による独特のスムースさが生み出すクリーンな甘み。どんな場面でも場を和ませてくれる、万国共通の言語のような一本。', tags: ['🍬 スムース', '🔥 チャコール濾過', '🌍 世界的知名度'] },
  { name: 'ブッシュミルズ オリジナル', distillery: 'ブッシュミルズ', origin: 'アイルランド / 北アイルランド', region: 'irish', flavor: ['light', 'sweet', 'fruity'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['meal', 'friends', 'solo'], food: ['seafood', 'none', 'cheese'], reason: '世界最古のウイスキー蒸留所のひとつが誇るスムースな一本。3回蒸留によるアイリッシュらしい軽やかさと麦芽の甘み。飲みやすく誰にでも親しみやすい、アイルランドの代名詞。', tags: ['🌿 スムース', '🌸 軽やか', '📜 世界最古級'] },
  { name: 'ジェムソン スタンダード', distillery: 'ミドルトン', origin: 'アイルランド / コーク', region: 'irish', flavor: ['light', 'sweet', 'fruity'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'adventurous'], occasion: ['friends', 'meal'], food: ['none', 'seafood', 'meat'], reason: 'アイリッシュウイスキーで世界一売れているブランド。トリプルディスティルドのまろやかさとスパイスのバランスが絶妙。カクテルベースとしても優秀で、バーでの一杯目に最適。', tags: ['🍑 フルーティー', '🌿 スムース', '🏆 世界No.1'] },
  { name: 'バスカー アイリッシュ ウイスキー', distillery: 'ロイヤルオーク', origin: 'アイルランド / ティペラリー', region: 'irish', flavor: ['light', 'sweet', 'fruity'], style: ['highball', 'rocks', 'mizuwari'], minExp: 0, mood: ['fresh', 'calm'], occasion: ['friends', 'meal'], food: ['none', 'seafood'], reason: 'ロイヤルオーク蒸留所から生まれたフレッシュなアイリッシュウイスキー。バニラ、蜂蜜、フルーツの軽やかな甘みが心地よい。コスパが高く、アイリッシュ入門として注目を集めている。', tags: ['🍑 フルーティー', '🌿 スムース', '✨ 新星ブランド'] },
  { name: 'カバラン ソリスト バーボン', distillery: 'カバラン', origin: '台湾 / 宜蘭県', region: 'other', flavor: ['sweet', 'fruity', 'rich', 'complex'], style: ['straight', 'rocks'], minExp: 1, mood: ['special', 'adventurous'], occasion: ['solo', 'special', 'friends'], food: ['sweets', 'cheese', 'none'], reason: '台湾の亜熱帯気候が生む急速熟成の奇跡。トロピカルフルーツと濃密な甘みが溢れ出す。世界の品評会で欧州の名蒸留所を凌ぐ評価を得た、アジアが誇る傑作。', tags: ['🍑 トロピカル', '🍯 濃密', '🏆 受賞多数'] },
];

// ===========================
// SCORING ENGINE
// ===========================

const flavorMap = {
  sweet:   ['sweet', 'floral', 'light'],
  smoky:   ['smoky'],
  fruity:  ['fruity', 'light', 'floral'],
  complex: ['complex', 'rich', 'spicy'],
};
const expMap = { beginner: 0, casual: 1, experienced: 2, expert: 3 };

function scoreWhisky(w, answers) {
  let score = 0;

  // 味の好み（最重要・weight 3）
  if (answers.taste) {
    const favored = flavorMap[answers.taste] || [];
    score += w.flavor.filter(f => favored.includes(f)).length * 3;
  }

  // 飲み方（weight 2）— おまかせはスキップ
  if (answers.style && answers.style !== 'any' && w.style.includes(answers.style)) score += 2;

  // 経験値（weight 2）— 上級すぎるものは大幅ペナルティ
  if (answers.exp) {
    const userExp = expMap[answers.exp] ?? 0;
    score += w.minExp <= userExp ? 2 : -4;
  }

  // 気分（weight 1）
  if (answers.mood && w.mood.includes(answers.mood)) score += 1;

  // 場面（weight 1）
  if (answers.occasion && w.occasion.includes(answers.occasion)) score += 1;

  // 食事（weight 2）
  if (answers.food && w.food.includes(answers.food)) score += 2;

  // 産地（weight 2）
  if (answers.region && answers.region !== 'any' && w.region === answers.region) score += 2;

  // アルコール強さ（weight 2）
  if (answers.strength && answers.strength !== 'any') {
    if (answers.strength === 'light' && w.minExp === 0 && w.flavor.includes('light')) score += 2;
    else if (answers.strength === 'medium' && w.minExp <= 1) score += 1;
    else if (answers.strength === 'strong' && (w.minExp >= 1 || w.flavor.some(f => ['rich','complex','spicy'].includes(f)))) score += 2;
  }

  // 甘さの感じ方（weight 2）
  if (answers.sweetness && answers.sweetness !== 'any') {
    if (answers.sweetness === 'rich_sweet' && w.flavor.some(f => ['sweet','rich'].includes(f))) score += 2;
    else if (answers.sweetness === 'natural_sweet' && w.flavor.some(f => ['fruity','floral','light'].includes(f))) score += 2;
    else if (answers.sweetness === 'dry' && !w.flavor.includes('sweet') && !w.flavor.includes('rich')) score += 2;
  }

  // スモーキーさ（weight 3）
  if (answers.smoke && answers.smoke !== 'any') {
    const isSmoky = w.flavor.includes('smoky');
    if (answers.smoke === 'none' && !isSmoky) score += 3;
    else if (answers.smoke === 'heavy' && isSmoky) score += 3;
    else if (answers.smoke === 'light' && !isSmoky) score += 1; // ほのかなら非スモーキーが無難
    else if (answers.smoke !== 'none' && isSmoky) score -= 2; // 不一致ペナルティ
  }

  // 飲む時間・量（weight 1）
  if (answers.time && answers.time !== 'any') {
    if (answers.time === 'light' && w.flavor.includes('light')) score += 1;
    else if (answers.time === 'slow' && (w.flavor.includes('complex') || w.flavor.includes('rich'))) score += 1;
    else if (answers.time === 'party' && (w.style.includes('highball') || w.style.includes('mizuwari'))) score += 1;
  }

  return score;
}

function getTopN(answers, n = 3) {
  return [...whiskyDB]
    .map(w => ({ ...w, score: scoreWhisky(w, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

function extractFromText(text) {
  const t = text;
  const ans = {};
  if (/スモーキー|ピート|煙|スモーク/.test(t))           ans.taste = 'smoky';
  else if (/複雑|深み|スパイス|リッチ|濃い/.test(t))     ans.taste = 'complex';
  else if (/甘[いき]|バニラ|蜂蜜|はちみつ|キャラメル/.test(t)) ans.taste = 'sweet';
  else if (/フルーティー|フルーツ|華やか|花|フローラル/.test(t)) ans.taste = 'fruity';

  if (/ハイボール/.test(t))          ans.style = 'highball';
  else if (/水割り|みずわり/.test(t)) ans.style = 'mizuwari';
  else if (/ロック/.test(t))          ans.style = 'rocks';
  else if (/ストレート/.test(t))      ans.style = 'straight';

  if (/初心者|初めて|入門|飲みやす/.test(t)) ans.exp = 'beginner';
  else if (/マニア|上級|エキスパート/.test(t)) ans.exp = 'expert';
  else if (/詳し|いろいろ|何本/.test(t))      ans.exp = 'experienced';

  if (/特別|お祝い|記念|プレゼント|ギフト/.test(t)) ans.mood = 'special';
  else if (/冒険|挑戦|刺激/.test(t))              ans.mood = 'adventurous';
  else if (/爽やか|軽やか|さっぱり/.test(t))       ans.mood = 'fresh';
  else if (/落ち着|ゆっくり|静か/.test(t))         ans.mood = 'calm';

  if (/食事|料理|ご飯|つまみ/.test(t))    ans.occasion = 'meal';
  else if (/友人|仲間|みんな|パーティ/.test(t)) ans.occasion = 'friends';
  else if (/特別|記念|お祝い/.test(t))        ans.occasion = 'special';
  else if (/一人|ひとり|独り/.test(t))        ans.occasion = 'solo';

  if (/肉|ステーキ|焼き鳥|BBQ/.test(t))   ans.food = 'meat';
  else if (/魚|刺身|寿司|海産/.test(t))   ans.food = 'seafood';
  else if (/チーズ/.test(t))              ans.food = 'cheese';
  else if (/チョコ|スイーツ|甘いもの/.test(t)) ans.food = 'sweets';

  if (/スコッチ|スコットランド/.test(t))    ans.region = 'scotch';
  else if (/日本|ジャパニーズ|国産/.test(t)) ans.region = 'japanese';
  else if (/バーボン|アメリカン?/.test(t))  ans.region = 'bourbon';
  else if (/アイリッシュ|アイルランド/.test(t)) ans.region = 'irish';

  return ans;
}

// ===========================
// DIAGNOSIS UI
// ===========================

const simpleQuestions = [
  { id: 'mood', question: '今夜の気分は？', hint: '正直に選ぶほど、ぴったりの一本が見つかります。', options: [
    { emoji: '🌊', label: 'どっしり、落ち着いて', sub: 'ゆっくり一人で飲みたい', value: 'calm' },
    { emoji: '🎉', label: '特別な夜にしたい', sub: 'お祝いや記念日に', value: 'special' },
    { emoji: '🔥', label: '刺激的なものを飲みたい', sub: 'いつもと違う体験を', value: 'adventurous' },
    { emoji: '🌿', label: '軽やかに、爽やかに', sub: '食事と合わせたい', value: 'fresh' },
  ]},
  { id: 'taste', question: '好みの味は？', hint: '普段の好みでOK。ウイスキー以外で考えてもいいです。', options: [
    { emoji: '🍯', label: '甘い・蜂蜜・バニラ系', sub: 'まろやかで口当たりが柔らか', value: 'sweet' },
    { emoji: '🏔️', label: 'スモーキー・ピート系', sub: '個性的なクセが好き', value: 'smoky' },
    { emoji: '🍎', label: 'フルーティー・華やか', sub: 'フルーツや花の香りが好き', value: 'fruity' },
    { emoji: '🌰', label: '複雑・深み・スパイス系', sub: '多層的な味わいを楽しみたい', value: 'complex' },
  ]},
  { id: 'style', question: '今夜の飲み方は？', hint: 'ウイスキーの味わいが最も変わる要素のひとつ。', options: [
    { emoji: '🥃', label: 'ストレート', sub: '原液そのままを楽しむ', value: 'straight' },
    { emoji: '🧊', label: 'ロック', sub: '氷で少し冷やして', value: 'rocks' },
    { emoji: '🍺', label: 'ハイボール', sub: '炭酸水で割って爽やかに', value: 'highball' },
    { emoji: '💧', label: '水割り', sub: 'ゆっくりまろやかに', value: 'mizuwari' },
    { emoji: '🎲', label: 'おまかせ', sub: 'ウイスキーに合わせる', value: 'any' },
  ]},
  { id: 'occasion', question: '今夜のシーンは？', hint: '場面によって最適な一本は変わります。', options: [
    { emoji: '🪑', label: 'ひとりでゆっくり', sub: '自分だけの時間を楽しむ', value: 'solo' },
    { emoji: '👥', label: '友人・仲間と', sub: 'みんなで楽しみたい', value: 'friends' },
    { emoji: '✨', label: '特別なシーンで', sub: '記念日・贈り物・デート', value: 'special' },
    { emoji: '🍽️', label: '食事と一緒に', sub: '料理の味を引き立てたい', value: 'meal' },
  ]},
  { id: 'exp', question: 'ウイスキー歴は？', hint: '正直に答えるほど、ぴったりの一本が見つかります。', options: [
    { emoji: '🌱', label: 'ほぼ初めて', sub: '飲みやすいものが嬉しい', value: 'beginner' },
    { emoji: '🥃', label: 'たまに飲む', sub: '好きな銘柄が少しある', value: 'casual' },
    { emoji: '🎓', label: 'けっこう詳しい', sub: '色々試してきた', value: 'experienced' },
    { emoji: '👑', label: 'マニアレベル', sub: 'レアものも知っている', value: 'expert' },
  ]},
];

const fullQuestions = [
  ...simpleQuestions,
  { id: 'food', question: '一緒に食べるものは？', hint: '食事との相性でウイスキーの味わいが大きく変わります。', options: [
    { emoji: '🥩', label: '肉料理・BBQ', sub: 'ステーキ・焼き鳥・ジビエ', value: 'meat' },
    { emoji: '🐟', label: '魚・海産物', sub: '刺身・寿司・魚介料理', value: 'seafood' },
    { emoji: '🧀', label: 'チーズ・おつまみ', sub: 'チーズ・ナッツ・生ハム', value: 'cheese' },
    { emoji: '🍫', label: 'スイーツ・チョコ', sub: 'デザート・チョコレート', value: 'sweets' },
  ]},
  { id: 'region', question: '産地の好みは？', hint: '特定の産地にこだわりがある場合は選んでください。', options: [
    { emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', label: 'スコッチ', sub: 'スコットランドのウイスキー', value: 'scotch' },
    { emoji: '🇯🇵', label: 'ジャパニーズ', sub: '日本のウイスキー', value: 'japanese' },
    { emoji: '🇺🇸', label: 'バーボン／アメリカン', sub: 'アメリカのウイスキー', value: 'bourbon' },
    { emoji: '🌍', label: 'こだわらない', sub: '世界中から最適な一本を', value: 'any' },
  ]},
  { id: 'strength', question: 'アルコールの強さは？', hint: 'ウイスキー全般のアルコール度数は40〜65度程度。好みを教えてください。', options: [
    { emoji: '🌱', label: '飲みやすさ重視', sub: '度数は低めがいい', value: 'light' },
    { emoji: '⚖️', label: 'ほどほどがいい', sub: '強すぎず弱すぎず', value: 'medium' },
    { emoji: '💪', label: 'パンチが欲しい', sub: '度数高めでもOK', value: 'strong' },
    { emoji: '🎲', label: 'おまかせ', sub: 'こだわらない', value: 'any' },
  ]},
  { id: 'sweetness', question: '甘さの感じ方は？', hint: 'ウイスキーの甘さに対する好みを選んでください。', options: [
    { emoji: '🍭', label: 'しっかり甘いのが好き', sub: 'バニラ・蜂蜜・チョコ系', value: 'rich_sweet' },
    { emoji: '🍑', label: '自然な甘みが好き', sub: 'フルーツや花の甘さ', value: 'natural_sweet' },
    { emoji: '🌿', label: '甘さは控えめがいい', sub: 'ドライ・辛口寄りが好み', value: 'dry' },
    { emoji: '🎲', label: 'どちらでもいい', sub: 'こだわらない', value: 'any' },
  ]},
  { id: 'smoke', question: 'スモーキーさへの好みは？', hint: 'ピート（泥炭）由来のスモーキーな香りについて。', options: [
    { emoji: '🌸', label: 'スモークなしが好き', sub: '華やか・フルーティー系', value: 'none' },
    { emoji: '🔥', label: '少しだけでいい', sub: 'ほのかな燻香が好き', value: 'light' },
    { emoji: '💨', label: 'しっかりスモーキーがいい', sub: '個性的なクセが好き', value: 'heavy' },
    { emoji: '🎲', label: 'おまかせ', sub: 'こだわらない', value: 'any' },
  ]},
  { id: 'time', question: '今夜はどのくらい飲みますか？', hint: '飲む量やペースで最適な一本が変わります。', options: [
    { emoji: '🥂', label: '1〜2杯さらっと', sub: '軽く楽しみたい', value: 'light' },
    { emoji: '🕐', label: 'ゆっくり長く楽しみたい', sub: '2〜3時間かけて飲む', value: 'slow' },
    { emoji: '🎉', label: 'みんなでたくさん飲む', sub: '盛り上がりたい', value: 'party' },
    { emoji: '🎲', label: 'おまかせ', sub: 'こだわらない', value: 'any' },
  ]},
];

let diagMode = null;
let diagAnswers = {};
let diagStep = 0;
let diagQuestions = [];

function initDiagnosis() {
  buildModeSelect();
}

function buildModeSelect() {
  const stepsEl = document.getElementById('diagnosisSteps');
  const progressEl = document.getElementById('diagnosisProgress');
  const resultEl = document.getElementById('diagnosisResult');
  if (!stepsEl) return;
  progressEl.style.display = 'none';
  resultEl.classList.remove('active');
  resultEl.innerHTML = '';
  stepsEl.style.display = 'block';
  stepsEl.innerHTML = `
    <div class="diag-mode-select">
      <p class="diag-mode-lead">診断の方法を選んでください</p>
      <div class="diag-mode-grid">
        <button class="diag-mode-btn" onclick="selectDiagMode('simple')">
          <span class="diag-mode-emoji">🥃</span>
          <span class="diag-mode-label">シンプル診断</span>
          <span class="diag-mode-sub">5問で手軽に診断</span>
        </button>
        <button class="diag-mode-btn diag-mode-btn--featured" onclick="selectDiagMode('full')">
          <span class="diag-mode-emoji">🎓</span>
          <span class="diag-mode-label">本格診断</span>
          <span class="diag-mode-sub">10問で精度の高い提案</span>
        </button>
      </div>
    </div>
  `;
}

function selectDiagMode(mode) {
  diagMode = mode;
  diagAnswers = {};
  diagStep = 0;
  diagQuestions = mode === 'simple' ? simpleQuestions : fullQuestions;
  buildQA();
}

function buildQA() {
  const stepsEl = document.getElementById('diagnosisSteps');
  const progressEl = document.getElementById('diagnosisProgress');
  progressEl.style.display = 'flex';
  progressEl.innerHTML = diagQuestions.map((_, i) =>
    `<div class="progress-dot${i === 0 ? ' active' : ''}" id="dot-${i}"></div>`
  ).join('');
  stepsEl.innerHTML = diagQuestions.map((step, i) => `
    <div class="diagnosis-step${i === 0 ? ' active' : ''}" id="step-${i}">
      ${i === 0 ? '<button class="diag-back-btn" onclick="buildModeSelect()">← 戻る</button>' : ''}
      <p class="diagnosis-question">${step.question}</p>
      <p class="diagnosis-hint">${step.hint}</p>
      <div class="diagnosis-options">
        ${step.options.map(opt => `
          <button class="diagnosis-option" onclick="pickOption(event,'${step.id}','${opt.value}',${i})">
            <span class="option-emoji">${opt.emoji}</span>
            <span>
              <span class="option-label">${opt.label}</span>
              <span class="option-sub">${opt.sub}</span>
            </span>
          </button>`).join('')}
      </div>
    </div>`).join('');
}

function pickOption(e, id, value, idx) {
  diagAnswers[id] = value;
  e.currentTarget.classList.add('selected');
  setTimeout(() => {
    document.getElementById(`step-${idx}`).classList.remove('active');
    document.getElementById(`dot-${idx}`).classList.add('done');
    if (idx + 1 < diagQuestions.length) {
      document.getElementById(`step-${idx + 1}`).classList.add('active');
      document.getElementById(`dot-${idx + 1}`).classList.add('active');
    } else {
      showDiagResults(diagAnswers);
    }
  }, 280);
}

function showDiagResults(answers) {
  document.getElementById('diagnosisSteps').style.display = 'none';
  document.getElementById('diagnosisProgress').style.display = 'none';
  const tops = getTopN(answers, 3);
  const ranks = ['🥇 第1候補', '🥈 第2候補', '🥉 第3候補'];
  const resultEl = document.getElementById('diagnosisResult');
  resultEl.innerHTML = `
    <p class="diag-result-lead">あなたへのおすすめ</p>
    <div class="diag-result-cards">
      ${tops.map((r, i) => `
        <div class="diag-result-card${i === 0 ? ' diag-result-card--top' : ''}">
          <div class="diag-rank">${ranks[i]}</div>
          <div class="diag-whisky-name">${r.name}</div>
          <div class="diag-origin">${r.origin}</div>
          <div class="result-divider"></div>
          <p class="diag-reason">${r.reason}</p>
          <div class="result-tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <a class="diag-brand-link" href="brands.html?brand=${encodeURIComponent(r.name)}">銘柄詳細を見る →</a>
        </div>`).join('')}
    </div>
    <div class="result-retry">
      <button class="btn-primary" onclick="retryDiagnosis()">🔄 同じモードでもう一度</button>
      <button class="btn-secondary" onclick="resetDiagnosis()">← モード選択に戻る</button>
    </div>
  `;
  resultEl.classList.add('active');
}

function retryDiagnosis() {
  const mode = diagMode;
  diagAnswers = {};
  diagStep = 0;
  document.getElementById('diagnosisResult').classList.remove('active');
  document.getElementById('diagnosisResult').innerHTML = '';
  document.getElementById('diagnosisSteps').style.display = 'block';
  selectDiagMode(mode);
}

function resetDiagnosis() {
  diagAnswers = {};
  diagStep = 0;
  diagMode = null;
  document.getElementById('diagnosisResult').classList.remove('active');
  document.getElementById('diagnosisResult').innerHTML = '';
  document.getElementById('diagnosisSteps').style.display = 'block';
  buildModeSelect();
}

initDiagnosis();

// --- LEGACY (kept for page compatibility) ---
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
