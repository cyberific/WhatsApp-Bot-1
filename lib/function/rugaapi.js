﻿const axios = require('axios')
require('dotenv').config()
var needle = require('needle')
const { fetchJson } = require('../../util/fetcher')
const fs = require('fs-extra')
const link = 'https://arugaz.herokuapp.com'

/**
 *
 * Create shorturl
 *
 * @param  {String} url
 */
const shortener = (url) => new Promise((resolve, reject) => {
    console.log('Creating short url...')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

const stickerText = (kata) => new Promise((resolve, reject) => {
    console.log(`Creating sticker from ${kata} text...`)
    fetchJson('https://st4rz.herokuapp.com/api/ttp?kata=' + kata)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const qrcode = async (url, size) => new Promise((resolve, reject) => {
	axios.get(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		.then((res) => {
			resolve(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		})
		.catch((err) => {
            reject(err)
        })
})

const darkjokes = async () => new Promise((resolve, reject) => {
    axios.get(`http://api-zeks.harispoppy.com/api/darkjokes?apikey=benbenz`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const qrread = async (url) => new Promise((resolve, reject) => {
	axios.get(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`)
		.then((res) => {
			if (res.data[0].symbol[0].data == null) return resolve(`Link yang anda masukan salah`)
			const textqr = `Hasil : ${res.data[0].symbol[0].data}`
			resolve(textqr)
		})
		.catch((err) => {
            reject(err)
        })
})

/**
 * Creater sticker lightning.
 * @param {String} url 
 */

const twit = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://api.kocakz.xyz/api/media/twvid?url=${url}`)
    .then(res => {
        resolve(res.data)
    })
    .catch(err => {
        reject(err)
    })
})

const getStickerMaker = (link) => new Promise((resolve, reject) => {
    fetch('https://api.areltiyan.site/sticker_maker?text='+encodeURIComponent(link), {
        method: 'GET',
    })
    .then(async res => {
        const text = await res.json()

        resolve(text)
        
     })
    .catch(err => reject(err))
});

const tosticker = (arguments) => {
    const phrase = arguments.map((result, index) => `${result}${index !== 0 && (index + 1) % 3 === 0 ? "%0A" : "%20"}`).join("");
    const APIURL = `https://raterian.sirv.com/New%20Project.png?text.0.text=${phrase}&text.0.position.y=-50%25&text.0.color=000000&text.0.font.family=Poppins&text.0.font.weight=600&text.0.outline.color=ffffff&text.0.outline.width=5`;
    return APIURL;
  };

/**
 * @author Aruga <arugaastri@gmail.com>                                                                                                                                                                            <https://github.com/ArugaZ/whatsapp-bot>
 * @license MIT
 */

"use strict"
const cheerio = require('cheerio')

/**
 * Get latest videos from Nekopoi.
 * @returns {Promise} Return latest videos from Nekopoi.
 */
const getLatest = () => new Promise((resolve, reject) => {
    const url = 'http://nekopoi.care'
    axios.get(url)
        .then((req) => {
            const title = []
            const link = []
            const image = []
            const data = {}
            const soup = cheerio.load(req.data)
            soup('div.eropost').each((i, e) => {
                soup(e).find('h2').each((j, s) => {
                    title.push(soup(s).find('a').text().trim())
                    link.push(soup(s).find('a').attr('href'))
                })
                image.push(soup(e).find('img').attr('src'))
            })
            if (data == undefined) {
                reject('No result :(')
            } else {
                let i = Math.floor(Math.random() * title.length)
                let hehe = {
                    "title": title[i],
                    "image": image[i],
                    "link": link[i]
                }
                resolve(hehe)
            }
        })
        .catch((err) => reject(err))
})

/**
 * Get Nekopoi video metadata.
 * @param {String} url
 * @returns {Promise} Return metadata.
 */
const getVideo = (url) => new Promise((resolve, reject) => {
    axios.get(url)
        .then((req) => {
            try {
                const links = []
                let soup = cheerio.load(req.data)
                let title = soup("title").text()
                soup('div.liner').each((i, e) => {
                    soup(e).find('div.listlink').each((j, s) => {
                        soup(s).find('a').each((p, q) => {
                            links.push(soup(q).attr('href'))
                        }) 
                    })
                })
                const data = {
                    "title": title,
                    "links": links
                }
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
        .catch((err) => reject(err))
})

/**
 * Search anime source.
 * @param {Buffer} imageBase64 
 */
const whatanime = (imageBase64) => new Promise((resolve, reject) => {
    console.log('Searching for anime source...')
    fetchJson('https://trace.moe/api/search', {
        method: 'POST',
        body: JSON.stringify({ image: imageBase64 }),
        headers: { "Content-Type": "application/json" }
    })
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const nick = async () => new Promise ((resolve, reject) => {
    console.log(`Sedang mengirim`)
    fetchJson(`http://api-zeks.harispoppy.com/api/nickepep?apikey=apivinz`)
    .then((result) => resolve(result))
    .catch((err) => reject(err))
})

const nowm = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://arugaz.my.id/api/media/tiktok?url=${url}`)
    .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
})


const tiktok = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(async (result) => {
            if (result.videoUrlNoWaterMark) {
                result.url = result.videoUrlNoWaterMark
                result.NoWaterMark = true
            } else {
                result.url = result.videoUrl
                result.NoWaterMark = false
            }
            resolve(result)
        }).catch((err) => {
            console.error(err)
            reject(err)
        })
})

const dewabatch = async (judul) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/dewabatch?q=${judul}`)
	.then((res) => {
		const textdew = `${res.data.result}\n\nSinopsis: ${res.data.sinopsis}`
		resolve({link: res.data.thumb, text: textdew})
	})
	.catch((err) => {
		reject(err)
	})
})

const cekzodiak = async (nama,tgl,bln,thn) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}-${bln}-${thn}`)
    .then((res) => {
        const text = `Nama: ${res.data.nama}\nUltah: ${res.data.ultah}\nZodiak: ${res.data.zodiak}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const cooltext = async (teks) => new Promise((resolve, reject) => {
	axios.get(`https://api.haipbis.xyz/randomcooltext?text=${teks}`)
	.then((res) => {
		const textc = `Teks: ${res.data.text}\nGambar: ${res.data.image}`
		resolve({link: res.data.image, text: textc})
	})
	.catch((err) => {
		reject(err)
	})
})

const cerpen = async () => new Promise((resolve, reject) => {
	axios.get(`${link}/api/cerpen`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const gay = async () => new Promise((resolve, reject) => {
	axios.get(`${link}/api/howgay`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})
const armpits = () => new Promise((resolve, reject) => {
    console.log('Searching for armpits...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const feets = () => new Promise((resolve, reject) => {
    console.log('Searching for feets...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animefeets')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const thighs = () => new Promise((resolve, reject) => {
    console.log('Searching for thighs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animethighss')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const ass = () => new Promise((resolve, reject) => {
    console.log('Searching for ass...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebooty')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const boobs = () => new Promise((resolve, reject) => {
    console.log('Searching for boobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const belly = () => new Promise((resolve, reject) => {
    console.log('Searching for belly...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const blowjob = () => new Promise((resolve, reject) => {
     console.log('Searching for blowjob...')
     fetchJson('https://nekos.life/api/v2/img/blowjob')
     .then((result) => resolve(result))
     .catch((err) => {
        reject(err)
      })
})

const peluk = () => new Promise((resolve, reject) => {
     console.log('Searching for pelukan...')
     fetchJson('https://nekos.life/api/v2/img/hug')
     .then((result) => resolve(result))
     .catch((err) => {
        reject(err)
      })
})

const sideboobs = () => new Promise((resolve, reject) => {
    console.log('Searching for sideboobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const ahegao = () => new Promise((resolve, reject) => {
    console.log('Searching for ahegao...')
    fetchJson('https://meme-api.herokuapp.com/gimme/ahegao')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const bucin = async () => new Promise((resolve, reject) => {
	axios.get(`${link}/api/howbucins`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})


const spamcall = async (url) => new Promise((resolve, reject) => {
	axios.get(`https://docs-jojo.herokuapp.com/api/spamcall?no=${url}`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const puisi = async () => new Promise((resolve, reject) => {
	const puiti = ['1','3']
	const ranisi = puiti[Math.floor(Math.random() * puiti.length)]
	axios.get(`${link}/api/puisi${ranisi}`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})


const ig = async (url) => new Promise(async (resolve, reject) => {
    const api = 'https://test.mumetndase.my.id/igdl?url='+url
    axios.get(api).then(async(res) => {
        const st = res.data.result
        if(st.status === false){
            resolve(`Asupan tidak ditemukan!! Coba lagi`)
        }else{
            resolve(st)
        }
    }).catch(err => {
        console.log(err)
        resolve(`Server error, try again!`)
    })
})


const ytmp3 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://st4rz.herokuapp.com/api/yta2?url=${url}`)
    .then((res) => {
		resolve(res.data)
    })
    .catch((err) =>{
        reject(err)
    })
})

const ytmp44 = async (url) => new Promise((resolve, reject) => {
	axios.get(`https://st4rz.herokuapp.com/api/yta2?url=${url}`)
	.then((res) => {
		const texty = `JUDUL: ${res.data.title}\nEkstensi: ${res.data.ext}\n\nSedang dikirim...\n\n`
		resolve({link: res.data.thumb, linkfile: res.data.result, text: texty})
	})
	.catch((err) => {
		reject(err)
	})
})

const ytmp4 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://st4rz.herokuapp.com/api/ytv2?url=${url}`)
    .then((res) => {
		resolve(res.data)
    })
    .catch((err) =>{
        reject(err)
    })
})

const matematika = async (soal) => new Promise((resolve, reject) => {
    axios.get(`https://www.symbolab.com/solver/simplify-calculator/${soal}`)
    .then((res) => {
		resolve(res.data.solution_step_result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const stalkig = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        const text = `User: ${res.data.Username}\nName: ${res.data.Name}\nBio: ${res.data.Biodata}\nFollower: ${res.data.Jumlah_Followers}\nFollowing: ${res.data.Jumlah_Following}\nPost: ${res.data.Jumlah_Post}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const stalkigpict = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${url}`)
    .then((res) => {
		if (res.data.error) resolve('https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg')
        resolve(`${res.data.Profile_pic}`)
    })
    .catch((err) =>{
        reject(err)
    })
})

const quote = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/api/randomquotes`)
    .then((res) => {
        const text = `Author: ${res.data.author}\n\nQuote: ${res.data.quotes}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const wiki = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/wiki?q=${url}`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const daerah = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/daerah`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const jadwaldaerah = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://tobz-api.herokuapp.com/api/jadwalshalat?q=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        const text = `Jadwal Sholat ${url}\n\nImsyak: ${res.data.Imsyak}\nSubuh: ${res.data.Subuh}\nDzuhur: ${res.data.Dzuhur}\nAshar: ${res.data.Ashar}\nMaghrib: ${res.data.Maghrib}\nIsya: ${res.data.Isya}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const cuaca = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://rest.farzain.com/api/cuaca.php?id=${url}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    .then((res) => {
		if (res.data.respon.cuaca == null) resolve('Maaf daerah kamu tidak tersedia')
        const text = `Cuaca di: ${res.data.respon.tempat}\n\nCuaca: ${res.data.respon.cuaca}\nAngin: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const indohot = async () => new Promise((resolve, reject) => {
    axios.get(`https://arugaz.herokuapp.com/api/indohot`)
    .then((res) => {
        const text = ` *Tobat Bosq* \n\n *Judul* _${res.data.result.judul}_ \n\n *Status* _${res.data.result.genre}_ \n\n *Durasi* _${res.data.result.durasi}_ \n\n *Link Bosq* _${res.data.result.url}_ `
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const chord = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/chord?q=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const tulis = async (teks) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/nulis?text=${encodeURIComponent(teks)}`)
    .then((res) => {
        resolve(`${res.data.result}`)
    })
    .catch((err) => {
        reject(err)
    })
})

const tulis2 = async (teks) => new Promise((resolve, reject) => {
    axios.get(`https://mhankbarbar.herokuapp.com/nulis?text=${encodeURIComponent(teks)}&apiKey=W18QRotVcBMdK7PXwdEH`)
    .then((res) => {
        resolve(`${res.data.result}`)
    })
    .catch((err) => {
        reject(err)
    })
})

const artinama = async (nama) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/artinama?nama=${nama}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const cekjodoh = async (nama,pasangan) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/jodohku?nama=${nama}&pasangan=${pasangan}`)
	.then((res) => {
		const textc = `Nama : ${res.data.nama}\nPasangan : ${res.data.pasangan}\nPositif: ${res.data.positif}\nNegatif : ${res.data.negatif}`
		resolve({link: res.data.gambar, text: textc})
	})
	.catch((err) => {
		reject(err)
	})
})

const covidindo = async () => new Promise((resolve, reject) => {
	axios.get(`${link}/api/coronaindo`)
	.then((res) => {
		const textv = `Info Covid-19 ${res.data.negara}\n\nKasus Baru: ${res.data.kasus_baru}\nTotal Kasus: ${res.data.kasus_total}\nSembuh: ${res.data.sembuh}\nPenanganan: ${res.data.penanganan}\nMeninggoy: ${res.data.meninggal}\n\nUpdate: ${res.data.terakhir}`
		resolve(textv)
	})
	.catch((err) => {
		reject(err)
	})
})

const bapakfont = async (kalimat) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/bapakfont?kata=${kalimat}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const lirik = async (judul) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/lirik?judul=${judul}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

/**
 * Create valentine image.
 * @param {String} nama 
 * @param {String} pasangan 
 * @param {String} fotoMu 
 * @param {String} fotoPasangan 
 */


module.exports = {
    ytmp3,
    ytmp4,
    stalkig,
    stalkigpict,
    quote,
    wiki,
    daerah,
    jadwaldaerah,
    cuaca,
    whatanime,
    chord,
    tulis,
    tulis2,
	artinama,
	cekjodoh,
	covidindo,
    bapakfont,
    qrcode,
    qrread,
	lirik,
        cerpen,
        gay,
        peluk,
        bucin,
        tiktok,
        cooltext,
        cekzodiak,
        dewabatch,
        spamcall,
        armpits,
        feets,
        thighs,
        ass,
        matematika,
        ig,
        boobs,
        indohot,
        blowjob,
            getLatest,
    getVideo,
        belly,
        nick,
        darkjokes,
        tosticker,
        twit,
        sideboobs,
        nowm,
        ytmp44,
        stickerText,
        shortener,
        ahegao,
        puisi
}
