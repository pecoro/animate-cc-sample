------------------------------
------------------------------

# 新規プロジェクトのためのgulp作成手順

2019.05.28　編集

------------------------------
------------------------------

## 使い回しする場合

### 1.プロジェクトディレクトリをコピーしてくる

### 2.下記コマンドを実行 → package.jsonに記述されたmoduleがインストールされる
$ npm install

### 3.package.jsonの書き換え
package.jsonの "name": "default" をプロジェクト名に書き換え


### 4.file pathをプロジェクト用に書き換え
・gulpfile.jsのfile pathをプロジェクト用に書き換える
・webpack.config.js のエントリーポイントをプロジェクト用に書き換える


## gulp実行コマンド
$ npx gulp

##  BrowserSyncが起動するので、そこで表示を確認
※ExternalのURLでスマホやタブレットからも表示確認できる

------------------------------

## gulpをインストールし直す場合

------------------------------
### 1.Node.jsとnpmのバージョンの確認
$ node -v
$ npm -v

### 1.package.jsonの作成
$ npm init -y

### 2.gulpのインストール（ローカルのみ）
$ npm install -D gulp

### 3.プラグインのインストール
gulpfile.jsにrequireしてあるプラグインをインストール
$ npm install プラグイン名　プラグイン名　プラグイン名 -D

### 4.package.jsonのnameとgulpfile.jsのfile pathを書き換え

### 5.gulp実行コマンド
$ npx gulp





---
##メモ

### jsファイルの結合について
複数ページのWebサイトで使用する場合はvender.jsと各ページのjsを分けて出力する
wordpressなどで別途jQueryが読み込まれている場合は、externalsオプションでバンドル対象からjQueryをはずす。

### sassファイル
_assets/scss/style.scssにすべてimportし、dist/style.cssに圧縮してかき出ししている

### javascriptファイル
_assets/jsフォルダ内のjsをdist/js/内のscript.jsに結合してかき出し

### 画像
_assets/images/の画像を圧縮してdist/images/にかき出し

### 2019.05.28
browserSyncで確認できるようにしました（スマホでも確認できる）
picturefill.jsを入れてレスポンシブイメージを実装
jQueryをwebpackのプラグインとして入れています

### 2019.01.13
babelを追加しました

## package.jsonの書き換えが必要な場合は下記を参考に
https://qiita.com/dondoko-susumu/items/cf252bd6494412ed7847

## エラーが発生した場合のキャッシュクライア方法
https://akamist.com/blog/archives/2827

## Nodeの最新バージョンをインストールする方法
https://www.sejuku.net/blog/72545

※最新バージョンを確認するにはグローバルで下記コマンドを実行
$ nvm ls-remote

最新の安定版をインストールしたい場合
$ nvm install stable

任意のバージョンをデフォルトとして利用
$ nvm alias default v9.3.0

バージョンを切り替える
$ nvm use v9.3.0

特定のバージョンのNode.jsをアンインストールしたい
$ nvm uninstall v9.3.0

※おそらくバージョンの違いなどにより再インストールでエラーが出るので、定期的に見直したほうがいいだろう

<!-- 下記の方法は古いバージョン用--------
実行コマンドは $ npm run gulp

※ローカルのgulpを実行するようにpackage.jsonのscriptに下記を追加しているから
"scripts": {
    "gulp": "gulp",
    "start": "gulp"
  },
 ----------------------------------->

---