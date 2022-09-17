const gulp = require("gulp")

gulp.task(
  "postbuild",
  gulp.parallel(
    handlePublicFiles,
    handleUploadsFolderCreation,
    handleViewsFolder
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

async function handleUploadsFolderCreation() {
  gulp.src("public/uploads", { read: false }).pipe(gulp.dest("build/public"))
}
