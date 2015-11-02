var twitter = require("twit");
var mongoose = require('mongoose');
var TweetsSchema = mongoose.model("Tweets");

var twitter_client = new twitter({
  consumer_key: "M8S92g75F6ETn5StBn0YHWloG",
  consumer_secret: "U0BX2d5cKOIvfUfPEKnVdotT3NyQA6qx2GxyKUfEDmdvBJiDLk",
  access_token: "3410294480-fOGrzKaGnFP6c7tU0HNybDOJemEGDYxOgd8NEVS",
  access_token_secret: "ZSgXtm82LG3n4QGR3y3K0wrQo1972pcSlFR8PQN7GAFM5"
});

var online_users = [];

function printOnlineUsers() {
	console.log("# Users online: " + online_users.length);
}

module.exports = function streamTweets(io) {

	/**
	* Listener for client connection
	*/
	io.on('connection', function(socket) {
		console.log("connected");		
		//add user to online_users array on connection
		if(online_users.indexOf(socket.id) === -1) {
			online_users.push(socket.id);
			printOnlineUsers();
		}

		//start the stram when server receives the ready event from the client
		socket.on('ready_to_stream', function(){
			console.log("Client ready");
			//this automatically starts the streaming
			var stream = twitter_client.stream('statuses/filter', { track: 'god' })
			//var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
			//var stream = twitter_client.stream('statuses/filter', { locations: sanFrancisco })


			// emitted each time a new tweet comes into the stream
			stream.on('tweet', function (tweet) {

				socket.emit('new_tweet', tweet);
			  	//save the tweets to mongodb collection
			  	var Tweet = new TweetsSchema({
			  		id: tweet.id,
			  		text: tweet.text,
			  		processed: false
			  	});

			  	//console.log(tweet)
			  	//emit event to broadcast data only if users are online
			  	if(online_users.length > 0){
			  		//emit the data to all users but the first
				  	socket.broadcast.emit('new tweet', tweet);
				  	//emit data to the user who first started stream
				  	socket.emit('new tweet', tweet);
				}
				else{
					// destroy the stram if no users are online
					stream.stop();
				}

			}); 

			stream.on('error', function(err){
			  console.log(err);
			});
		});

		//handle when user is disconnected
		socket.on('disconnect', function(e){
			//find the dissconnected user
			var index = online_users.indexOf(socket.id);
			if(index != -1){
				online_users.splice(index, 1);
			}
			printOnlineUsers();
		});

		//emit a signal once the user is connected
		socket.emit('connected', {msg: "Connected!"});
	});

}