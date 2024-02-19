RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY x7axkgm4nnp9vpy
ENV PM2_SECRET_KEY r2xdbct938uavx4

CMD ["pm2-runtime", "bot.js"]
