module.exports = {
    getChannel: (client, id) => client.guild.channels.cache.get(id),
    random: (min, max) => Math.floor((Math.random() * max) + min)
}