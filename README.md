# IRC Feed Bot

IRC Feed bot subscribes to a remote RSS/ATOM/JSON feed and notifies
chat rooms it connects to of new items it reads.

It works by checking the feed on an interval and compares the document
via a conditional GET if supported, otherwise looks for a date tag in
the feed.

# Pre-reqs

Node.js and npm must be installed on your server.

# Usage

```

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

```

# Install

  npm install





