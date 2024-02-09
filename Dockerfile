RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 23ra97ls7r3ud0r
ENV PM2_SECRET_KEY hc5eh354zyrbg7g

CMD ["pm2-runtime", "bot.js"]
