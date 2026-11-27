// 公式LINEのURLをここに設定すると、すべての「無料相談」ボタンのリンク先に反映されます
const LINE_URL = '';
// セミナー申込ページのURLをここに設定すると、すべての「セミナーに参加する」ボタンに反映されます
const SEMINAR_URL = '';

// ▼ オーダーメイドの理由：2つ選ぶと、プランの例ができる
// 「現状 → 止めているもの → 目指す状態 → 道のり」の順で見立てる
const TYPES = {
  t1: {
    short: '失敗が怖くて止まっている', where: '気持ちと意味づけ',
    now: '正解を探しているうちに、時間だけが過ぎていく。',
    belief: '「間違えてはいけない」「成功しなければ価値がない」',
    protect: '失敗しない・恥をかかない・評価を失わないという安心',
    shift: '「失敗しても、自分の価値は変わらない」と腹落ちし、小さく動ける自分に戻る',
    questions: ['それを止めているものは、何ですか？', 'もし成功しなくても自分に価値があるとしたら、今、何をしますか？'],
    state: ['decide']
  },
  t2: {
    short: '行き先が見えなくて止まっている', where: 'ゴール',
    now: '頑張れる。でも、何のために頑張っているのか分からない。',
    belief: '「期待に応えるべき」「これが正解のはず」',
    protect: '周りの期待に応えている安心と、自分で選ばなくていい楽さ',
    shift: '今の延長線の外にある、本当に望む未来を描き、自分の言葉で握り直す',
    questions: ['このまま今の延長線を進んだら、5年後どうなっていますか？', 'もし何の制約もなかったら、本当はどうなっていたいですか？'],
    state: ['want']
  },
  t3: {
    short: '決めたのに続かない', where: '行動と習慣',
    now: '熱も覚悟もある。ただ、毎日に落とし込めていない。',
    belief: '「気合いが足りないからだ」「自分は続かない人間だ」',
    protect: 'これ以上、自分にがっかりしなくて済む安心',
    shift: '続かない理由を意志の弱さにせず、行動と環境の設計で続く形にする',
    questions: ['もしその思い込みがなかったら、違う行動を選べますか？', '続けるために、まず何を変えれば一番ラクになりますか？'],
    state: ['decide', 'want']
  }
};
const AREAS = {
  career: { name: 'キャリア', goal: 'キャリアを、自分で選べる', outer: '昇進も転職も、次の一手を自分の意思で選び、動き出す', state: 'career' },
  indep: { name: '独立', goal: '自分の名前で、仕事ができる', outer: '提供できる価値を形にし、最初のお客さんと出会う', state: 'indep' },
  side: { name: '副業', goal: '本業の外に、もう一つの軸を持てる', outer: 'やりたいことを副業として形にし、本業と両立しながら続ける', state: 'side' },
  biz: { name: '事業', goal: '想いを事業にして、伸ばせる', outer: '商品・集客・届け方を仕組みにして、一人に頼らない形で伸ばす', state: 'biz' },
  team: { name: 'マネジメント・組織', goal: 'チームを、率いられる', outer: '任せ方と育て方を変え、メンバーの可能性を引き出してチームで成果を出す', state: 'team' },
  rel: { name: '人間関係', goal: '大切な人と、いい関係を築ける', outer: '家族・パートナー・職場で本音を伝え、関わり方を選び直す', state: null },
  self: { name: '自分の生き方', goal: '自分で決めた未来を、生きられる', outer: '強みと望みが重なる場所を一緒に探し、最初の一歩を決める', state: null }
};
const NAMES = { strength: '強みがわかる', want: 'やりたいことがわかる', decide: '自分で決められる', career: 'キャリアを選べる', indep: '自分の名前で仕事ができる', side: 'もう一つの軸を持てる', biz: '事業を伸ばせる', team: 'チームを率いられる' };

const pick = { type: null, area: null };
const result = document.getElementById('b-result');
const grid = document.getElementById('menu-grid');

