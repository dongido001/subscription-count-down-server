# Build a realtime subscription count down with Angular and Channels

This is the server application for the tutorial - "how to build a realtime subscription count down with Angular and Channels". You can read the tutorial on how it was built [here](https://pusher.com/tutorials/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This tutorial uses the following:

- JavaScript
- Angular
- Node.js version 8.** or greater
- Channels for realtime functionality
- Express for the Node server
- TypeScript

Make sure you have [Node](https://nodejs.org/) installed on your system.

### Setting up the project

First of all, clone the repository to your local machine:

```sh
 git clone https://github.com/dongido001/subscription-count-down-server.git
```

Next, create your environment keys:

```
cp .env.example .env
```

Then get your Pusher API keys from your Pusher [Dashboard](https://dashboard.pusher.com/). Once you have the keys, update the `.env` file with the correct API keys.

Next, install the dependencies:

```
npm install
```

Then finally, start up the app:

```
npm run serve
```

The app should now be running on http://localhost:3000

## Built With

* [Node](https://nodejs.org/)
* [Pusher](https://pusher.com/) - APIs to enable devs building realtime
