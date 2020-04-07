
var Twit = require('twit');

var T = new Twit(require('./config.js'));

var mediaArtsSearch = {q: "Derrida OR Derridean OR derridien OR derridienne OR derridiano OR derridiana", count: 15, result_type: "recent"};
var firstSearch = {q: "Derrida OR Derridean OR derridien OR derridienne OR derridiano OR derridiana", count: 100, result_type: "recent"};
var myre = /^(@.+? )+/

function firstRun() {
    T.get('search/tweets', firstSearch, function (error, data) {
          
          console.log(error, data);
          
          if (!error) {
          for (var i=0; i<data.statuses.length; i++) {
          if (!data.statuses[i].text.startsWith("RT @")) {
          
          var holder = data.statuses[i].text.replace(myre, "");
          if (holder.toLowerCase().search("derrid") != -1) {
          
          var retweetId = data.statuses[i].id_str;
          
          T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
                 if (response) {
                 console.log('Success!');
                 }
                 
                 if (error) {
                 console.log('There was an error with Twitter:', error);
                 }
                 })
          }
          }
          
          }
          }
          else {
          console.log('There was an error with your hashtag search:', error);
          }
          });
}

function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  
	  console.log(error, data);
	  
	  if (!error) {
          for (var i=0; i<data.statuses.length; i++) {
          if (!data.statuses[i].text.startsWith("RT @")) {
          
          var holder = data.statuses[i].text.replace(myre, "");
          if (holder.toLowerCase().search("derrid") != -1) {

          var retweetId = data.statuses[i].id_str;
          
          T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
                 if (response) {
                 console.log('Success!');
                 }
                 
                 if (error) {
                 console.log('There was an error with Twitter:', error);
                 }
                 })
          }
          }
          
          }
	  }
	  
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

firstRun();
setInterval(retweetLatest, 1000 * 60 * 5);
