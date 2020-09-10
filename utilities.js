module.exports = {
    // Just some utility functions I made to help me work faster
    getChannel: (client, id) => client.guild.channels.cache.get(id),
    random: (min, max) => Math.floor((Math.random() * max) + min)
}