function renderPlan() {
  document.querySelectorAll('[data-type]').forEach((el) => {
    const on = el.dataset.type === pick.type;
    if (el.matches('button')) el.setAttribute('aria-pressed', String(on));
    if (el.classList.contains('type-card')) el.classList.toggle('chosen', on);
  });
  document.querySelectorAll('#area-row [data-area]').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.area === pick.area)));

  if (!pick.type || !pick.area) {
    const left = !pick.type && !pick.area ? '質問1と質問2' : (!pick.type ? '質問1' : '質問2');
    result.innerHTML = `<p class="b-wait">${left}を選ぶと、ここにあなたのプランの例が表示されます。</p>`;
    if (grid) grid.querySelectorAll('.menu-card').forEach((el) => el.classList.remove('on'));
    return;
  }
  const t = TYPES[pick.type];
  const a = AREAS[pick.area];
  const states = ['strength', ...t.state, a.state].filter((k, i, arr) => k && arr.indexOf(k) === i);
  const steps = [
    '起きている事実と意味づけを分けて、止めている前提を一緒に見つける',
    t.shift,
    a.outer,
    '行動と環境を設計し、次のセッションで結果を確かめる。決めたことを守るまで隣を走る'
  ];
  result.innerHTML = `
<div class="b-plan">
<div class="b-left">
<p class="b-tag">あなたへのプランの例</p>
<p class="b-head">${t.short}あなたが、<br><span class="gold">${a.goal}</span>までの道のり</p>
<div class="b-map">
<div><span>今の状態</span><p>${t.now}<br><small>止まっている場所：${t.where}</small></p></div>
<div><span>止めている前提</span><p>${t.belief}</p></div>
<div><span>その前提が守っているもの</span><p>${t.protect}</p></div>
<div><span>目指す状態</span><div class="b-chips">${states.map((k) => `<span class="combo">${NAMES[k]}</span>`).join('<span class="combo-plus">→</span>')}${a.state ? '' : `<span class="combo-plus">→</span><span class="combo">${a.goal}</span>`}</div></div>
</div>
</div>
<div class="b-right">
<p class="b-label dark">こんな問いから、始めます</p>
<div class="b-qs">${t.questions.concat(['事実として確認すると、どうなりますか？']).map((q) => `<p>「${q}」</p>`).join('')}</div>
<p class="b-label dark" style="padding-top:14px">こんな流れで、向き合います</p>
${steps.map((x, i) => `<div class="step"><b>${i + 1}</b><p>${x}</p></div>`).join('')}
<p class="b-goal">その先に ── 強みを活かして、夢中で人の役に立つ。結果を出しながら、人生を楽しむ。</p>
<div class="b-cta"><a href="#seminar" data-seminar class="btn-seminar" style="font-size:14px;padding:13px 20px">セミナーで体感する</a><a href="#contact" data-line class="cta3d" style="font-size:14px;padding:14px 20px">このプランを無料で相談する ↗</a></div>
</div>
</div>
<p class="b-note">※ 一例です。実際のプランは、個別相談でお話を聞いてから一緒に設計します。</p>`;
  applyLinks(result);
  if (grid) grid.querySelectorAll('.menu-card').forEach((el) => el.classList.toggle('on', states.includes(el.dataset.key)));
}

document.querySelectorAll('.pick-type, #type-row [data-type]').forEach((b) => b.addEventListener('click', () => {
  pick.type = b.dataset.type; renderPlan();
  if (b.classList.contains('pick-type')) document.getElementById('builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
document.querySelectorAll('#area-row [data-area]').forEach((b) => b.addEventListener('click', () => { pick.area = b.dataset.area; renderPlan(); }));

function applyLinks(root) {
  if (LINE_URL) root.querySelectorAll('[data-line]').forEach((a) => { a.href = LINE_URL; a.target = '_blank'; a.rel = 'noopener'; });
  if (SEMINAR_URL) root.querySelectorAll('[data-seminar]').forEach((a) => { a.href = SEMINAR_URL; a.target = '_blank'; a.rel = 'noopener'; });
}
applyLinks(document);
renderPlan();
