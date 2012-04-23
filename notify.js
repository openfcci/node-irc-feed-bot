var FEEDSUB = require('feedsub');
var IRC = require('irc');


// Set up your little spambot
var server    = 'irc.fccinteractive.com';
var bot       = 'feed-bot';
var channels   = ['#testing', '#testing2'];
var feed      = 'http://rss.cnn.com/rss/cnn_latest.rss';
var interval  = 1 // how often to poll the feed?


client = new IRC.Client(server, bot,
                        {
                          channels: channels 
                        });

reader = new FEEDSUB(feed, {
  interval: interval,
  autoStart: true,
});

reader.on('item', function(item) {
  var first
  client.say(channels, item.title + ': ' + item.link);
  console.dir(item.title);
});

client.addListener('pm', function(from, message) {
  console.log('PM from %s => %s', from, message);

  if (message.match(/die/i)) {
    client.part(channels)
  }
  if (message.match(/quiet/i)) {
      reader.interval = null;
  }
  if (message.match(/noisy/i)) {
      reader.interval = 1;
  }
  if (message.match(/join #+[a-zA-z0-9]+$/i)) {
    var channel = message.match(/#+[a-zA-z0-9]+$/).toString();
    console.log('Joining ' + channel);
    client.join(channel);
  }
  if (message.match(/part #+[a-zA-z0-9]+$/i)) {
    var channel = message.match(/#+[a-zA-z0-9]+$/).toString();
    console.log('Parting ' + channel);
    client.part(channel);
  }
});
