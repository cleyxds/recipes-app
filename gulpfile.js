const gulp = require("gulp")
const args = require("yargs").argv
const rename = require("gulp-rename")
const clean = require("gulp-clean")

gulp.task("del", function () {
  return gulp.src("env.js", { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task("move", function () {
  return gulp
    .src(["envs/" + args.env + ".env.js"])
    .pipe(rename("env.js"))
    .pipe(gulp.dest("./"))
})

gulp.task("set", gulp.series("del", "move"))
