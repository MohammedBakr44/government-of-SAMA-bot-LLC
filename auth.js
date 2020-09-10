const Discord = require('discord.js');
const utl = require('./utilities');
const sqlite = require('sqlite3').verbose();

module.exports = (client, message) => {
	let toAdmit = message.member;
	// Store the roles 
	let member = message.guild.roles.cache.find(
		(role) => role.name === 'Member'
	);
	let newMember = message.guild.roles.cache.find(
		(role) => role.name === 'NEW-MEMBER'
	);
	// Add and removes the necessary roles
	// That's our system and the bot is spicific to our server
	toAdmit.roles.add(member);
	toAdmit.roles.remove(newMember);
	message.react('✅');
	utl.getChannel(client, 'CHANNEL ID').send(`Welcome <@${message.author.id}>, feel free to get some ${utl.getChannel(client, '641071243600199700')}`);
	let admitted = new Discord.MessageEmbed();
	admitted
		.setAuthor(message.author.username, message.author.avatarURL())
		.setColor('RANDOM')
		.setDescription(`${message.author.username} is admitted`)
		.setImage(message.author.avatarURL());
	setTimeout(() => {
		utl.getChannel(client, 'CHANNEL ID').send(admitted);
	}, 4000);
};
