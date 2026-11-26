# Be-Buddy カスタマイズ型伴走支援 LP

KFSと同じ構成（HTML + CSS + JS を Vercel に置くだけ）の静的サイトです。

## ファイル
- index.html … ページ本体（文言はここを直接書き換え）
- style.css … デザイン
- script.js … 「あなたならどんなプラン？」の切り替えと、LINEリンクの設定
- assets/ … イラスト（SVG）

## 公開前にやること
1. script.js 1行目の `LINE_URL` に公式LINEのURLを入れる（全ボタンに反映されます）
2. 写真の枠（「写真：〜」と書かれた部分）を実際の画像に差し替える
3. 高橋さん・中村さんの役職とプロフィールを入れる
4. 「前提が変わった、その瞬間」の事例は、ご本人の掲載許可を確認する

## 公開方法（Vercel）
GitHubにこのフォルダをアップ → Vercelで「Add New Project」→ そのリポジトリを選んで Deploy。
