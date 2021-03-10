const scrape = require('scrape-yt');
const ytmp3 = require('youtube-mp3-downloader');
const path = require('path');
const fs = require('fs');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const youtubeMusic = async (title) => {
  return new Promise(async (resolve, reject) => {
    const scraping = await scrape.search(title, { type: 'video', limit: 5 });
    const video = scraping.filter((vid) => vid.duration < 600)[0];
    if (!video) return resolve(false);
    const regex = /[|']/g;

    const randname = makeid(6);

    const videotitle = `${video.title}.mp3`.replace(regex, '');
    const videoid = video.id;
    const dir = path.resolve(__dirname, '../../media');
    const diroutput = '../media'

    const fileDir = fs.readdirSync(dir);
    const filter = fileDir.findIndex((file) => file === videotitle);
    if (filter !== -1) return resolve(`${dir}/${videotitle}`);

    try {
      const downloadOptions = {
        ffmpegPath: '/usr/bin/ffmpeg', // Linux default ffmpeg path
        outputPath: dir,
        youtubeVideoQuality: 'highestaudio',
        queueParallelism: 2,
        progressTimeout: 2000,
        allowWebm: false,
      };

      const downloader = new ytmp3(downloadOptions, videotitle);

      downloader.download(videoid);

      downloader.on('finished', function (err, data) {
        if (err) throw exception;
        fs.rename(`${dir}/${video.title}.mp3`, `${dir}/${randname}.mp3`, function(err2){
          if (err2) console.log('Error renaming file \n' + err2.stack);
        });
        return resolve(`${diroutput}/${randname}.mp3`);
      });
    } catch (exception) {
      return reject(exception);
    }
  });
};

module.exports = youtubeMusic;

// (async function () {
//   const link = await youtubeMusic("hasbi rabbi sami yusuf");
//   console.log(link);
// })();
