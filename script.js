// 公式LINEのURLをここに設定すると、すべての「無料相談」ボタンのリンク先に反映されます
const LINE_URL = '';
// セミナー申込ページのURLをここに設定すると、すべての「セミナーに参加する」ボタンに反映されます
const SEMINAR_URL = '';

// ▼ オーダーメイドの理由：2つ選ぶと、プランの例ができる
// 「現状 → 止めているもの → 目指す状態 → 道のり」の順で見立てる
const TYPES = {
  t1: { short: '失敗が怖くて一歩目が出ない', where: '気持ちと意味づけ', now: '正解を探しているうちに、時間だけが過ぎていく。', belief: '「間違えてはいけない」「成功しなければ価値がない」', support: '前提の書き換え', state: ['decide'] },
  t2: { short: 'やりたいことが分からない', where: 'ゴール', now: '頑張れる。でも、何のために頑張っているのか分からない。', belief: '「期待に応えるべき」「これが正解のはず」', support: '強みとゴールの特定', state: ['strength', 'want'] },
  t3: { short: '決めたのに続かない', where: '行動と習慣', now: '熱も覚悟もある。ただ、毎日に落とし込めていない。', belief: '「気合いが足りないからだ」「自分は続かない人間だ」', support: '行動と習慣の設計', state: ['decide', 'want'] },
  t4: { short: '一人で抱え込んでしまう', where: '役割と自己像', now: '自分がやった方が早い。気づけば、全部を自分で背負っている。', belief: '「完璧にできない人に任せるのは無責任」「自分がいないと回らない」', support: '強みの特定と役割の再設計', state: ['strength', 'decide'] },
  t5: { short: '頑張っても成果につながらない', where: '基準と環境', now: '行動量は足りているはず。なのに、結果が変わらない。', belief: '「もっと頑張れば、いつか報われる」', support: '基準と戦略の見直し', state: ['strength', 'decide'] }
};
const AREAS = {
  career: { goal: 'キャリアを、自分で選べる', support: 'キャリア支援', state: ['career'] },
  indep: { goal: '自分の名前で、仕事ができる', support: '独立・副業支援', state: ['indep', 'side'] },
  biz: { goal: '想いを事業にして、伸ばせる', support: '経営・事業づくり支援', state: ['biz', 'team'] },
  team: { goal: 'チームを、率いられる', support: 'マネジメント支援', state: ['team'] },
  self: { goal: '自分で決めた未来を、生きられる', support: '生き方の伴走', state: [] }
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
  const states = [...t.state, ...a.state].filter((k, i, arr) => k && arr.indexOf(k) === i);
  result.innerHTML = `
<div class="b-plan">
<div class="b-left">
<p class="b-tag">あなたへのプランの例</p>
<p class="b-head">${t.short}あなたが、<br><span class="gold">${a.goal}</span>までの道のり</p>
<div class="b-map">
<div><span>今の状態</span><p>${t.now}<br><small>止まっている場所：${t.where}</small></p></div>
<div><span>止めている前提</span><p>${t.belief}</p></div>
<div><span>目指す状態</span><div class="b-chips">${states.map((k) => `<span class="combo">${NAMES[k]}</span>`).join('<span class="combo-plus">→</span>')}${a.state.length ? '' : `${states.length ? '<span class="combo-plus">→</span>' : ''}<span class="combo">${a.goal}</span>`}</div></div>
</div>
</div>
<div class="b-right">
<p class="b-label dark">あなたへの支援の組み合わせ</p>
<div class="b-formula"><span>${t.support}</span><b>×</b><span>${a.support}</span></div>
<p class="b-for">止まっている場所（${t.where}）と、変わりたい分野に合わせて、必要な支援だけを組み合わせます。</p>
<p class="b-goal">その先に ── 強みを活かして、夢中で人の役に立つ。結果を出しながら、人生を楽しむ。</p>
<div class="b-cta"><a href="#seminar" data-seminar class="btn-seminar" style="font-size:14px;padding:13px 20px">セミナーで体感する</a><a href="#contact" data-line class="cta3d" style="font-size:14px;padding:14px 20px">このプランを無料で相談する ↗</a></div>
</div>
</div>
<p class="b-note">※ 一例です。実際のプランは、個別相談でお話を聞いてから一緒に設計します。</p>`;
  applyLinks(result);
  if (grid) grid.querySelectorAll('.menu-card').forEach((el) => el.classList.toggle('on', states.includes(el.dataset.key)));
}

document.querySelectorAll('#type-row [data-type]').forEach((b) => b.addEventListener('click', () => { pick.type = b.dataset.type; renderPlan(); }));
document.querySelectorAll('#area-row [data-area]').forEach((b) => b.addEventListener('click', () => { pick.area = b.dataset.area; renderPlan(); }));

function applyLinks(root) {
  if (LINE_URL) root.querySelectorAll('[data-line]').forEach((a) => { a.href = LINE_URL; a.target = '_blank'; a.rel = 'noopener'; });
  if (SEMINAR_URL) root.querySelectorAll('[data-seminar]').forEach((a) => { a.href = SEMINAR_URL; a.target = '_blank'; a.rel = 'noopener'; });
}
applyLinks(document);
renderPlan();
