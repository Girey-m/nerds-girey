import gulp from "gulp";
import * as dartSass from "sass"; // ← исправлено
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);
const server = browserSync.create();

const paths = {
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
  destCss: "public/assets/css",
  destJs: "public/assets/js",
};

// Сборка SCSS
export function styles() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.destCss))
    .pipe(server.stream());
}

// Сборка JS
export function scripts() {
  return gulp
    .src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.destJs))
    .pipe(server.stream());
}

// BrowserSync
export function serve() {
  server.init({
    proxy: "http://localhost/nerds-girey", // ← Важно! Укажи точное имя папки
    notify: false,
    open: true,
    port: 3000,
  });
}

// Слежение за файлами
export function watchFiles() {
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
  gulp.watch("public/**/*.php").on("change", server.reload);
}

// Запуск
export default gulp.series(
  gulp.parallel(styles, scripts),
  gulp.parallel(serve, watchFiles),
);
