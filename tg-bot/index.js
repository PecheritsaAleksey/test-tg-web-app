const TelegramBot = require("node-telegram-bot-api");

const token = "7330075223:AAE_uunxcVXUvfC0rCPpnvGJ9bt-QqbkesA";

const webAppUrl = "https://google.com";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Fill the form below!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Fill the form",
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });
  }
});
