const gulp = require("gulp")
const args = require("yargs").argv
const rename = require("gulp-rename")
const clean = require("gulp-clean")

gulp.task(
  "postbuild",
  gulp.parallel(
    handlePublicFiles,
    handleUploadsFolderCreation,
    handleViewsFolder,
    handleProjectFiles
  )
)

async function handlePublicFiles() {
  gulp.src("public/images/*").pipe(gulp.dest("build/public/images"))
  gulp.src("public/styles/*").pipe(gulp.dest("build/public/styles"))
  gulp.src("public/videos/*").pipe(gulp.dest("build/public/videos"))
}

async function handleViewsFolder() {
  gulp.src("src/views/*").pipe(gulp.dest("build/views"))
}

async function handleProjectFiles() {
  gulp.src("./package.json").pipe(gulp.dest("build"))
  gulp.src("./gcs.config.json").pipe(gulp.dest("build"))
}

async function handleUploadsFolderCreation() {
  gulp.src("public/uploads", { read: false }).pipe(gulp.dest("build/public"))
}

gulp.task("del-env", function () {
  return gulp.src(".env", { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task("move-env", function () {
  return gulp
    .src([args.env + ".env"])
    .pipe(rename(".env"))
    .pipe(gulp.dest("./"))
})

gulp.task("del-build", function () {
  return gulp.src("build", { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task("set", gulp.series("del-env", "move-env"))
