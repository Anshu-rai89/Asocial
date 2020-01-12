const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('iconfont', function () {
    console.log('minifying webfonts');
        gulp.src('./assets/**/*.+(svg|ttf|woff|woff2')
         .pipe(iconfont({
             fontName: 'iconfont',
             formats: ['ttf', 'eot', 'woff', 'woff2'],
             appendCodepoints: true,
             appendUnicode: false,
             normalize: true,
             fontHeight: 1000,
             centerHorizontally: true
         }))
         .on('glyphs', function (glyphs, options) {
             gulp.src('./assets/scss/**/*.scss')
                 .pipe(consolidate('underscore', {
                     glyphs: glyphs,
                     fontName: options.fontName,
                     fontDate: new Date().getTime()
                 }))
                 .pipe(gulp.dest('./public/assets'));
         })
         .pipe(gulp.dest('./public/assets'));
         done();
 });


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});