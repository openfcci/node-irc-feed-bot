# IRC Feed Bot

IRC Feed bot subscribes to a remote RSS/ATOM/JSON feed and notifies
chat rooms it connects to of new items it reads.

It works by checking the feed on an interval and compares the document
via a conditional GET if supported, otherwise looks for a date tag in
the feed.

# Pre-reqs

Node.js and npm must be installed on your server.


# Install

  Clone or fork this repo.

  `npm install` will download the bot's dependencies.


# Usage

First, you must set up your bot by telling it where the server is
located, what its name is and what channels it should enter.

```
var server    = 'irc.fccinteractive.com';
var bot       = 'feed-bot';
var channels   = ['#testing', '#testing2'];
```

Next, you'll need to give your bot a feed to watch and tell it how often
to check the feed. **Note:** When first launching the bot, it can be
pretty noisy, because all items in the feed are new to it.

```
var feed      = 'http://rss.cnn.com/rss/cnn_latest.rss';
var interval  = 1 // how often to poll the feed?
```

Once the bot is set up, run `node notify.js` to start it.

# Interacting with the bot

The bot recognizes the following commands, sent over private message.

`die` tells the bot to part from all channels it is in.

`quiet` tells the bot to stop notifying channels, by not checking the
feed. This can get noisy if you turn it back on after a longish period of time.

`noisy` tells the bot to check the feed often.

`join` and `part` have a special syntax in that you must tell the bot
which rooms to depart from. `join #testing` or `part #testing2` will
join and depart the respective channels.
