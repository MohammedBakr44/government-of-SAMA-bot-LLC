const Discord = require('discord.js');
const utl = require('./utilities');
const sqlite = require('sqlite3').verbose();

module.exports = (client, message) => {
	console.log(message.author.id);
	let toAdmit = message.member;
	let member = message.guild.roles.cache.find(
		(role) => role.name === 'Member'
	);
	let newMember = message.guild.roles.cache.find(
		(role) => role.name === 'NEW-MEMBER'
	);

	toAdmit.roles.add(member);
	toAdmit.roles.remove(newMember);
	message.react('✅');
	utl.getChannel(client, '736321533865099404').send(`Welcome <@${message.author.id}>, feel free to get some ${utl.getChannel(client, '641071243600199700')}`);
	let admitted = new Discord.MessageEmbed();
	admitted
		.setAuthor(message.author.username, message.author.avatarURL())
		.setColor('RANDOM')
		.setDescription(`${message.author.username} is admitted`)
		.setImage(message.author.avatarURL());
	setTimeout(() => {
		utl.getChannel(client, '668991257170935818').send(admitted);
	}, 4000);
};
