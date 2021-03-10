const { decryptMedia } = require('@open-wa/wa-automate');
var admin = require('firebase-admin');
const moment = require('moment');
const set = require('../settings');
const fs = require('fs-extra')
const axios = require("axios").default;
const Nekos = require('nekos.life');
const neko = new Nekos();
const sagiri = require('sagiri');
const config = require('../config.json')
const ms = require('parse-ms')
const toMs = require('ms')
const translate = require('@vitalets/google-translate-api')
const uaOverride = config.uaOverride
const saus = sagiri(config.nao, { results: 5 });

// Library
const _function = require('../lib/function');
const _txt = require('../lib/text');
const color = require('../util/colors');
const { uploadImages } = require('../util/fetcher')
const tugas = JSON.parse(fs.readFileSync('./database/tugas.json'));
const _reminder = JSON.parse(fs.readFileSync('./database/reminder.json'))
const judullist = [];
const daftarlist = [];

function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

function ngelistisi(){
  let list = '';
  list += `${judullist[0]}\n`;
  daftarlist.forEach(function (item, index){
    index = index+1;
    list += `${index}. ${item}\n`
    //client.sendText(from, (index+1) + ". " + item);
  });
  return list;
}

function ngelisttugas(){
  let list = '';
  list += "Daftar tugas : \n"
  tugas.forEach(function (item, index){
    index = index+1;
    list += `${index}. ${item}\n`
    //client.sendText(from, (index+1) + ". " + item);
  });
  return list;
}

//Folder Sistem
//const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
//const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))

//Setting
//let{
//  ownerNumber,
//} = setting

