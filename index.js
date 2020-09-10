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
	db.run('CREATE TABLE IF NOT EXISTS user(id TEXT NOT NULL, code INTEGER NOT NULL)');
	client.user.setActivity('sci!help');
});

const welcomeChannel = 'CHANNEL ID';

welcome(client, welcomeChannel, ['CHANNEL ID', 'CHANNEL ID']);

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
		}
		if (message.content.startsWith(`${prefix}help`)) {
			message.channel.send('Sorry, this bot is under construction');
		}

		// Check if the message starts with my acees(so it doesn't read all messages)
		if (message.content.toLowerCase().startsWith('my acsess')) {
		// Opens the data-base	
		let db = new sqlite.Database('./users.db', sqlite.OPEN_READWRITE);
		// SQL query to search for the column with the id of the user
		let query = `SELECT * FROM user WHERE id = ?`;
        // Do the search
		db.get(query, [message.author.id], (err, row) => {
			// Logs any errors
			if (err) console.log(err);
			// If the id is not found in the data-base
			if (row == undefined) {
				message.channel.send('Something went wrong');
				return;
			} else {
				// If the id is found, and the code is found, and the user agrees to the rules run the function auth
				// else, the code is not found send a message with Check the code again.
				let code = new RegExp(`${row.code}`, 'g');
				if (message.content.search(code) != -1 &&
					message.content.search(/I agree/i) != -1) {
					auth(message);
					return;
				} else {
					message.channel.send("Check the code again");
				}
			}
		});
	}

	}
});

// https://tenor.com/810B.gif
// https://tenor.com/G8M4.gif

client.login(token);
