const modeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const directories = {
  production: 'dist',
  development: 'app',
  components: 'components',
  audio: 'audio',
  styles: 'css',
  fonts: 'fonts',
  images: 'img',
  scripts: 'js'
};

const paths = {
  source: {
    html: `${directories.development}/*.html`,
    audio: `${directories.development}/${directories.styles}/${directories.components}/**/*.{mp3,ogg,m4r,wav}`,
    styles: `${directories.development}/${directories.styles}/styles.less`,
    fonts: `${directories.development}/${directories.fonts}/**/*.{woff2,woff,ttf}`,
    images: `${directories.development}/${directories.styles}/${directories.components}/**/*.{webp,svg,png,jpg}`,
    scripts: `${directories.development}/${directories.scripts}/{main,lottie}.js`
  },
  watch: {
    html: `${directories.development}/**/*.html`,
    audio: `${directories.development}/${directories.styles}/${directories.components}/**/*.{mp3,ogg,m4r,wav}`,
    styles: `${directories.development}/{${directories.styles},${directories.components}}/**/*.less`,
    images: `${directories.development}/${directories.styles}/${directories.components}/**/*.{webp,svg,png,jpg}`,
    scripts: `${directories.development}/${directories.scripts}/**/*.js`
  },
  build: {
    html: `${directories.production}`,
    audio: `${directories.production}/${directories.audio}/${directories.styles}/${directories.components}`,
    styles: `${directories.production}/${directories.styles}`,
    fonts: `${directories.production}/${directories.fonts}`,
    images: `${directories.production}/${directories.images}/${directories.styles}/${directories.components}`,
    scripts: `${directories.production}/${directories.scripts}`
  },
  clean: `${directories.production}`
};

import gulp from 'gulp';
import concat from 'gulp-concat';
import fileinclude from 'gulp-file-include';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import browsersync from 'browser-sync';
import del from 'del';

import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

import imagemin from 'gulp-imagemin';

const server = () =>
  browsersync.init({
    server: {
      baseDir: `${directories.production}`
    },
    notify: false
  });

const html = () =>
  gulp.src(paths.source.html).pipe(fileinclude()).pipe(gulp.dest(paths.build.html)).pipe(browsersync.stream());

const audio = () => gulp.src(paths.source.audio).pipe(gulp.dest(paths.build.audio)).pipe(browsersync.stream());

const postcssPlugins = [autoprefixer()];

const styles = () =>
  gulp
    .src(paths.source.styles)
    .pipe(gulpif(modeEnv === 'development', sourcemaps.init()))
    .pipe(less())
    .pipe(gulpif(modeEnv === 'development', sourcemaps.write()))
    .pipe(postcss(postcssPlugins))
    .pipe(concat('styles.css', { newLine: '' }))
    .pipe(gulp.dest(paths.build.styles))
    .pipe(browsersync.stream());

const images = () =>
  gulp
    .src(paths.source.images)
    .pipe(gulpif(modeEnv === 'production', imagemin()))
    .pipe(gulp.dest(paths.build.images))
    .pipe(browsersync.stream());

const fonts = () => gulp.src(paths.source.fonts).pipe(gulp.dest(paths.build.fonts));

const scripts = () => gulp.src(paths.source.scripts).pipe(gulp.dest(paths.build.scripts)).pipe(browsersync.stream());

const watch = () => {
  gulp.watch([paths.watch.html], html);
  gulp.watch([paths.watch.audio], audio);
  gulp.watch([paths.watch.styles], styles);
  gulp.watch([paths.watch.images], images);
  gulp.watch([paths.watch.scripts], scripts);
};

const clean = () => del(paths.clean);

const production = gulp.series(clean, gulp.parallel(html, audio, styles, fonts, images, scripts));
const development = gulp.parallel(production, watch, server);

export default development;
export { production, development };
