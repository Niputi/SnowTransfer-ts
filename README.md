# SnowTransfer #
## A minimalistic rest client for the discord api

---
Part of the WeatherStack

SnowTransfer-ts is a small library specially made to **only** cover the REST/HTTP area of the discord api.
It makes no assumptions about the rest of your stack, therefore you can use it anywhere as long as you use node 8 or higher.

#### Some of the things that make SnowTransfer-ts awesome:
- No requirement for other components
- Full coverage of the discord rest api
- Well documented
- Sentry integration

#### General Usecase:
SnowTransfer-ts is not your everyday library, 
especially compared to other libraries, it makes sense to use it when you:
- Want to build a microservice based bot, where casual discord libraries would not be suitable since they assume the availability of other components like a gateway or a cache
- Only need a simple rest client that can be wrapped easily.

#### Microservice Bots:
[wolke](https://github.com/DasWolke/) have written a general whitepaper on the idea of microservice bots, which you can find on gist: [Microservice Bot Whitepaper](https://gist.github.com/DasWolke/c9d7dfe6a78445011162a12abd32091d)

#### Documentation:
You can find the docs at [https://daswolke.github.io/SnowTransfer/](https://daswolke.github.io/SnowTransfer/)

#### Installation:
To install SnowTransfer-ts, make sure that you have node 8 or higher and npm installed on your computer.

Then run the following command in a terminal `npm install https://github.com/Niputi/SnowTransfer-ts`

### Example: 
```js
let SnowTransfer = require('snowtransfer');
let client = new SnowTransfer.default('DISCORD BOT TOKEN');
let request = async () => {
    let message = await client.channel.createMessage('channel id', 'hi there');
    console.log(message);
};
request().then(() => {
    // message was sent to discord
}).catch(e => {
    // an error occurred
});
```
