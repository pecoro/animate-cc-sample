// 2019/03/26 改修
// JavascriptのES2015以降のJSのトランスパイル、ファイルの結合・圧縮、ソースマップなどはwebpackにやってもらう。
// javascript関連の詳しい設定はwebpack.config.jsを編集する
// bootstrapを追加（2019/04/20）。bootstarapのプラグインを使用するのであればjQueryが必須となる。
// browsersyncでサーバーを立ち上げる仕様に変更(2019/5/28)
// autoprefixerのbrowsersオプションは非推奨のため削除。代わりにpackage.jsonにbrowserslistを追加（2019/09/10）
// webpack.configをgulpfile.jsに含めた（2019/10/02）

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// Image compression
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

//file path
const ROOT_PATH = './';
const SCSS_PATH = ROOT_PATH + '_assets/scss/**/*.scss';
const SCRIPTS_PATH = ROOT_PATH + '_assets/js/**/*.js';
const IMAGES_PATH = ROOT_PATH + '_assets/images/**/*.{png,jpeg,jpg,svg,gif}';
const DIST_PATH = ROOT_PATH + 'dist/';

const webpackConfig = {
    // production:公開用
    // development:開発用（ソースマップ有効)
    mode: "development",

    // エントリーポイント※polyfillを追加しました
    // 複数エントリポイントにも対応
    entry:{
        ['@babel/polyfill', './_assets/js/project.js']
    },
    // 出力ファイル
    output: {
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: "babel-loader",
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2018 を ES5 に変換
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            }
        ]
    },
    // optimization.splitChunks オプションを指定することで、外部パッケージのコードのみ別ファイルに出力できる。
    // ブラウザキャッシュを有効活用できるため、複数ページあるサイトを作成する場合は使用する
    // , optimization: {
    //     splitChunks: {
    //         name: 'vendor',
    //         chunks: 'initial' // initial,async,all
    //     }
    // }

    // バンドルしたファイル（もしくはvender.min.js）にjQueryファイルをインクルードしない場合はexternalsオプションを使用する
    // 別途HTMLからjQueryをロード。jQueryを使用するファイルに「import $ from 'jquery';」を記述する。
    // , externals: [
    //     {
    //         jquery: 'jQuery'
    //     }
    // ],
    plugins: [
        // jQueryが使えるようにする。個々のファイルでの「import $ from 'jquery';」の指定は不要。
        // externalsを指定しなかった場合はバンドルしたファイル（もしくはvender.min.js）にjQueryファイルがインクルードされる
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}

// Styles for SCSS
gulp.task('styles', function () {
    return gulp.src(SCSS_PATH)
        .pipe(plumber(function (err) {
            console.log('Style task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        // 'expanded','nested','compact',or'compressed'
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH + 'css'));
});

// Scripts
gulp.task('scripts', function () {
    return webpackStream(webpackConfig,webpack)
        .pipe(plumber(function (err) {
            console.log('Scripts task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(DIST_PATH + 'js/'))
});

// images
gulp.task('images', function () {
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(DIST_PATH + 'images/'));
});

// browser-syncでサーバーを立ち上げる
gulp.task('build-server', function (done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
    console.log('Server was launched');
});

// ブラウザのリロード
gulp.task('browser-reload', function (done) {
    browserSync.reload();
    done();
    console.log('Browser reload completed');
});

//watch
gulp.task('watch', function (done) {
    gulp.watch(IMAGES_PATH, gulp.task('images'));
    gulp.watch(SCRIPTS_PATH, gulp.task('scripts'));
    gulp.watch(SCSS_PATH, gulp.task('styles'));
    gulp.watch(IMAGES_PATH, gulp.task('browser-reload'));
    gulp.watch(SCRIPTS_PATH, gulp.task('browser-reload'));
    gulp.watch(SCSS_PATH, gulp.task('browser-reload'));
    gulp.watch('./**/*.html', gulp.task('browser-reload'));
    done();
    console.log(('gulp watch started'));
});

gulp.task('default', gulp.series('build-server','watch', function (done) {
    done();
}));