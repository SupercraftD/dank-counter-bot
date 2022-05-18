const Discord = require('discord.js')
let client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fs = require('fs')
require('dotenv').config()
const token = process.env.TOKEN
const prefix = "#"

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.getUserFromMention = (mention) => {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(file.split('.')[0], command)
}

// Status message
client.once('ready', async () => {
    console.log('Dank Counter is online!');
    client.user.setActivity("use #info", {
        type: "PLAYING" // Change this to PLAYING, WATCHING, or LISTENING Change the text next to set activity to whatever you want
    });
});

// Command handler
client.on('messageCreate', message =>{
  function reply(text){
    message.channel.send(text)
  }
  let user = message.author
  fs.readFile('./msgcount.json', (err, data) => {
    if (err) throw err;
    let msgcount = JSON.parse(data)
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[new Date().getMonth()]
    if (msgcount[user.id] == undefined) {
      msgcount[user.id] = {"total": 0,"monthly":{"month":month,"count":0}}
      fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
          if (err) throw err;
      })
  }
    msgcount[user.id].total += 1
    if (msgcount[user.id].monthly.month != month){
      msgcount[user.id].monthly.month = month
      msgcount[user.id].monthly.count = 1
    }else{
      msgcount[user.id].monthly.count += 1
    }
    fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
        if (err) throw err;
    })
  })
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase(); // All command checks should be in lowercase
  const channel = message.channel
  const guild = message.guild
  if(!message.content.startsWith(prefix)) return;
  
  const cmd = client.commands.get(command)
  if(cmd){
    cmd.run(client, message, args, channel, guild)
  }
})

client.login(token);