module.exports = async (client, message) => {
  try {
    const msgAmount = await client.getAmountOfLoadedMessages();
    if (msgAmount > 3000) await client.cutMsgCache();

    const { id, body, mimetype, type, t, from, sender, content, caption, author, isGroupMsg, isMedia, chat, quotedMsg, quotedMsgObj, mentionedJidList } = message;
    const { name, shortName, pushname, formattedName } = sender;
    const { formattedTitle, isGroup, contact, groupMetadata } = chat;

    const { ind } = require('../message/text/lang/')

    const botOwner = set.owner;
    const botGroup = set.support;
    const botPrefix = set.prefix;
    const botNumber = (await client.getHostNumber()) + '@c.us';

    const isAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === sender.id).isAdmin : undefined;
    const isOwner = groupMetadata ? groupMetadata.participants.find((res) => res.id === sender.id).isSuperAdmin : undefined;
    const isBotAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === botNumber).isAdmin : undefined;

    const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
    const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
    const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
    const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
    const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
    const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
    const isImage = type === 'image'
    const isVideo = type === 'video'
    const isAudio = type === 'audio'
    const isVoice = type === 'ptt'

    /**
     * Premium code / feature
     * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
     * lakukan donasi melalui link ini https://bit.ly/34IDvrD
     */

    const validMessage = caption ? caption : body;
    if (!validMessage || validMessage[0] != botPrefix) return;

    const command = validMessage.trim().split(' ')[0].slice(1);
    const arguments = validMessage.trim().split(' ').slice(1);
    const arg = validMessage.substring(validMessage.indexOf(' ') + 1)
    const q = arguments.join(' ')
    const senderId = sender.id.split('@')[0] || from.split('@')[0];
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    const santet = [
      'Muntah Paku',
      'Meninggoy',
      'Berak Paku',
      'Muntah Rambut',
      'Ketempelan MONYET!!!',
      'Menjadi Gila',
      'Menjadi manusiawi',
      'jomblo selamanya',
      'ga bisa berak',
      'ketiban pesawat',
      'jadi anak mulung',
      'ga jadi pacar zeus',
      'jadi jelek',
      'noob vr',
      'jadi botfrag terus'
      ]

    // debug
    console.debug(color('green', '➜'), color('yellow', isGroup ? '[GROUP]' : '[PERSONAL]'), `!${command} | ${sender.id} ${isGroup ? 'FROM ' + formattedTitle : ''}`, color('yellow', moment().format()));

    /**
     * Premium code / feature
     * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
     * lakukan donasi melalui link ini https://bit.ly/34IDvrD
     */

    /*
    if (isGroup) {
      if (groupMetadata.participants.length < 10 && !botOwner.includes(groupMetadata.owner)) {
        await client.reply(from, `_⚠️ Ooops... maaf untuk menghidari grup SPAM, bot hanya dapat di gunakan di grup yang mempunyai member lebih dari 10, sedangkan member grup kamu hanya ada *${groupMetadata.participants.length}*_\n\n_Untuk informasi lebih lanjut silahkan tanyakan saya di instagram *https://wa.me/6288225610884*_`, id);
        return client.leaveGroup(from);
      }
    }
    */

    const allChats = await client.getAllChats();
    switch (command) {
      case 'resetlimit':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'unblock':
        if (senderId !== botOwner) return await client.reply(from, '_⛔ Perintah yang kamu maksud hanya dapat digunakan oleh Owner bot!_', id);
        await client.contactUnblock(arguments[0] + 'c.us');
        return await client.reply(from, '_🟢 Berhasil *Unblock* user!_', id);
        break;

      case 'leaveall':
        if (senderId !== botOwner) return await client.reply(from, '_⛔ Perintah yang kamu maksud hanya dapat digunakan oleh Owner bot!_', id);
        const allGroups = await client.getAllGroups();
        allGroups.forEach(async (group) => {
          if (!group.id !== botGroup) {
            await client.leaveGroup(group.id);
          }
        });
        return await client.reply(from, '_🟢 Bot Berhasil keluar dari semua grup yang ada!_', id);
        break;

      case 'resetrank':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'owner':
      case 'contact':
      case 'ownerbot':
        return await client.reply(from, '_👋 Hai, kalo mau req fitur bisa pc ke *https://wa.me/6288225610884*_', id);
        break;

      case 'clearall':
        if (senderId !== botOwner) return await client.reply(from, '_⛔ Perintah yang kamu maksud hanya dapat digunakan oleh Owner bot!_', id);
        allChats.forEach(async (chat) => {
          await client.clearChat(chat.id);
        });
        return await client.reply(from, '_🟢 Berhasil Membersihkan History Message Bot!_', id);
        break;

      case 'bc':
        if (senderId !== botOwner) return await client.reply(from, '_⛔ Perintah yang kamu maksud hanya dapat digunakan oleh Owner bot!_', id);
        if (arguments.length < 1) return;
        await allChats.forEach(async (chat) => {
          await client.sendText(chat.id, arguments.join(' '));
        });
        return await client.reply(from, '_🟢 Berhasil Broadcast kesemua Chat List Bot!_', id);
        break;

      case 'premium':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'ban':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'freespace':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'kickall':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-pakai didalam grup!_', id);
        if (!isOwner) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Owner* grup saja!_', id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Bot *Wajib* dijadikan *Admin* untuk menggunakan perintah ini!_', id);
        await client.reply(from, '_😏 Perintah dilaksanakan! Berharap kamu tau apa yang kamu lakukan!_', id);
        await groupMetadata.participants.forEach(async (participant) => {
          if (!participant.isSuperAdmin) await client.removeParticipant(from, participant.id);
        });
        break;

      case 'start':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'toxic':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'add':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (arguments.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}add 62812....._`, id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        const isNumberValid = await client.checkNumberStatus(arguments[0] + '@c.us');
        if (isNumberValid.status === 200)
          await client
            .addParticipant(from, `${arguments[0]}@c.us`)
            .then(async () => await client.reply(from, '_🎉 Berhasil menambahkan Member, Berikan ucapan Selamat datang!_', id))
            .catch(async (error) => await client.reply(from, '_🥺 Gagal menambahkan member! kemungkinan member sudah diblock oleh Bot! untuk unblockir silahkan DM ke *https://wa.me/6288225610884*_', id));
        break;

      case 'kick':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (mentionedJidList.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}kick @mention_`, id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        const isKicked = await client.removeParticipant(from, mentionedJidList[0]);
        if (isKicked) return await client.reply(from, '_🎉 Berhasil Kick member Berikan Ucapan Selamat Tinggal!_', id);
        break;

      case 'promote':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (mentionedJidList.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}promote @mention_`, id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        const isPromoted = await client.promoteParticipant(from, mentionedJidList[0]);
        if (isPromoted) return await client.reply(from, '_🎉 Berhasil promote member menjadi Admin/Pengurus Grup! Berikan Ucapan Selamat_', id);
        break;

      case 'demote':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (mentionedJidList.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}demote @mention_`, id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        const isDemoted = await client.demoteParticipant(from, mentionedJidList[0]);
        if (isDemoted) return await client.reply(from, '_🎉 Berhasil demote Admin menjadi Member! Ucapkan Kasihan!_', id);
        break;

      case 'revoke':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        await client
          .revokeGroupInviteLink(from)
          .then(async (res) => await client.reply(from, '_🎉 Berhasil Me-reset ulang Invite Link Grup! gunakan !link untuk mendapatkan Link invite Group_', id))
          .catch((error) => console.log('revoke link error!'));
        break;

      case 'link':
      case 'invitelink':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        await client
          .getGroupInviteLink(from)
          .then(async (inviteLink) => await client.reply(from, `_🔗 Group Invite Link : *${inviteLink}*_`, id))
          .catch((error) => console.log('Invite link error'));
        break;

      case 'startvote':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'disconnect':
      case 'kickbot':
      case 'leave':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        client.reply (from, 'Gamao, gw gamao leave', id);
          /*
          .reply(from, '_👋 Terimakasih, atas kenangan selama ini yang kita lalui, kalau kamu rindu gpp masukin aku lagi ke grup kamu! aku akan selalu ada buat kamu!_', id)
          .then(async () => await client.leaveGroup(from))
          .catch((error) => console.log('kickbot error'));
          */
        break;

      case 'notif':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'adminmode':
      case 'silent':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id);
        if (arguments.length !== 1) return await client.reply(from, `_⚠️ Contoh penggunaan Perintah : ${botPrefix}silent on|off_`, id);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id);
        const isSilent = await client.setGroupToAdminsOnly(from, arguments[0].toLowerCase() === 'on');
        if (isSilent) return await client.reply(from, `_🎉 Berhasil set grup ke-*${arguments[0].toLowerCase() === 'on' ? 'Admin Mode' : 'Everyone Mode'}*_`, id);
        break;

      case 'p':
      case 'ping':
      case 'spam':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        const allMembers = groupMetadata.participants.map((member) => `@${member.id.split('@')[0]}`);
        if ( groupMetadata.desc && groupMetadata.desc.includes("#noping") ) 
        { await client.sendText(from, '_*⚠️ Gaboleh spam disini yak*_') } 
        else {
          await client.sendTextWithMentions(from, `_*Summon*_\n\n${allMembers.join('\n')}\n`); }
        break;

      case 'votekick':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'voteinfo':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'vote':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'gjodoh':
      case 'matchme':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        let countMember = groupMetadata.participants.length;
        let randomNumber = Math.floor(Math.random() * (countMember - 1) + 1);
        const randomMembers = groupMetadata.participants[randomNumber];
        const isSenderNumber = randomMembers.id === sender.id;
        await client.sendTextWithMentions(from, isSenderNumber ? `_👬🏼 Yha! jodoh kamu gak ada ditemukan di grup ini, nge-gay aja ya_` : `_❤️ Jodoh @${sender.id.split('@')[0]} kamu digrup ini adalah @${randomMembers.id.split('@')[0]}_`);
        break;

      case 'groupstats':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        let { owner, creation, participants, desc } = groupMetadata;
        const creationTime = moment.unix(creation);
        await client.sendTextWithMentions(from, `_📃 Informasi Grup_\n\n_Nama : ${formattedTitle}_\n_Owner : @${owner.split('@')[0]}_\n_Total Member : ${participants.length}_\n_Tanggal Dibuat : ${creationTime.format('DD MMMM YYYY')}_\n_Jam Dibuat : ${creationTime.format('HH:mm:ss')}_\n_Deskripsi : ${desc ? desc : ''}_`, id);
        break;

      case 'kickme':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (isOwner) return await client.reply(from, '_⛔ Owner grup/Orang ganteng tidak dapat dikick!_', id);
        await client.reply(from, '_😏 Aku harap kamu tau apa yang kamu lakukan!_', id);
        await client.removeParticipant(from, sender.id);
        break;

      case 'mystats':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        const senderPicture = sender.profilePicThumbObj.eurl ? sender.profilePicThumbObj.eurl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        await client.sendImage(from, senderPicture, formattedName, `_🎉 Group Member [ *${formattedTitle}* ]_\n\n_Nama : ${pushname ? pushname : 'Tidak Diketahui'}_\n_Owner Status : ${isOwner ? 'Ya' : 'Tidak'}_\n_Admin Status : ${isAdmin ? 'Ya' : 'Tidak'}_`, id);
        break;

      case 'rob':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'richman':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'pick':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id);
        if (arguments.length < 1) return await client.reply(from, '_Contoh penggunaan perintah : !pick <sifat>_', id);
        const pickSomeone = groupMetadata.participants[Math.floor(Math.random() * groupMetadata.participants.length)];
        await client.sendTextWithMentions(from, `_👦🏼 ${arguments.join(' ')} di grup ini adalah @${pickSomeone.id.split('@')[0]}_`);
        break;

      case 'voice':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}voice <kode> <kalimat>_`, id);
        const voiceUrl = _function.voiceUrl(arguments);
        await client.sendPtt(from, voiceUrl, id);
        break;

      case 'menu':
        return await client.reply(from, _txt.menu, id);
        break;

      case 'info':
        return await client.reply(from, _txt.info, id);

      case 'source':
        return await client.reply(from, _txt.source, id);

      case 'rules':
        return await client.reply(from, _txt.rules, id);
        break;

      case 'faq':
        return await client.reply(from, _txt.faq, id);
        break;

      case 'support':
        await client.addParticipant(botGroup, sender.id);
        return await client.reply(from, 'Kamu sudah ditambahkan kedalam Grup Official Bot Ini!');
        break;

      case 'donate':
      case 'donasi':
        return await client.reply(from, _txt.donate, id);
        break;

      case 'quran':
      case 'quranayat':
        try {
          if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}quranayat <surah> <ayat>_`, id);
          const ayah = await _function.quran.ayat(arguments);
          await client.reply(from, ayah, id);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`);
        }
        break;

      case 'quransurah':
        try {
          if (arguments.length != 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}quransurah <surah>_`);
          const surah = await _function.quran.surah(arguments);
          await client.reply(from, surah, id);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`);
        }
        break;

      case 'murotal':
      case 'murrotal':
      case 'murottal':
        try {
        if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}murrotal <ayat> <surat>_`, id);
        const murottalAudio = await _function.quran.murottal(arguments);
        await client.sendPtt(from, murottalAudio, id);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`);
        }
        break;

      case 'tafsir':
        if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}tafsir <ayat> <surat>_`, id);
        const tafsir = await _function.quran.tafsir(arguments);
        await client.reply(from, tafsir, id);
        break;

        case 'jadwalsholat':
          case 'jadwalsolat':
              if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
              if (!q) return await client.reply(from, ind.wrongFormat(), id)
              await client.reply(from, ind.wait(), id)
              _function.misc.jadwalSholat(q)
                  .then((data) => {
                      data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                          const x = subuh.split(':')
                          const y = terbit.split(':')
                          const xy = x[0] - y[0]
                          const yx = x[1] - y[1]
                          const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                          const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                          await client.reply(from, msg, id)
                          console.log('Success sending jadwal sholat!')
                      })
                  })
                  .catch(async (err) => {
                      console.error(err)
                      await client.reply(from, 'Error!', id)
                  })
          break

      case 'quotes':
        break;

      case 'makequote':
        if (arguments.join(' ').split('@').length < 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}makequote <nama>@<kalimat>_`, id);
        const getMakequote = _function.makequote(arguments);
        await client.sendImage(from, getMakequote, sender.id, '', id);
        break;

      case 'mirip':
        if (mentionedJidList.length > 0 || arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}mirip <nama>_`, id);
        const listNama = ['Udin', 'Uzumaki Bayu', 'Saburo', 'Saruto', 'Yang Lek', 'Uchiha Roy', 'DPR yang korupsi, gendut gendut gak berotak', 'Monyet', 'Maling kandang', 'Maling Dalaman'];
        await client.reply(from, `_👦🏼 *${arguments.join(' ')}* Mirip dengan ${listNama[Math.floor(Math.random() * listNama.length)]}_`, id);
        break;

      case 'gay':
        if (mentionedJidList.length > 0 || arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}gay <nama>_`, id);
        const gayPercentage = Math.floor(Math.random() * 100);
        await client.reply(from, `_👬🏻 Tingkat gay *${arguments.join(' ')}* sebesar ${gayPercentage}%_`, id);
        break;

      case 'brainly':
        if (arguments.length < 1) return client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}brainly <pertanyaan>_`, id);
        const getBrainly = await _function.brainly(arguments.join(' '));
        await client.reply(from, getBrainly, id);
        break;

      case 'sticker':
      case 'stiker':
        if (!mimetype) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim sebuah gambar yang ingin dijadikan stiker lalu berikan caption ${botPrefix}stiker_`, id);
        if (!mimetype.includes('image')) return await client.reply(from, '_⚠️ Pastikan kamu benar mengirim image (gambar)_', id);
        const imagemediadata = await decryptMedia(message);
        const imageb64 = `data:${mimetype};base64,${imagemediadata.toString('base64')}`;
        await client.sendImageAsSticker(from, imageb64);
        break;

      case 'gifsticker':
      case 'gifstiker':
        if (!mimetype) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim sebuah video pendek yang ingin dijadikan stiker lalu berikan caption ${botPrefix}gifstiker_`, id);
        if (!mimetype.includes('mp4')) return await client.reply(from, '_⚠️ Pastikan yang anda kirim adalah file video ber-ekstensi mp4_', id);
        const vidmediadata = await decryptMedia(message);
        const vidb64 = `data:${mimetype};base64,${vidmediadata.toString('base64')}`;
        await client.sendMp4AsSticker(from, vidb64, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 });
        break;

      case 'giphysticker':
      case 'giphystiker':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}giphystiker <giphy url/link>_`, id);
        if (!arguments[0].match(urlRegex)) return await client.reply(from, '_⚠️ Pastikan yang kamu kirimkan adalah url yang benar_', id);
        await client.sendGiphyAsSticker(from, arguments[0]);
        break;

      case 'bucin':
        const katabucin = await _function.bucin();
        await client.reply(from, katabucin, id);
        break;

      case 'jodoh':
        const jodohSplit = arguments.join(' ').split('&');
        if (jodohSplit.length < 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}jodoh <nama kamu>&<nama seseorang>_`);
        const jodohPersentase = Math.floor(Math.random() * 100);
        await client.reply(from, `_💖 Persentase kecocokan ${jodohSplit[0]} & ${jodohSplit[1]} sebesar ${jodohPersentase}_`, id);
        break;

      case 'hitme':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'hitrank':
        /**
         * Premium code / feature
         * Kamu bisa melakukan donasi terlebih dahulu untuk mendapatkan seluruh kode
         * lakukan donasi melalui link ini https://bit.ly/34IDvrD
         */
        break;

      case 'musik':
      case 'music':
        await client.reply(from, "Mon maap, fitur sementara dimatikan karena menyebabkan ketidakstabilan server 🙏", id);
        break;
        /*
        if (arguments.length < 1) return await client.reply(from, '_⚠️ Contoh Penggunaan Perintah : !music <title>_', id);
        const musicLink = await _function.youtubeMusic(arguments.join(' '));
        if (!musicLink) return await client.reply(from, '_⚠️ Pastikan music yang anda inginkan dibawah 10 menit!_', id);
        try {
        await client.sendPtt(from, "${musicLink}", id);
        console.log("music download success " + musicLink);
        } catch (err) {
        console.log("music download error " + musicLink);
        console.log(err.stack);
        }
        //await client.sendPtt(from, musicLink, id);
        break;
        */

      case 'downtiktok':
        return await client.reply(from, '_🛑 Fitur sedang dalam pengerjaan!_', id);
        break;

      case 'downtwitter':
        return await client.reply(from, '_🛑 Fitur sedang dalam pengerjaan_', id);
        break;

      case 'downfacebook':
        return await client.reply(from, '_🛑 Fitur sedang dalam pengerjaan_', id);
        break;

      case 'downinstagram':
        return await client.reply(from, '_🛑 Fitur sedang dalam pengerjaan_', id);
        break;

      case 'lyrics':
      case 'lirik':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}lirik <judul lagu>_`, id);
        const getLyrics = await _function.lirik(arguments.join(' '));
        if (!getLyrics) return await client.reply(from, `_🥺 Lirik *${arguments.join(' ')}* Tidak Ditemukan!_`, id);
        await client.reply(from, getLyrics, id);
        break;

      case 'short':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}short <url/link yang ingin di perkecil>_`, id);
        const getShortener = await _function.short(arguments[0]);
        await client.reply(from, `_${getShortener}_`, id);
        break;

      case 'corona':
      case 'covid':
        const getCovid = await _function.covid(arguments.join(' '));
        await client.reply(from, getCovid || '_⚠️ Negara yang kamu maksud sepertinya tidak ter-data!_', id);
        break;

      case 'cat':
        const getCat = await _function.cat();
        await client.sendImage(from, getCat || 'https://cdn2.thecatapi.com/images/uvt2Psd9O.jpg', `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'dog':
        const getDog = await _function.dog();
        await client.sendImage(from, getDog || 'https://images.dog.ceo/breeds/cattledog-australian/IMG_3668.jpg', `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'meme':
        const getMeme = await _function.meme();
        await client.sendFile(from, getMeme.picUrl || 'https://i.redd.it/5zm5i8eqw5661.jpg', `${t}_${sender.id}.${getMeme.ext}`, '', id);
        break;

      case 'anime':
        if (arguments.length < 1) return await client.reply(from, `_Penggunaan : ${botPrefix}anime <judul>_`, id);
        const getAnime = await _function.animesearch(arguments.join(' '));
        await client.sendImage(from, getAnime.picUrl, `${t}_${sender.id}.jpg`, getAnime.caption, id);
        break;

      case 'stikernobg':
        return await client.reply(from, '_⚠️ Fitur Proses perbaikan/pengerjaan!_', id);
        break;

      case 'stickertottext':
      case 'stikerteks':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}stikerteks <kalimat>_`, id);
        const teksLink = _function.tosticker(arguments);
        await client.sendStickerfromUrl(from, teksLink);
        break;

      case 'wikipedia':
      case 'wiki':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}wiki <keywords>_`, id);
        const getWiki = await _function.wiki(arguments.join(' '));
        if (!getWiki) return await client.reply(from, `_⚠️ *${arguments.join(' ')}* pada Wikipedia tidak ditemukan_`, id);
        await client.sendImage(from, getWiki.picUrl, `${t}_${sender.id}.jpg`, getWiki.caption, id);
        break;

      case 'imagequote':
        const getImagequote = await _function.imgquote();
        await client.sendImage(from, getImagequote, `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'join':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}join <grup link>_`, id);
        const joinStatus = await client.joinGroupViaLink(arguments[0]);
        if (joinStatus === 406) return await client.reply(from, '_⚠️ Pastikan yang kamu masukkan adalah URL grup yang benar!_', id);
        if (joinStatus === 401) return await client.reply(from, '_⚠️ Bot Tidak dapat Join, karena baru-baru ini bot baru saja di kick dari grup tersebut!_', id);
        await client.reply(from, '_🚀 Meluncur! Bot berhasil masuk grup!_', id);
        break;

      case 'roll':
        const rollNumber = Math.floor(Math.random() * (6 - 1) + 1);
        await client.sendStickerfromUrl(from, `https://www.random.org/dice/dice${rollNumber}.png`);
        break;

      case 'weather':
      case 'cuaca':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}cuaca <nama kota>_`, id);
        const getWeather = await _function.weather(arguments.join(' '));
        await client.reply(from, getWeather, id);
        break;

      case 'movie':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}movie <judul>_`, id);
        const getMovie = await _function.movie(arguments.join(' '));
        if (!getMovie) return await client.reply(from, `_⚠️ ${arguments.join(' ')} Tidak ditemukan!_`, id);
        await client.sendImage(from, getMovie.moviePicture, `${t}_${sender.id}.jpeg`, getMovie.movieCaption, id);
        break;

      case 'run':
        const { chatId, body } = message;
        try {
          let msg = body.replace("#run ", "").split("\n");
          const lang = msg.splice(0, 1)[0];
          const source = msg.join("\n");
          const response = await axios.post(
            "https://emkc.org/api/v1/piston/execute",
            {
              language: lang,
              source: source,
            }
          );
          const { ran, language, output, version, code, message } = response.data;
          const reply = `${
            ran ? "Ran" : "Error running"
          } with ${language} v${version}\nOutput:\n${output}`;
          client.sendText(from, reply);
        } catch (e) {
          console.log(e);
          client.sendText(from, "Unsupported language");
        }
        break;

      case 'run languages':
        const response = await axios.get(
          "https://emkc.org/api/v1/piston/versions"
        );
        const reply = response.data
          .map((item) => `${item.name} - v${item.version}`)
          .join("\n");
        client.sendText(from, reply);
        break;

      case 'loginvr':
        const vr = "Login vr dong \n yasman @6281285600258 \n hadid @6281329989383 \n junas @628978113198 \n barra @6281388088047 \n titan @6287788087760 \n sean @6283818448972 \n ari @6281299115053 \n dito @6285155277438";
        await client.sendTextWithMentions(from, vr);
        break;

      case 'loginml':
        const ml = `Login ml dong
aji @628888418207
wahyu @6281413543830
yasman @6281285600258
junas @628978113198
ikhsan @6281510026269
sese @6281511529199
dito @6285155277438
jidni @62895330810346`;

        await client.sendTextWithMentions(from, ml);
        break;
        
      case 'addtugas':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}addtugas | <detail tugas>_`, id);
        const isitugas = arg.split('|')[1];
        const tugasin = tugas.push(isitugas);
        fs.writeFileSync('./jsonfolder/tugas.json', JSON.stringify(tugas));
        if (tugasin) return await client.reply(from, '📚 Tugas sudah ditambahkan!', id)
        break;
      
      case 'listtugas':
        if (!tugas.length || tugas.length == 0){
          await client.reply(from, "Gaada tugas ntap", id);
        } else {
          const listtugas = ngelisttugas()
          await client.reply(from, listtugas, id);
        }
        break;
      
      case 'hapustugas':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix} <nomor tugas>_`, id);
        var i = arguments[0];
        i--;
        const hapusintugaslist = tugas.splice(i, 1);
        fs.writeFileSync('./jsonfolder/tugas.json', JSON.stringify(tugas));
        //const hapusin = delete tugas[i];
        if (hapusintugaslist) return await client.reply(from, "Tugas dengan nomor " + arguments + " sudah dihapus", id);
        break;

      //Stiker commands

      case 'halo':
        await client.sendFileFromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/haloo.mp3', "halo.aac", "Haloo", null, null, null, true);
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/haloo.png');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/halo2.jpeg');
        break;

      case 'asep':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/asep1.png');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/asep2.png');
        break;

      case 'tabah':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/tabah1.jpeg');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/tabah2.jpg');
        break;

      case 'lutelat':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/lotelat.jpeg');
        break;

      case 'bayu':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/bayu1.jpeg');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/bayu2.jpeg');
        break;

      case 'payoy':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/payoy.jpg');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/payoy.jpg');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/payoy2.jpeg');
        break;

      case 'teja':
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/teja1.jpg');
        await client.sendStickerfromUrl(from, 'https://tesuu.luii-index.workers.dev/2:/stiker/teja2.webp');
        break;

      case 'resi':
        if (arguments.length !== 2) return client.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${botPrefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id);
        const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex'];
        if (!kurirs.includes(arguments[0])) return client.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`);
        console.log('Memeriksa No Resi', arguments[1], 'dengan ekspedisi', arguments[0]);
        _function.cekResi(arguments[0], arguments[1]).then((result) => client.sendText(from, result));
        break;

      case 'nhder':
        if (arguments.length !== 1) return await client.reply(from, 'Silakan masukkan kode dengan benar!', id)
        await client.reply(from, ind.wait(), id)
        try {
            const kodeDojin = arguments[0]
            const proccessLink = `https://nhder.herokuapp.com/download/nhentai/${kodeDojin}/zip`
            const captionDojin = `------[ NHENTAI DOWNLOADER ]------\n\n➸ Kode doujin: ${kodeDojin}`
            await client.sendText(from, captionDojin)
            await client.sendFileFromUrl(from, proccessLink, `${kodeDojin}.zip`, '' , id)
        } catch (err) {
            console.error(err)
              await client.reply(from, `Error!\n${err}`, id)
        }
        break
      
        case 'santet':
          if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
          if (mentionedJidList.length === 0) return client.reply(from, 'Tag member yang mau disantet\n\nContoh : /santet @tag | kalo berak kaga di siram', id)
          if (arguments.length === 1) return client.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : /santet @tag | kalo berak kaga di siram', id)
              const terima1 = santet[Math.floor(Math.random() * (santet.length))]
              const target = arg.split('|')[0]
              const alasan = arg.split('|')[1]
              await client.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}\n\nJenis Santet Yang di Terima Korban adalah *${terima1}*`)
          break

        case 'addjudullist':
          if (arguments.length === 0) return client.reply(from, `Buat list dengan judul\n\nContoh : ${botPrefix}addjudullist | <judul list>`, id);
          if (judullist.length > 0) return client.reply(from, `Mohon untuk reset list terlebih dahulu dengan command ${botPrefix}resetlist`, id);
          const isijudullist = arg.split(`|`)[1];
          const judulin = judullist.push(isijudullist);
          if (judulin) return client.reply(from, `List sudah ditambahkan, untuk menambahkan isi list menggunakan command ${botPrefix}addlist | <isi list>`, id);
          break;
        
        case 'addlist':
          if (arguments.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id);
          const isilist = arg.split(`|`)[1];
          const isiin = daftarlist.push(isilist);
          if (isiin) {
            const isidaftar = ngelistisi();
            client.reply(from, isidaftar, id);
          }
          break;
        
        case 'hapuslist':
          if (arguments.length === 0) return client.reply(from, `Hapus item pada List dengan nomor item\n\nContoh : ${botPrefix}hapuslist 1`, id);
          if (daftarlist.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id);
          var i = arguments[0];
          i--;
          const hapusinlist = daftarlist.splice(i, 1);
          if (hapusinlist){
            client.reply(from, `Item dengan nomor ${arguments} telah dihapus !`);
            const isidaftar = ngelistisi();
            client.sendText(from, isidaftar);
          }
          break;

        case 'outputlist':
          if (daftarlist.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id);
          const isidaftar = ngelistisi();
          client.reply(from, isidaftar, id);
          break;

        case 'resetlist':
          while (daftarlist.length) { 
            daftarlist.pop(); 
          }
          while (judullist.length) { 
            judullist.pop(); 
          }
          if (daftarlist.length === 0 && judullist.length === 0) return client.reply(from, `List sudah di reset !`, id);
          break;

      case 'alkitab':
        if (arguments.length === 0) return client.reply(from, `Mengirim detail ayat al-kitab dari pencarian \n\nContoh : ${botPrefix}alkitab <pencarian>`, id);
        if (!q) return await client.reply(from, ind.wrongFormat(), id)
        await client.reply(from, ind.wait(), id)
        _function.misc.alkitab(q)
            .then(async ({ result }) => {
                let alkitab = '-----[ *AL-KITAB* ]-----'
                for (let i = 0; i < result.length; i++) {
                    alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                }
                await client.reply(from, alkitab, id)
                console.log('Success sending Al-Kitab!')
            })
        break

      case 'reminder': // by Slavyan
        const remindhelp= `
