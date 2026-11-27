// 公式LINEのURLをここに設定すると、すべての「無料相談」ボタンのリンク先に反映されます
const LINE_URL = '';
// セミナー申込ページのURLをここに設定すると、すべての「セミナーに参加する」ボタンに反映されます
const SEMINAR_URL = '';

const NAMES = { strength: '強みがわかる', want: 'やりたいことがわかる', decide: '自分で決められる', career: 'キャリアを選べる', indep: '独立に踏み出せる', side: '副業を形にできる', biz: '事業を伸ばせる', team: 'チームを率いられる' };
const data = [
  { id: 'career', label: 'キャリアを切り拓きたい', title: '本当に望むキャリアを選び、迷わず進める状態へ', who: '昇進、転職、今の場所での挑戦。どれを選ぶべきか決めきれない方に。', combo: ['strength', 'want', 'career'], steps: ['本当に望むキャリアと、選択を止めている前提を明確にする', '強みを言語化し、選べる選択肢を広げる', '次のポジションや転職へ、行動計画を立てて前進する'] },
  { id: 'indep', label: '独立して、自分の名前で働きたい', title: '自分の名前で、仕事ができる状態へ', who: '「いつかは独立」と思いながら、一歩目が出ない方に。', combo: ['strength', 'want', 'decide', 'indep'], steps: ['独立して実現したい未来と、止めている不安を言葉にする', '自分の強みから、提供できる価値を形にする', '最初のお客さんと出会い、独立への一歩を踏み出す'] },
  { id: 'side', label: '副業で、もう一つの軸を持ちたい', title: '本業を続けながら、やりたいことを副業で形にする', who: '本業は大切にしたまま、自分の可能性を広げたい方に。', combo: ['strength', 'want', 'side'], steps: ['「なぜやりたいか」と、提供できる価値を整理する', '最初の顧客・案件と出会うまで伴走する', '本業と両立しながら、続けられる形にする'] },
  { id: 'biz', label: '事業を立ち上げ・伸ばしたい', title: '理想から逆算し、仕組みで伸びる事業をつくる', who: '立ち上げた事業を、さらに伸ばしたい方に。', combo: ['want', 'decide', 'biz', 'team'], steps: ['事業で実現したい未来を、解像度高く描く', '商品・集客・届け方を仕組みにする', '採用・育成で、一人に頼らない組織へ'] },
  { id: 'team', label: 'チームを率いる力をつけたい', title: '人と組織の可能性を引き出せるリーダーへ', who: 'マネージャー・経営者として、チームの成果と成長に向き合いたい方に。', combo: ['strength', 'decide', 'team'], steps: ['リーダーとしての軸とビジョンを定める', 'メンバーの可能性を引き出す関わり方を身につける', 'チームで成果を出し続ける仕組みをつくる'] },
  { id: 'self', label: '自分の軸を見つけたい', title: '他人の期待ではなく、自分で決めた未来を生きる', who: 'このままでいいのか、何を変えればいいのか、まだ言葉にならない方に。', combo: ['strength', 'want', 'decide'], steps: ['モヤモヤを言語化し、止めている前提に気づく', '本当に望む未来と、自分の役割を描く', '描いた未来に向けて、最初の一歩を踏み出す'] }
];

const tabs = document.getElementById('plan-tabs');
const grid = document.getElementById('menu-grid');
function render(id, focus) {
  const c = data.find((g) => g.id === id) || data[0];
  document.getElementById('plan-title').textContent = c.title;
  document.getElementById('plan-who').textContent = c.who;
  document.getElementById('plan-combo').innerHTML = c.combo.map((k) => `<span class="combo">${NAMES[k]}</span>`).join('<span class="combo-plus">→</span>');
  document.getElementById('plan-steps').innerHTML = c.steps.map((t, i) => `<div class="step"><b>${i + 1}</b><p>${t}</p></div>`).join('');
  tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.id === c.id)));
  grid.classList.toggle('picking', !!focus);
  grid.querySelectorAll('.menu-card').forEach((el) => el.classList.toggle('on', !!focus && c.combo.includes(el.dataset.key)));
}
tabs.setAttribute('role', 'tablist');
tabs.innerHTML = data.map((g) => `<button type="button" role="tab" class="plan-tab" data-id="${g.id}">${g.label}</button>`).join('');
tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) render(b.dataset.id, true); });
render('career');

if (LINE_URL) {
  document.querySelectorAll('[data-line]').forEach((a) => { a.href = LINE_URL; a.target = '_blank'; a.rel = 'noopener'; });
}

if (SEMINAR_URL) {
  document.querySelectorAll('[data-seminar]').forEach((a) => { a.href = SEMINAR_URL; a.target = '_blank'; a.rel = 'noopener'; });
}
