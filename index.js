const { Telegraf } = require('telegraf');
const axios = require("axios");

const bot = new Telegraf('5812635735:AAF8vZhD-J4356RrHPEXzw-8iuEwRyuJYKU');
bot.start((ctx) => ctx.reply('Welcome'));
bot.on('message', async (ctx)=>{
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${ctx.message.text}`
    const response = await axios.get(url);
    ctx.reply(`Твой ответ - `)
    const reply = response.data.map(elem=>elem.meanings[0].definitions.map((elem)=> ctx.reply(`${elem.definition}`) ))
    console.log(reply)
    })
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));