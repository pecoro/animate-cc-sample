"use strict"

// jQueryはwebpack側で読み込んでいる

// sub.jsファイルを読み込むには???
// import sub from "./_sub";
// sub;

// anime.jsを読み込む
import anime from 'animejs/lib/anime.es.js';

// anime({
//     targets: 'div',
//     translateX: 250,
//     rotate: '1turn',
//     backgroundColor: '#FFF',
//     duration: 800
// });

// ローディングアニメーション ---------------------------------------------------- //

// 画像などのリンクコンテンツも読み込んだら実行される処理
window.addEventListener('load', function () {
})

// define ------------------------------------------------------------------- //




// functions ---------------------------------------------------------------- //

// リサイズ時に値を再代入するもの
function resizeInit() {

}



// execute ------------------------------------------------------------------ //

// html上で'defer'で読み込んでいるので、基本HTML DOMの読み込みは終わっている
// webpackでモジュール化されるので即時関数無しでもグローバル汚染がない


// 動的なリサイズは操作後0.2秒経ってから処理を実行する。
let resizeTimer
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(function () {
        resizeInit();
    }, 200)
})
// --------------------------------------------------------------------------- //