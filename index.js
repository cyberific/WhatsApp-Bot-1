const { create, decryptMedia } = require("@open-wa/wa-automate");

const win = {executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"}
const linux = {executablePath: "/usr/bin/google-chrome-stable"}
const mac = {executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}

const configObject = {
  sessionId: "SAD_CLIENT",
  authTimeout: 0,
  autoRefresh: true,
  cacheEnabled: false,
  chromiumArgs: [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--aggressive-cache-discard',
  '--disable-cache',
  '--disable-application-cache',
  '--disable-offline-load-stale-cache',
  '--disk-cache-size=0'],
  disableSpins: true,
  headless: true,
  qrRefreshS: 20,
  qrTimeout: 0,
};


const ops = process.platform;
if (ops === "win32" || ops === "win64") {const assignObj = Object.assign(configObject, win)}
else if (ops === "linux") {const assignObj = Object.assign(configObject, linux)}
else if (ops === "darwin") {const assignObj = Object.assign(configObject, mac)};

const startBot = async () => {
  try {
    const Handler = require("./handler");
    const Client = await create(configObject);

    await Client.onStateChanged(async (state) => {
      if (state === "TIMEOUT" || state === "CONFLICT" || state === "UNLAUNCHED") await Client.forceRefocus();
      console.log("State Changed >", state);
    });

    await Client.onMessage((message) => {
      Handler.messageHandler(Client, message);
    });

    await Client.onGlobalParticipantsChanged((event) => {
      Handler.globalParticipantsChanged(Client, event);
    });

    await Client.onAddedToGroup((event) => {
      Handler.addedToGroup(Client, event);
    });

    await Client.onIncomingCall(async (call) => {
      const { peerJid } = call;
      //await Client.contactBlock(peerJid);
      await Client.sendText(peerJid, "_⚠️ Bot lagi sibuk, jangan Telpon oey!_");
    });
  } catch (err) {
    console.log(err.stack)
  }
};

startBot();
