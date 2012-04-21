var FEEDSUB = require('feedsub');
var IRC = require('irc');

client = new IRC.Client('irc.example.com', 
                        'Feed-bot', // Name your bot 
                        {
                        channels: ['#testing', '#the-serious-room'],
});

reader = new FEEDSUB('http://example.com/atom.xml', {
  interval: 10, // check feed every ten minutes
  autoStart: true,
});

reader.on('item', function(item) {
  console.dir(item.title);
  client.say(client.channels, item.title + ': ' + item.id);
});

