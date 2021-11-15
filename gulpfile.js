const { src, dest, parallel, watch, series } = require('gulp'), concat = require('gulp-concat'), 
sass = require('gulp-sass')(require('sass')), pug = require('gulp-pug'), browserSync = 
require('browser-sync').create(), autoprefixer = require('gulp-autoprefixer')
const FilesPath = { sassFiles: 'src/sass/*.scss', htmlFiles: 'src/pug/pages/*.pug' }
const {sassFiles, htmlFiles} = FilesPath
// task 1: sass -> css
function sassTask() { return src(sassFiles) .pipe(sass()) .pipe(concat('style.css')) 
.pipe(dest('assets/css')) .pipe(browserSync.stream()); }

// task 2: pug -> html
function htmlTask() { return src(htmlFiles) .pipe(pug({ pretty: true })) 
.pipe(dest('./')) .pipe(browserSync.stream()); } 

// task 3: tạo server với live reload
function serve() { browserSync.init({ server: { baseDir: './' } }); watch('src/sass/**/*', sassTask);
watch('src/pug/**/*', htmlTask); }

    
// Gọi gulp bằng 1 dòng lệnh
exports.sass = sassTask; 
exports.html = htmlTask; 
// exports.prefixer = prefixerTask; 

exports.default = series(parallel(htmlTask, sassTask)); 
exports.serve = series(serve, parallel(htmlTask, sassTask))