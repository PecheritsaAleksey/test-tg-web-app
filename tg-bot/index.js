const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "7330075223:AAE_uunxcVXUvfC0rCPpnvGJ9bt-QqbkesA";

const webAppUrl = "https://subtle-paletas-fed0da.netlify.app";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port 8808");
});

app.post("/web-data", async (req, res) => {
  const { queryId, products = [], totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: {
        message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
          .map((item) => item.title)
          .join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({});
  }
});
