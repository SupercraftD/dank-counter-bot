const fs = require('fs')

exports.name = 'reset'
exports.description = 'resets the messages for a user or whole server (can only be used by the bot owner)'
exports.run = (client, message, args, channel, guild) => {
    if (message.author.id == '648995998525554694') {
        if (args[0] === 'server') {

            fs.writeFile('./msgcount.json', JSON.stringify(client.msgcount), (err) => {
                if (err) throw err;
            })
        }else{
            if (client.getUserFromMention(args[0])){

                let user = client.getUserFromMention(args[0])
                fs.readFile('./msgcount.json', (err, data) => {
                    if (err) throw err;
                    let msgcount = JSON.parse(data)
                    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    let month = months[new Date().getMonth()]
                    msgcount[user.id] = {"total": 0,"monthly":{"month":month,"count":0}}
                    message.channel.send(`${user.username} has been reset!`)
                    fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
                        if (err) throw err;
                    })
                })
            }
        }
    }
}