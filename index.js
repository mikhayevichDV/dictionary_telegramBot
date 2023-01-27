const {Telegraf} = require('telegraf');
const axios = require("axios");

const bot = new Telegraf('5812635735:AAF8vZhD-J4356RrHPEXzw-8iuEwRyuJYKU');
bot.start((ctx) => ctx.reply('Hello!'));
bot.on('message', async (ctx) => {
   try{
       const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${ctx.message.text}`
        const response = await axios.get(url);
       console.log(response)
           ctx.reply(`Your answer(s): `)
           response.data.map(elem => elem.meanings[0].definitions.map((elem) => ctx.reply(`${elem.definition}`)))
   } catch (e) {
       console.error(e)
       ctx.reply('No definition found')
   }
})
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));