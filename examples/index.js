let SnowTransfer = require('../dist/src/index');

let client = SnowTransfer.default('asd');
let request = async () => {
    let message = await client.channel.createMessage('your channel id here', {
        content: 'hello',
        embed : { 
            title: 'asd'
        }
    });

    console.log(message);
};
request().then(() => {
    console.log('your memes worked');
}).catch(e => {
    console.error(e);
});
