const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

// Clean dist directory
function cleanDist() {
    return del('dist');
}

// Compile and minify JS (including all components)
function scripts() {
    return src([
        'src/js/components/**/*.js', // all JS components
        'src/js/main.js'             // main entry point
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

// Compile and minify SCSS
function styles() {
    return src([
        'src/sass/**/*.scss',
        'src/sass/main.scss'
    ])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions', 'ie 11', 'Android >= 4.1', 'Safari >= 8', 'iOS >= 8'],
        grid: true
    }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

// BrowserSync dev server
function browsersync() {
    browserSync.init({
        server: {
            baseDir: ['src', 'src/html'],
            index: 'html/index.html'
        },
        port: 4000
    });
}

// Watch files for changes
function watching() {
    watch(['src/sass/**/*.scss'], styles);
    watch(['src/js/**/*.js'], scripts); // watch main + components
    watch(['src/html/**/*.html']).on('change', browserSync.reload);
}

// Copy build files to dist/
function build() {
    return src([
        'src/css/main.min.css',
        'src/fonts/**/*',
        'src/js/main.min.js',
    ], { base: 'src' })
    .pipe(dest('dist'));
}

// Gulp tasks
exports.styles = styles;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.browsersync = browsersync;
exports.watching = watching;
exports.build = series(cleanDist, build);
exports.start = parallel(styles, scripts, browsersync, watching);
