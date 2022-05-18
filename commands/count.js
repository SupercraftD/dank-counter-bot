const fs = require('fs')
exports.name = 'count'
exports.description = 'shows the total messages sent by the user'
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month = months[new Date().getMonth()]
let user
exports.run = (client, message, args, channel, guild) => {
    if (args[0]){
        if (client.getUserFromMention(args[0])){
            user = client.getUserFromMention(args[0])
        }
    }else{
        user = message.author
    }
    fs.readFile('./msgcount.json', (err, data) => {
        if (err) throw err;
        let msgcount = JSON.parse(data)
        if (msgcount[user.id] == undefined) {
            msgcount[user.id] = {"total": 0,"monthly":{"month":month,"count":0}}
            fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
                if (err) throw err;
            })
        }
        message.channel.send(`${user.username} has sent ${msgcount[user.id].total} total messages!
${user.username} has sent ${msgcount[user.id].monthly.count} messages this month!`)
    })
}