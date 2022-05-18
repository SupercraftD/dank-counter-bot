exports.name = 'month'
exports.description = 'says the month (mainly for debugging)'
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let date = new Date()
exports.run = (client, message, args, channel, guild) => {
    channel.send(months[date.getMonth()])
}