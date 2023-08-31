const gulp = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const sass = gulpSass(require('sass'));
const ts = require('gulp-typescript');
const minifyCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('clean:dist', () => {
    console.log('Cleaning dest directory...');
    return del(['dist/**/*']);
});


gulp.task('sass->css', () => {
    console.log('Converting .scss files to .css...');
    return gulp.src('src/assets/sass/**/*.scss').pipe(sass()).pipe(gulp.dest('dist/assets/css/'));
});


gulp.task('ts:browser->js', () => {
    console.log('Converting client side .ts files to .js...');
    const tsProject = ts.createProject('src/assets/ts/tsconfig.json');
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist/assets/js/'));
});


gulp.task('ts:server->js', () => {
    console.log('Converting server side .ts files to .js...');
    const tsProject = ts.createProject('tsconfig.json');
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist/'));
});


gulp.task('minify:css', () => {
    console.log('Minifying css...');
    return gulp.src('dist/assets/css/**/*.css').pipe(minifyCss()).pipe(gulp.dest('dist/assets/css')); 
});


gulp.task('minify:js:browser', () => {
    console.log('Minifying and uglifying client side js...');
    return gulp.src('dist/assets/js/**/*.js').pipe(uglify()).pipe(gulp.dest('dist/assets/js'));
});


gulp.task('copy:files', () => {
    console.log('Copying files...');
    return gulp.src('src/views/**/*.ejs').pipe(gulp.dest('dist/views'));
});


const taskList = [
    'clean:dist', 
    'sass->css', 
    'ts:browser->js', 
    'ts:server->js',
    'minify:css',
    'minify:js:browser',
    'copy:files'
];

gulp.task('build', gulp.series(taskList));