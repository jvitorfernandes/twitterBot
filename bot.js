console.log("Bot Started");

var Twit = require('twit');
var config = require('./config'); //contains the object with api keys and tokens and etc

var T = new Twit(config);
var stream = T.stream('user'); //setting up a user stream


function getTweets(searchTerm){

	var params = {
		q: 'banana since:2011-11-11', //example
		count: 2
	}

	T.get('search/tweets', params, gotData); //getting tweets from search

	function gotData(err, data, response) {
	  	var tweets = data.statuses;
	  	for(i=0; i<tweets.length; i++){
	  		console.log(tweets[i].text);
	  	}
	};
}

function followed(eventMsg){
	console.log(eventMsg);
	console.log("Follow event");
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' thanks for following!');
	dm(eventMsg.source.id, "This is an automatic DM! Thanks for following!");
	// tweetIt("One More follower");
}

function dm(id, txt){

	var params = {
		user_id: id,
		text: txt
	}

	T.post("direct_messages/new", params, message_sent);

	function message_sent(err, data, response){
		if(err){
			console.log("deu ruim");
		}
		else{
			console.log("deu bom");
			console.log(data);
		}
	}
};

function tweetIt(txt){
	
	// var r = Math.floor(Math.random()*100);

	var tweet = {
		status:  txt
	}

	T.post("statuses/update", tweet, tweeted);

	function tweeted(err, data, response){
		if (err){
			console.log("something went wrong!");
		} 

		else{
			console.log('It worked');
		}
	}
}

// setInterval(dm, 1000*20); //calls the tweetIt function every 60 seconds
stream.on('follow', followed); //anytime someone follows me

