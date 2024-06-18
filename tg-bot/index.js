const TelegramBot = require("node-telegram-bot-api");

const token = "7330075223:AAE_uunxcVXUvfC0rCPpnvGJ9bt-QqbkesA";

const webAppUrl = "https://subtle-paletas-fed0da.netlify.app";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Fill the form below!", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Fill the form",
              web_app: { url: webAppUrl + "/form" },
            },
          ],
        ],
      },
    });

    await bot.sendMessage(chatId, "Fill the form below!", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open App",
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg.web_app_data.data);
      await bot.sendMessage(chatId, "Thank you for filling the form!");
      await bot.sendMessage(chatId, `Country: ${data.country}`);
    } catch (error) {
      console.log(error);
    }
  }
});
