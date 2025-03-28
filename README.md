# favpark-girlsbandcry-daccountcpn
`dist` 以下は管理しません。  
~~動作確認済環境 : v15.8.0~~  
node: v18.18.2  
npm: v9.8.1  

以下は既に扱えるものとします。（説明は省きます）  
- Node.js  
- npm  

## 手順
1. 対象プロジェクトのディレクトリに移動  
2. `package.json`に書いてある`node_modules` のインストール  
　-> `yarn install` or `npm install`  
3. `npm run watch:all` でlocalserverを立ち上げます。  
　-> 納品前は`npm run prepare:all` でjsとcssのminify化をしましょう。  

## ちなみに  
`npm run watch:html` でhtmlのコピー。  
`npm run watch:js` でjs。  
`npm run watch:scss2cssprefix` でscss。  
`npm run build:image` で画像の圧縮とpng/jpgのwebp変換。  
がそれぞれ単体で動く筈。  

## ディレクトリ構成  
dist/  
　├─assets/  
　　├─css/  
　　├─js/  
　　└─img/  
　└─*.html  
src/  
　├─scss/  
　├─js/  
　├─img/  
　└─html/  
.browserslistrc  
.editorconfig  
imagemin.mjs  
package.json  

## 納品時  
`NODE_ENV=prod npm run watch:all` にて絶対パスが置き換わったものでlocalserver立ち上げ・確認  
`npm run prepare:all` でjsとcssをminify  
(2025.01.29時点)
