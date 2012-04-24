var FEEDSUB = require('feedsub');
var IRC = require('irc');


// Set up your little spambot
var server    = 'irc.fccinteractive.com';
var bot       = 'feed-bot';
var channels   = ['#testing', '#testing2'];
var feed      = 'http://rss.cnn.com/rss/cnn_latest.rss';
var interval  = 1 // how often to poll the feed, in minutes?


client = new IRC.Client(server, bot,
                        {
                          channels: channels,
                          realName: 'nodejs IRC bot',
                        });

reader = new FEEDSUB(feed, {
  interval: interval,
  autoStart: true,
  autoRejoin: true,
  autoConnect: true,
});

reader.on('item', function(item) {
  client.say(channels, item.title + ': ' + item.link);
  console.dir(item.title);
});


client.addListener('message', function (nick, to, text, message) {
  if (message.match('/' + bot + ' help/i') {
    client.say('RTFM, ' + nick + ': https://github.com/openfcci/node-irc-feed-bot/blob/master/README.md');
  }
)};

// Todo: some nodejs callback soup
client.addListener('pm', function (from, message) {
  console.log('PM from %s => %s', from, message);

  if (message.match(/die/i)) {
    console.log(from + ' killed me.');
    client.part(channels)
  }
  if (message.match(/quiet/i)) {
      reader.interval = null;
  }
  if (message.match(/noisy/i)) {
      reader.interval = 1;
  }
  if (message.match(/join #+[A-z0-9\-\?.]+$/i)) {
    var channel = message.match(/#+[A-z0-9\-\?.]+$/).toString();
    console.log('Joining ' + channel);
    client.join(channel);
  }
  if (message.match(/part #+[A-z0-9\-\?.]+$/i)) {
    var channel = message.match(/#+[A-z0-9\-\?.]+$/).toString();
    console.log('Parting ' + channel);
    client.part(channel);
  }
});
