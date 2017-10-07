console.log("Bot Started");

var Bot = require('./classBot.js');
var bot = new Bot();

var r = Math.floor(Math.random()*100);
bot.tweetIt('This is another test. ' + r);

bot.stream.on('follow', bot.followed); //calls method anytime someone follows me

