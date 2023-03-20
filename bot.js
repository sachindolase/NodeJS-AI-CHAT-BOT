const Telegram = require("node-telegram-bot-api");
const {Configuration, OpenAIApi} = require("openai");
const botToken = 
"6273019804:AAHN6k0tW4_EV7eJXF4KCcI1wU5UFOjqqko";   //   Bot Token  //

const openaiToken = 
"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"   // Open AI Token //

const config = new Configuration({
    apiKey: openaiToken,
});
const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) =>{
    bot.sendMessage(msg.chat.id, "welcome To AI ChatBot!");
});
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    const reply = await openai.createCompletion({
     max_tokens:100,
     model:"ada",
     prompt:msg.text,
     temperature:0.5,
    });

    bot.sendMessage(chatId, reply.data.choices[0].text);
});


