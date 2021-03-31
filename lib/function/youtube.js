const { Client } = require("youtubei");
const scrape = new Client();

const { fetchJson, fetchText } = require('../../util/fetcher')

const ytmp3 = require('youtube-mp3-downloader');
const path = require('path');
const fs = require('fs');

const youtubeMusic = async (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      const scraping = await scrape.search(title, { type: 'video', limit: 5 });
      const video = scraping.filter((vid) => vid.duration < 600)[0];
      if (!video) return resolve(false);
      const regex = /[|']/g;

      const videoid = video.id;
      const videourl = "https://www.youtube.com/watch?v=" + videoid

      fetchJson(`https://michaelbelgium.me/ytconverter/convert.php?youtubelink=${videourl}`)
          .then((result) => resolve(result))
          .catch((err) => reject(err))
    } catch (error) {
      console.log(error)
      reject(err)
    }
 
    /*
    const videotitle = `${video.title}.mp3`.replace(regex, '');
    const videotitle2 = videotitle.replace(/"/g, "");
    const videotitle3 = videotitle2.replace(/:/g, "");
    const videoid = video.id;
    const dir = path.resolve(__dirname, '../../media');
    const diroutput = './media'

    const fileDir = fs.readdirSync(dir);
    const filter = fileDir.findIndex((file) => file === videotitle3);
    if (filter !== -1) return resolve(`${diroutput}/${videotitle3}`);

    try {
      const downloadOptions = {
        ffmpegPath: '/usr/bin/ffmpeg', // Linux default ffmpeg path
        outputPath: dir,
        youtubeVideoQuality: 'highestaudio',
        queueParallelism: 2,
        progressTimeout: 2000,
        allowWebm: false,
      };

      const downloader = new ytmp3(downloadOptions, videotitle3);

      downloader.download(videoid);

      downloader.on('finished', function (err, data) {
        if (err) throw exception;
        //fs.rename(`${dir}/${video.title}.mp3`, `${dir}/${randname}.mp3`, function(err2){
        //  if (err2) console.log('Error renaming file \n' + err2.stack);
        //});
        return resolve(`${diroutput}/${videotitle3}`);
      });
    } catch (exception) {
      return reject(exception);
    }*/
  });
};

module.exports = youtubeMusic;

// (async function () {
//   const link = await youtubeMusic("hasbi rabbi sami yusuf");
//   console.log(link);
// })();
