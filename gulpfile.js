var app = {  // 定义目录
    srcPath:'src/',
    distPath:'dist/'
};

var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var open = require('open');
var htmlmin = require('gulp-htmlmin');

gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/index.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath)).pipe(connect.reload());
});
gulp.task('template', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/template/Account/*.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath+'template/Account')).pipe(connect.reload());
    gulp.src('src/template/bank/*.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath+'template/bank')).pipe(connect.reload());
    gulp.src('src/template/deal/*.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath+'template/deal')).pipe(connect.reload());
    gulp.src('src/template/pay/*.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath+'template/pay')).pipe(connect.reload());
    gulp.src('src/template/system/*.html').pipe(htmlmin(options)).pipe(gulp.dest(app.distPath+'template/system')).pipe(connect.reload());
});

gulp.task('image',function () {
    gulp.src('src/images/*') .pipe(imagemin()).pipe(gulp.dest(app.distPath+'images')).pipe(connect.reload())
});
gulp.task('lib',function (){
    gulp.src('src/js/lib/*.js').pipe(gulp.dest(app.distPath+'js/lib')).pipe(connect.reload())
});
gulp.task('js',function () {
    gulp.src('src/js/myJS/*.js').pipe(uglify()).pipe(gulp.dest(app.distPath+'js/myJS')).pipe(connect.reload())
});
gulp.task('css',function () {
    gulp.src('src/css/*.css').pipe(cssmin()).pipe(gulp.dest(app.distPath+'css/')).pipe(connect.reload())
});

gulp.task('json',function () {
    gulp.src('src/json/*').pipe(gulp.dest(app.distPath+'json'))
});

gulp.task('build',['image', 'template','html','js','lib','json','css']);

gulp.task('server',['build'],function () {
    /*设置服务器*/
    connect.server({
        root:[app.srcPath],//要运行哪个目录
        livereload:true,  //是否热更新。
        port:8888  //端口号
    });
    /*监听哪些任务*/
    gulp.watch(app.srcPath+'**/*',['lib']);
    gulp.watch(app.srcPath+'index.html',['html']);
    gulp.watch(app.srcPath+'js/**/*.js',['js']);
    gulp.watch(app.srcPath+'images/*',['images']);
    gulp.watch(app.srcPath+'css/*.css',['css']);
    gulp.watch(app.srcPath+'json/*.json',['json']);
    gulp.watch(app.srcPath+'template/**/*.html',['template']);

    //通过浏览器把指定的地址 （http://localhost:9999）打开。
    open('http://localhost:8888');
});
gulp.task('default',['server']);