*${botPrefix}reminder*
Pengingat. 
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${botPrefix}reminder* 10s | pesan_pengingat
        `
        if (arguments.length === 0) return client.reply(from, remindhelp, id)
        if (!q.includes('|')) return await client.reply(from, ind.wrongFormat(), id)
        const timeRemind = q.substring(0, q.indexOf('|') - 1)
        const messRemind = q.substring(q.lastIndexOf('|') + 2)
        const parsedTime = ms(toMs(timeRemind))
        _function.reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
        await client.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.days} hari ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
        const intervRemind = setInterval(async () => {
            if (Date.now() >= _function.reminder.getReminderTime(sender.id, _reminder)) {
                await client.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${_function.reminder.getReminderMsg(sender.id, _reminder)}`)
                _reminder.splice(_function.reminder.getReminderPosition(sender.id, _reminder), 1)
                fs.writeFileSync('./database/reminder.json', JSON.stringify(_reminder))
                clearInterval(intervRemind)
            }
        }, 1000)
        break

      case 'infohoax':
        await client.reply(from, ind.wait(), id)
        _function.misc.infoHoax()
          .then(async ({ result }) => {
              let txt = '*「 HOAXES 」*'
              for (let i = 0; i < result.length; i++) {
                  const { tag, title, link } = result[i]
                  txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
              }
              await client.sendFileFromUrl(from, result[0].image, 'hoax.jpg', txt, id)
              console.log('Success sending info!')
          })
          .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id)
          })
        break

      case 'translate':   
          if (arguments.length === 0) return client.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${botPrefix}translate <kode_bahasa>\ncontoh ${botPrefix}translate id\n\nAtau dengan perintah ${botPrefix}translate <bahasa> | <teks>`, id)
          if (q.includes('|')){
            const texto = arg.split('|')[1]
            const languaget = arg.split(' |')[0]
            _function.translate(texto, languaget).then((result) => client.sendText(from, result)).catch(() => client.sendText(from, 'Error noreply, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'))
            //translate(texto, {to: languaget}).then(res => {client.reply(from, res.text, id)}).catch(() => client.sendText(from, 'Error, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'))
          } else { const quoteText = quotedMsg.body
            _function.translate(quoteText, arguments[0])
                .then((result) => client.sendText(from, result))
                .catch(() => client.sendText(from, 'Error reply, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'))}
          //if (!quotedMsg) return client.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${botPrefix}translate <kode_bahasa>\ncontoh ${botPrefix}translate id`, id)
          break

      //Weeb Zone
      case 'neko':
        console.log('Getting neko image...')
        await client.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
          .then(() => console.log('Success sending neko image!'))
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id)
          })
        break

      case 'animewall':
        console.log('Getting wallpaper image...')
          await client.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
            .then(() => console.log('Success sending wallpaper image!'))
            .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id )
          })
        break

      case 'kusonime':
        if (arguments.length === 0) return client.reply(from, `Mengirim details anime dari web Kusoanime\n\nContoh : ${botPrefix}kusonime <judul anime>`, id);
        _function.weeaboo.anime(q)
          .then(async ({ info, link_dl, sinopsis, thumb, title, error, status }) => {
            if (status === false) {
              return await client.reply(from, error, id)
            } else {
              let animek = `${title}\n\n${info}\n\nSinopsis: ${sinopsis}\n\nLink download:\n${link_dl}`
              await client.sendFileFromUrl(from, thumb, 'animek.jpg', animek, null, null, true)
                .then(() => console.log('Success sending anime info!'))
            }
          })
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id)
          })
        break
      
      case 'komiku':
        _function.weeaboo.manga(q)
          .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
            let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
            await client.sendFileFromUrl(from, thumb, 'mangak.jpg', mangak, null, null, true)
              .then(() => console.log('Success sending manga info!'))
          })
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id)
          })
        break
      
      case 'wait':
        if (!mimetype) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim sebuah gambar screenshot yang ingin dicari sumber anime nya lalu berikan caption ${botPrefix}wait_`, id);
        if (isMedia && isImage || isQuotedImage){
          await client.reply(from, ind.wait(), id)
          const encryptMedia = isQuotedImage ? quotedMsg : message
          const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
          const mediaData = await decryptMedia(encryptMedia, uaOverride)
          const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
          _function.weeaboo.wait(imageBase64)
            .then(async (result) => {
              if (result.docs && result.docs.length <= 2) {
                return await client.reply(from, 'Anime not found! :(', id)
              } else {
                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                let teks = ''
                teks += `*Anime Result*\n\n`
                if (similarity < 0.9) {
                  client.reply('Low similiarity. \n\nMungkin anda bisa mencoba crop terlebih dahulu atau dengan gambar lain')
                } else {
                  teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                  const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                  console.log(video)
                  try {
                    await client.sendFileFromUrl(from, video, `waitresult.mp4`, teks, id)
                    .then(() => console.log('Success sending anime source!'))
                  } catch (error) {
                    await client.reply(from, teks, id)
                    console.log('Video send error, trying without video')
                    console.log(error.stack)
                  }
                }
              }
            })
              .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id)
            })
          }
        break

      case 'sauce':
        if (isMedia && isImage || isQuotedImage) {
          await client.reply(from, ind.wait(), id)
          const encryptMedia = isQuotedImage ? quotedMsg : message
          const mediaData = await decryptMedia(encryptMedia, uaOverride)
          try {
              const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
              console.log('Searching for source...')
              const results = await saus(imageLink)
              for (let i = 0; i < results.length; i++) {
                  let teks = ''
                  if (results[i].similarity < 80.00) {
                      teks = 'Low similarity. 🤔\n\n'
                  } else {
                      teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                      await client.sendLinkWithAutoPreview(from, results[i].url, teks)
                          .then(() => console.log('Source found!'))
                  }
              }
          } catch (err) {
              console.error(err)
              await client.reply(from, 'Error!', id)
          }
        } else {
          await client.reply(from, ind.wrongFormat(), id)
        }
        break

      case 'waifu':
        await client.reply(from, ind.wait(), id)
        _function.weeaboo.waifu(false)
          .then(async ({ url }) => {
            await client.sendFileFromUrl(from, url, 'waifu.png', '', id)
              .then(() => console.log('Success sending waifu!'))
          })
            .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id)
            })
        break
      
      case 'anitoki':
        await client.reply(from, ind.wait(), id)
        _function.weeaboo.anitoki()
          .then(async ({ result }) => {
              let anitoki = '-----[ *ANITOKI LATEST* ]-----'
              for (let i = 0; i < result.length; i++) {
                anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
              }
                await client.reply(from, anitoki, id)
          })
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id)
          })
        break

      case 'neonime':
        await client.reply(from, ind.wait(), id)
        _function.weeaboo.neonime()
          .then(async ({ status, result }) => {
              if (status !== 200) return await client.reply(from, 'Not found.', id)
              let neoInfo = '-----[ *NEONIME LATEST* ]-----'
              for (let i = 0; i < result.length; i++) {
                const { date, title, link, desc } = result[i]
                neoInfo += `\n\n➸ *Title*: ${title}\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
              }
                await client.reply(from, neoInfo, id)
                console.log('Success sending Neonime latest update!')
          })
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id)
          })
        break
      
        case 'animesticker':
        _function.weeaboo.snime()
            .then(async (body) => {
                const wifegerak = body.split('\n')
                const wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                await client.sendStickerfromUrl(from, wifegerakx)
            })
            .catch(async (err) => {
                console.error(err)
                await client.reply(from, 'Error!', id)
            })
    break

      default:
        client.reply(from, `Salah command, mohon cek ${botPrefix}menu untuk daftar command`, id)
        return console.debug(color('red', '➜'), color('yellow', isGroup ? '[GROUP]' : '[PERSONAL]'), `!${command} | ${sender.id} ${isGroup ? 'FROM ' + formattedTitle : ''}`, color('yellow', moment().format()));
    }

    return;
  } catch (err) {
    console.log(err);
  }
};
