console.log("Bot Started");

var Bot = require('./classBot.js');
var bot = new Bot();
var r = Math.floor(Math.random()*100);

bot.stream.on('follow', followed); //calls method anytime someone follows me
bot.stream.on('tweet', tweetEvent);

//do something when someone follows
function followed(eventMsg){

	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	console.log(name + " followed");
	var r = Math.floor(Math.random()*100);
	bot.tweetIt("This is a test. " + r);
	bot.sendDM(eventMsg.source.id, "Hi, " + name + "! Thanks for following!");

};

//replys a tweet
function tweetEvent(eventMsg){
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log(replyto, from);

	if(replyto === 'bot_senario'){
		bot.tweetIt("@" + from + " thanks for tweeting me!");
	}
};