const prefix = require('../../settings').prefix;

const menu = `
*LuiiBot*

*📖 --Perintah Group-- 📖*

⌖ ${prefix}kickall
⌖ ${prefix}add [62812...]
⌖ ${prefix}kick [@mention]
⌖ ${prefix}promote [@mention]
⌖ ${prefix}demote [@mention]
⌖ ${prefix}revoke
⌖ ${prefix}link
⌖ ${prefix}silent [on|off]

⌖ ${prefix}ping
⌖ ${prefix}gjodoh
⌖ ${prefix}groupstats
⌖ ${prefix}kickme
⌖ ${prefix}mystats
⌖ ${prefix}pick [Orang Ganteng]

*📖 Perintah Umum 📖*

⌖ ${prefix}menu
⌖ ${prefix}rules
⌖ ${prefix}info
⌖ ${prefix}faq
⌖ ${prefix}support

*📖 Perintah Muslim 📖*

⌖ ${prefix}jadwaladzan [Kota]
⌖ ${prefix}quransurah [Surah]
⌖ ${prefix}quranayat [Surah] [Ayat]
⌖ ${prefix}murottal [Ayat] [Surat]
⌖ ${prefix}tafsir [Ayat] [Surat]


*📖 Perintah Fun 📖*

⌖ ${prefix}voice [Teks]
⌖ ${prefix}makequote [nama@kalimat]
⌖ ${prefix}mirip [nama seseorang]
⌖ ${prefix}gay [nama seseorang]
⌖ ${prefix}bucin
⌖ ${prefix}cat
⌖ ${prefix}dog
⌖ ${prefix}meme
⌖ ${prefix}roll
⌖ ${prefix}imagequote
⌖ ${prefix}jodoh [nama&nama]

*📖 Perintah Edukasi 📖*

⌖ ${prefix}brainly [pertanyaan]
⌖ ${prefix}wiki [query]
⌖ ${prefix}translate [kode bahasa]

*📖 Perintah Stiker 📖*

⌖ ${prefix}sticker
⌖ ${prefix}gifsticker
⌖ ${prefix}giphysticker [giphy url]
⌖ ${prefix}stikerteks [Kalimat]

*📖 Perintah Musik 📖*

⌖ ${prefix}music [Judul]
⌖ ${prefix}lirik [Judul]
⌖ ${prefix}short [URL]
⌖ ${prefix}covid [Negara]

*📖 Perintah Lainnya 📖*

⌖ ${prefix}anime [Judul]
⌖ ${prefix}join [Group Link]
⌖ ${prefix}weather [Kota]
⌖ ${prefix}movie [Judul]
⌖ ${prefix}contact
⌖ ${prefix}resi [Kurir] [Nomor resi]

*📖 Perintah Bot Owner/Admin 📖*

⌖ ${prefix}resetlimit
⌖ ${prefix}unblock
⌖ ${prefix}leaveall
⌖ ${prefix}resetrank
⌖ ${prefix}clearall
⌖ ${prefix}bc
⌖ ${prefix}premium
⌖ ${prefix}ban
⌖ ${prefix}freespace

*📖 Perintah Koding 📖*
⌖ ${prefix}run languages
⌖ ${prefix}run [code]

*📖 Perintah Tugas 📖*
⌖ ${prefix}addtugas
⌖ ${prefix}listtugas
⌖ ${prefix}hapustugas

*📖 Perintah mention 📖*
⌖ ${prefix}spam
⌖ ${prefix}loginvr
⌖ ${prefix}loginml

*📖 Preloaded Stickers 📖*
${prefix}halo, ${prefix}asep, ${prefix}tabah, ${prefix}lutelat, ${prefix}bayu, ${prefix}payoy, ${prefix}teja
`;

const rules = `
*📖 Rules/Peraturan Pemakaian Bot 📖*

⌖ Seluruh Tanggung Jawab diserahkan kepada pengguna
⌖ Gunakan Bot seperlunya saja, Jangan di gunakan sebagai alat untuk SPAM
⌖ Jangan sesekali menelpon Bot

_*Catatan :*_ Apabila melanggar peraturan-peraturan diatas, Pengguna akan di Blockir oleh Bot dan dibanned oleh Bot. Pengguna tidak akan bisa lagi menggunakan Bot tersebut.

Silahkan kontak Developer di Instagram *@rzkytmgrr*
`;

const donate = `
*📖 Donasi Bot 📖*

⌖ Saweria https://bit.ly/3rFdnrE
⌖ Trakteer https://bit.ly/2KJTKOj

Donasi kalian sangat bermanfaat untuk Developer mengembangkan Bot.
`;

const source = `
*📖 Source Code 📖*

Source code bot ini
⌖ https://bit.ly/2L0WgiY
`;

const info = `
*📖 Informasi 📖*

New Update
⌖ - 

_*Catatan :*_ Bot sedang dalam masa perbaikan dan penyempurnaan.
`;

const faq = `
*📖 Frequently Asked Questions 📖*

⌖ *Bagaimana cara menggunakan Bot ?*
― Kirim pesan dengan menggunakan ${prefix} diawal perintah ke personal pesan Bot atau ke Grup yang didalamnya terdapat Bot

⌖ *Apa saja yang dapat dilakukan oleh Bot ?*
― Pengguna dapat melihat perintah-perintah apa saja yang dapat dilakukan oleh Bot dengan mengirimkan pesan perintah ${prefix}menu

⌖ *Siapa yang membuat Bot ini ?*
― Mari berkenalan melalui Instagram *@rzkytmgrr*
`;

module.exports = { menu, donate, rules, source, info, faq };
