const Discord = require('discord.js');
const sqlite = require('sqlite3').verbose();
const { prefix, token } = require('./config.json'); //Prefix is the symbol you type before the command for example !play in rythm I can't show you the file as it's contain my token :D
const client = new Discord.Client();
const http = require('http');
const welcome = require('./welcome');
const auth = require('./auth');
http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-type': 'text/plain',
	});

	res.writeHead(200, {
		'Content-type': 'text/plain',
	});
	res.write('Hey');
	res.end();
}).listen(4000);

client.once('ready', () => {
	console.log('Ready!');
	let db = new sqlite.Database(
		'./users.db',
		sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
	);
	client.user.setActivity('sci!help');
});

const welcomeChannel = '752716916640055406';

welcome(client, welcomeChannel, ['702442152512454728', '711862827521933333']);

client.on('message', (message) => {
	

	if (message.author.bot != client.user.id) {
		// Dealing with !d bump
		try {
			message.embeds.forEach((embed) => {
				let desc = embed.description;
				// message.channel.send(embed.description);
				if (desc.search(/bump done/i) != -1) {
					message.channel.send(
						`Thanks for helping the server ${desc.substring(
							0,
							desc.indexOf(',')
						)} \n https://tenor.com/810B.gif`
					);
				} else if (desc.search(/Please wait another/i) != -1) {
					message.channel.send(
						`Thank you for trying to help the server ${desc.substring(
							0,
							desc.indexOf(',')
						)}, try again later https://tenor.com/G8M4.gif`
					);
				}
			});
		} catch (err) {
			return;
		}
	}

	if (!message.author.bot) {
		if (message.content.startsWith(`${prefix}ping`)) {
			message.channel.send('Pong');
			message.react('✅');
			message.channel.send(`${message.author}`);
			console.log(users);
		}
		if (message.content.startsWith(`${prefix}help`)) {
			message.channel.send('Sorry, this bot is under construction');
		}

		// if(message.content.startsWith(`ts!joined`)) {
		//	message.channel.send("Someone joined");
		//		setTimeout(
		//				message.embeds.forEach(embed => {
		//				let desc = embed.description;
		//				let randomNumber = desc.substr(0, desc.indexOf("and")).trim();
		//				console.log(randomNumber);
		//				message.channel.send(desc);
		//			}), 1000)
		//	}

		if (message.content.toLowerCase().startsWith('my acsess')) {
		let db = new sqlite.Database('./users.db', sqlite.OPEN_READWRITE);
		let query = `SELECT * FROM user WHERE id = ?`;
		db.get(query, [message.author.id], (err, row) => {
			if (err) console.log(err);
			let code = new RegExp(`${row.code}`, 'g');

			if (row == undefined) {
				message.channel.send('Something went wrong');
				return;
			} else {
				if (message.content.search(code) != -1 &&
					message.content.search(/I agree/i) != -1) {
					auth(client, message);
					return;
				} else {
					message.channel.send("Check the code again");
				}
			}
		});
	}

		if (message.content.startsWith(`${prefix}admit`)) {
			let toAdmit = message.mentions.members.first();
			let member = message.guild.roles.cache.find(
				(role) => role.name === 'Member'
			);
			let newMember = message.guild.roles.cache.find(
				(role) => role.name === 'NEW-MEMBER'
			);
			let admitted = new Discord.MessageEmbed();
			admitted
				.setAuthor(message.author.username, toAdmit.displayAvatarURL)
				.setColor('RANDOM')
				.setDescription(
					`${toAdmit} was admitted by ${message.author.username}`
				)
				.setImage(toAdmit.avatarURL);
			if (
				message.member.roles.some(
					(role) => role.name === 'Minor Staff Permissions'
				) ||
				message.member.roles.some((role) => role.name === 'Staff-Ping')
			) {
				toAdmit.roles.add(member);
				toAdmit.roles.remove(newMember).catch(() => {
					message.channel.send('Something went wrong');
				});
				setTimeout(() => {
					client.channels.get('668991257170935818').send(admitted);
				}, 4000);
			}
		}
	}
	// if(message.author.id === client.user.id) {
	//     if(message.author.bot) {
	//         message.channel.send(`${message.author} sent this`);
	//         message.channel.send(`A bot sent this`);

	//     }
	// }
});

// https://tenor.com/810B.gif
// https://tenor.com/G8M4.gif

client.login(token);
