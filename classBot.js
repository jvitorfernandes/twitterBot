class Bot {

	constructor(){

		var Twit = require('twit');
		var config = require('./config'); //contains the object with api keys and tokens and etc

		this.T = new Twit(config);
		this.stream = this.T.stream('user'); //setting up a user stream


	}

	//get tweets that matches searchTerm
	getTweets(searchTerm){a

		var params = {
			q: 'searchTerm', //example: 'banana since:2011-11-11'
			count: 5
		}

		this.T.get('search/tweets', params, gotData); //getting tweets from search

		function gotData(err, data, response) {
		  	var tweets = data.statuses;
		  	for(i=0; i<tweets.length; i++){
		  		console.log(tweets[i].text);
		  	}
		};

	};

	//do something when someone follows
	followed(eventMsg){

		var name = eventMsg.source.name;
		var screenName = eventMsg.source.screen_name;
		var r = Math.floor(Math.random()*100);
		this.sendDM(eventMsg.source.id, "Hi, " + name + "! Thanks for following!");

	};


	//send direct message to id 
	sendDM(id, txt){

		var params = {
			user_id: id,
			text: txt
		}

		this.T.post("direct_messages/new", params, message_sent);

		function message_sent(err, data, response){
			if(err){
				console.log("something went wrong at sendDM");
			}
			else{
				console.log("deu bom");
				console.log(data);
			}
		}

	};


	//tweet something
	tweetIt(txt){
			
		var tweet = {
			status:  txt
		}

		this.T.post("statuses/update", tweet, tweeted);

		function tweeted(err, data, response){
			if (err){
				console.log("something went wrong!");
				console.log(err);
			} 

			else{
				console.log('It worked');
			}
		}

	};


}

module.exports = Bot;