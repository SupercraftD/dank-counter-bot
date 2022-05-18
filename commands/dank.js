const { MessageEmbed } = require("discord.js")

exports.name = 'dank'
exports.description = 'shows if someone is eligible for dank frog, or lists all eligible users'
const { DiscordAPIError } = require('discord.js')
const fs = require('fs')

exports.run = (client, message, args, channel, guild) => {
    if (args[0]) {
        if (client.getUserFromMention(args[0])) {
            let user = client.getUserFromMention(args[0])
            fs.readFile('./msgcount.json', (err, data) => {
                if (err) throw err;
                let msgcount = JSON.parse(data)
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                let month = months[new Date().getMonth()]

                if (msgcount[user.id] == undefined) {
                    msgcount[user.id] = {"total": 0,"monthly":{"month":month,"count":0}}
                }else if (msgcount[user.id].monthly.month != month){
                    msgcount[user.id].monthly.month = month
                    msgcount[user.id].monthly.count = 0
                }
                fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
                    if (err) throw err;
                })
                if (msgcount[user.id].monthly.count >= msgcount.dank) {
                    channel.send(`${user.username} is eligible for dank frog!`)
                } else {
                    channel.send(`${user.username} is not eligible for dank frog!`)
                }
            })
        }
    }else{
        let dankembed = new MessageEmbed().setTitle('Dank Frog Eligibility')
        fs.readFile('./msgcount.json', (err, data) => {
            if (err) throw err;
            let msgcount = JSON.parse(data)
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let month = months[new Date().getMonth()]
            for (let element in msgcount){
                if (element == "dank"){}else{
                    let user = client.users.cache.get(element)
                    if (msgcount[user.id] == undefined) {
                        msgcount[user.id] = {"total": 0,"monthly":{"month":month,"count":0}}
                    }else if (msgcount[user.id].monthly.month != month){
                        msgcount[user.id].monthly.month = month
                        msgcount[user.id].monthly.count = 0
                    }
                    fs.writeFile('./msgcount.json', JSON.stringify(msgcount), (err) => {
                        if (err) throw err;
                    })
                    if (msgcount[user.id].monthly.count >= msgcount.dank) {
                        dankembed.addField(`${user.username}`, `eligible for dank frog!`,false)
                    } else {
                        dankembed.addField(`${user.username}`, `not eligible for dank frog!`,false)
                    }
                }
            }
            channel.send({embeds: [dankembed]})

        })
    }
}