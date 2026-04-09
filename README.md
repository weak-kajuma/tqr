# QR Viewer (GitHub Pages向け)

8桁のID番号を入力し、QRコードを表示するシンプルなWebアプリです。

## 仕様

- 画面は2ページ構成
  - `index.html`: 8桁ID入力ページ
  - `qr.html`: QR表示ページ（ピンチイン/アウトでズーム対応）
- 入力したIDはCookieに保存
- Cookieに有効なID（8桁数字）がある場合、入力ページを開くと自動でQR表示ページへ遷移
- QR表示ページで「保存したIDを削除」でCookieを消去可能

## GitHub Pagesへのデプロイ

1. このリポジトリをGitHubへpush
2. GitHubの **Settings > Pages** を開く
3. **Build and deployment** で以下を選択
   - Source: `Deploy from a branch`
   - Branch: `main`（または利用ブランチ）
   - Folder: `/ (root)`
4. 保存後、表示されるURLでアプリを利用

## ローカル確認

```bash
python3 -m http.server 8000
```

`http://localhost:8000/index.html` を開いて確認できます。
