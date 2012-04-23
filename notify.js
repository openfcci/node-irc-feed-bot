var FEEDSUB = require('feedsub');
var IRC = require('irc');


// Set up your little spambot
var server    = 'sobby.fccinteractive.com';
var bot       = 'noder';
var channel   = ['#testing', '#testing2'];
var feed      = 'http://rss.cnn.com/rss/cnn_latest.rss';
var interval  = 1 // how often to poll the feed?


client = new IRC.Client(server, bot,
                        {
                          channels: channel 
                        });

reader = new FEEDSUB(feed, {
  interval: interval,
  autoStart: true,
  emitOnStart: true
});

reader.on('item', function(item) {
  client.say(channel, item.title);
  console.dir(item.title);
});

client.addListener('pm', function(from, message) {
  console.log('PM from %s => %s', from, message);
});
