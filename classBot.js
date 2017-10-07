function Bot(){


		var Twit = require('twit');
		var config = require('./config'); //contains the object with api keys and tokens and etc

		this.T = new Twit(config);
		this.stream = this.T.stream('user'); //setting up a user stream



	//get tweets that matches searchTerm
	this.getTweets = function(searchTerm){

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


	//send direct message to id 
	this.sendDM = function(id, txt){

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
			}
		}

	}


	//tweet something
	this.tweetIt = function(txt){
			
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