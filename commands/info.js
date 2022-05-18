const { MessageEmbed } = require("discord.js")
exports.description = 'shows info for this bot'
exports.name = 'info'

const fs = require('fs')

exports.run = (client, message, args, channel, guild) => {
    if (!args[0]) {
        console.log('NO ARGS')
        fs.readFile('./msgcount.json', (err, data) => {
            console.log('ijw')
            let highestTotal
            let highest = 0
            let msgcount = JSON.parse(data)
            console.log(msgcount)
            for (let user in msgcount) {
                console.log(user)
                if (msgcount[user].total > highest) {
                    highest = msgcount[user].total
                    highestTotal = user
                }
            }
            console.log('got here')
            doAllThatStuff(client, highestTotal,channel,message)

        })
    }else if (args[0] === 'commands') {
        const commandsEmbed = new MessageEmbed().setTitle('Dank Counter Commands')
        .setDescription('Commands for Dank Counter, the message counting bot')
        .setThumbnail('https://imgur.com/tNrxULs.png')
        .setFooter({text:'info menu requested by ' + message.author.username})
        let commands = client.commands
        commands.forEach(command => {
            let cmdName = command.name
            let cmdDesc = command.description
            console.log(cmdName)
            commandsEmbed.addField(cmdName,cmdDesc,false)
        })
        channel.send({ embeds: [commandsEmbed] })
    }   
}
function doAllThatStuff(client, highestTotal,channel,message){
    let user = client.users.cache.get(highestTotal)
    console.log(highestTotal)
    const Helpembed = new MessageEmbed().setTitle('Dank Counter Help').setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    Helpembed.setDescription('Help for Dank Counter, the message counting bot')
    .setThumbnail('https://imgur.com/tNrxULs.png')
    .addFields(
        {name:'\u200b', value: '\u200b'},
        {name:'What is this?', value:"lmao, don't ask me. It counts messages you send, yay."},
        {name:'Created By', value:'SupercraftD#5921', inline:true},
        {name:'Highest Total Messages', value:user.username, inline:true},
        {name:'\u200b', value: '\u200b'},
        {name:'Commands help', value:'use `#info commands`'}
    )
    .setFooter({text:'info menu requested by ' + message.author.username})
    channel.send({ embeds: [Helpembed] })
}