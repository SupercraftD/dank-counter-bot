exports.description = 'pings the bot and send message back'
exports.name = 'ping'
exports.run = (client, message, args, channel, guild) =>{
    const ping = message.createdTimestamp - new Date().getTime() + " ms";
    message.channel.send(`Pong! ${ping}`);
}