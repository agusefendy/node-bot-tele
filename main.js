require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { webHook: { port: process.env.PORT } });
bot.setWebHook(`https://${process.env.VERCEL_URL}/webhook`);
app.post(`/webhook`, (req, res) => {
  //   bot.processUpdate(req.body);
  const update = req.body;
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Menangani command /start
    if (text === "/start") {
      const responseText = "Selamat datang! Bot ini siap menerima perintah.";
      bot.sendMessage(chatId, responseText);
    }

    // Menangani command /help
    else if (text === "/help") {
      const helpText =
        "Daftar Perintah:\n/start - Memulai bot\n/help - Menampilkan bantuan ini";
      bot.sendMessage(chatId, helpText);
    } else {
      // Respon untuk text apapun selain command yang dikenali
      const echoText = `Anda berkata: ${text}`;
      bot.sendMessage(chatId, echoText);
    }
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
