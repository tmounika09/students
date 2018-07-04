var gulp = require("gulp");
var concat = require("gulp-concat");




gulp.task("scripts", function(){
     return gulp.src(['./scripts/app.js', './scripts/read.js', './scripts/filter.js', './scripts/update.js','./scripts/delete.js','./scripts/sort.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
    
    
});