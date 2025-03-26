// TODO: コピペしてきただけなので調整したい
import imagemin from 'imagemin-keep-folder';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

/**
 * WebPの使用とフォールバックのモードを指定
 * - 'noWebp': WebPを使用せず、元の画像のみ出力
 * - 'useIfPossible': WebPを使用する、WebPに変換できない元画像は出力する
 * - 'fallback': WebPを使用する、元の画像も出力
 */
optimizeImages('fallback');

/**
 * WebPに変換可能な画像を最適化
 */
async function optimizeWebpConvertibleImages() {
  await imagemin(['src/img/**/*.{jpg,jpeg,png}'], {
    use: [
      imageminMozjpeg({ quality: 85, progressive: true }),
      imageminPngquant({ quality: [.95, 1] }),
    ],
    replaceOutputDir: output => output.replace(/img\//, '../dist/assets/img/')
  });
}

/**
 * WebPに変換不可能な画像を最適化
 */
async function optimizeNonWebpImages() {
  await imagemin(['src/img/**/*.{gif,svg}', '!src/assets/svg/*.svg'], {
    use: [
      imageminSvgo(),
      imageminGifsicle(),
    ],
    replaceOutputDir: output => output.replace(/img\//, '../dist/assets/img/')
  });
}

/**
 * WebP画像を生成
 */
async function generateWebpImages() {
  await imagemin(['src/img/**/*.{jpg,jpeg,png}'], {
    use: [
      imageminWebp({ quality: 95 }),
    ],
    replaceOutputDir: output => output.replace(/img\//, '../dist/assets/img/')
  });
}

/**
 * 画像を最適化
 * @param {string} webpMode - WebPの出力モード ('noWebp', 'useIfPossible', 'fallback')
 */
async function optimizeImages(webpMode) {
  switch (webpMode) {
    case 'noWebp':
      await optimizeWebpConvertibleImages();
      await optimizeNonWebpImages();
      break;
    case 'useIfPossible':
      await generateWebpImages();
      await optimizeNonWebpImages();
      break;
    case 'fallback':
      await optimizeWebpConvertibleImages();
      await generateWebpImages();
      await optimizeNonWebpImages();
      break;
    default:
      throw new Error('Invalid webpMode');
  }
}
