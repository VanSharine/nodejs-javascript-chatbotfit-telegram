const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1270716991:AAFMS5YtjnRSidpKShKLgHTMxV2c7GBLxIQ';


const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function(msg){
	//await bot.startPolling();
	
	const chatId = msg.chat.id;
	console.log(msg.text);

	const dfResponse = await dialogflow.sendMessage(chatId.toString(),msg.text);

	let responseText = dfResponse.text;

	if(dfResponse.intent == 'Treino especifico'){
		responseText =await youtube.searchVideoURL(responseText,dfResponse.fields.corpo.stringValue);
	}

	bot.sendMessage(chatId,responseText);
	//await bot.stopPolling();
});
