console.log("Bot Started");

var Bot = require('./classBot.js');
var bot = new Bot();
var r = Math.floor(Math.random()*100);

bot.stream.on('follow', followed); //calls method anytime someone follows me

	//do something when someone follows
	function followed(eventMsg){

		var name = eventMsg.source.name;
		var screenName = eventMsg.source.screen_name;
		console.log(name + " followed")
		var r = Math.floor(Math.random()*100);
		bot.tweetIt("This is a test. " + r);
		bot.sendDM(eventMsg.source.id, "Hi, " + name + "! Thanks for following!");

	};


