// 公式LINEのURLをここに設定すると、すべての「無料相談」ボタンのリンク先に反映されます
const LINE_URL = '';
// セミナー申込ページのURLをここに設定すると、すべての「セミナーに参加する」ボタンに反映されます
const SEMINAR_URL = '';

// ▼ オーダーメイドの理由：2つ選ぶと、プランの例ができる
const TYPES = {
  t1: { name: '失敗が怖くて、止まっている', short: '失敗が怖くて止まっている', belief: '「間違えてはいけない」「正解が分かってから動くべき」', inner: '「失敗したくない」の奥にある前提に気づき、外す', state: ['decide'] },
  t2: { name: '行き先が見えなくて、止まっている', short: '行き先が見えなくて止まっている', belief: '「期待に応えるべき」「これが正解のはず」', inner: '他人の正解と自分の望みを分け、本当に望む未来を自分の言葉にする', state: ['want'] },
  t3: { name: '決めたのに、続かなくて止まっている', short: '決めたのに続かない', belief: '「気合いが足りないからだ」「自分は続かない人間だ」', inner: '理想から逆算して、毎日に落とし込める行動と続く仕組みをつくる', state: ['decide', 'want'] }
};
const AREAS = {
  career: { name: 'キャリア', goal: 'キャリアを、自分で選べる', outer: '昇進も転職も、次の一手を自分の意思で選び、動き出す', state: 'career' },
  indep: { name: '独立', goal: '自分の名前で、仕事ができる', outer: '提供できる価値を形にし、最初のお客さんと出会う', state: 'indep' },
  side: { name: '副業', goal: '本業の外に、もう一つの軸を持てる', outer: 'やりたいことを副業として形にし、本業と両立しながら続ける', state: 'side' },
  biz: { name: '事業', goal: '想いを事業にして、伸ばせる', outer: '商品・集客・届け方を仕組みにして、一人に頼らない形で伸ばす', state: 'biz' },
  team: { name: 'マネジメント', goal: 'チームを、率いられる', outer: 'メンバーの可能性を引き出す関わり方を身につけ、チームで成果を出す', state: 'team' },
  self: { name: 'まだ分からない', goal: '本当に向かいたい分野が、見つかる', outer: '強みと望みが重なる分野を一緒に探し、最初の一歩を決める', state: null }
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
    return;
  }
  const t = TYPES[pick.type];
  const a = AREAS[pick.area];
  const states = ['strength', ...t.state, a.state].filter((k, i, arr) => k && arr.indexOf(k) === i);
  const steps = [
    t.inner,
    `自分の強みを言葉にして、${a.name === 'まだ分からない' ? '活かせる場所' : a.name}で活かせる形にする`,
    a.outer,
    '定期セッションとLINEで、決めたことを守るまで隣を走る'
  ];
  result.innerHTML = `
<div class="b-plan">
<div class="b-left">
<p class="b-tag">あなたへのプランの例</p>
<p class="b-head">${t.short}あなたが、<br><span class="gold">${a.goal}</span>までの道のり</p>
<p class="b-label">まず向き合う前提</p>
<p class="b-belief">${t.belief}</p>
<p class="b-label">目指す状態</p>
<div class="b-chips">${states.map((k) => `<span class="combo">${NAMES[k]}</span>`).join('<span class="combo-plus">→</span>')}</div>
</div>
<div class="b-right">
<p class="b-label dark">こんな流れで、向き合います</p>
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
