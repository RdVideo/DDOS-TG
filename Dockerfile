FROM ubuntu:22.04
RUN apt-get update -y && \
     apt-get upgrade -y && \
     apt-get install nodejs -y && \
     apt-get install npm -y && \
     npm i net && \
     npm i http2 && \
     npm i tls && \
     npm i cluster && \
     npm i url && \
     npm i crypto && \
     npm i fs && \
     npm i axios && \
     npm i cheerio && \
     npm i gradient-string && \
     npm i node-telegram-bot-api && \
     npm i shell-quote
CMD ["node"], ["bot.js"]
