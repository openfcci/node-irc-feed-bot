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
client = new IRC.Client('irc.example.com', 
                        'Feed-bot', // Name your bot 
                        {
                        channels: ['#testing', '#the-serious-room'],
});

```

Next, you'll need to give your bot a feed to watch and tell it how often
to check the feed. **Note:** When first launching the bot, it can be
pretty noisy, because all items in the feed are new to it.

```
reader = new FEEDSUB('http://example.com/atom.xml', {
  interval: 10, // check feed every ten minutes
  autoStart: true,
});

```

Once the bot is set up, run `node notify.js` to start it.
