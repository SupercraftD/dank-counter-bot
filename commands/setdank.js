exports.name = 'setdank'
exports.description = 'sets the required messages for dank frog'
const fs = require('fs')

exports.run = (client, message, args, channel, guild) => {
    if (message.author.id == '648995998525554694' || message.author.id == '561713754610335754') {
        fs.readFile('./msgcount.json', (err, data) => {
            let msgcount = JSON.parse(data)
            msgcount.dank = args[0]
            fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
                if (err) throw err;
            })
        })
    }
}