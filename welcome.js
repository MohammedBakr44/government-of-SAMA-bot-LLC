const utl = require('./utilities');
const date = new Date();
const sqlite = require('sqlite3').verbose();

module.exports = (client, channel, targetChannels = []) => {
	client.on('guildMemberAdd', (member) => {
		let newMember = member.guild.roles.cache.find(
			(role) => role.name === 'NEW-MEMBER'
		);
		member.roles.add(newMember);
		let accessCode = utl.random(1, 1000);
		// Database stuff

		let db = new sqlite.Database('./users.db', sqlite.OPEN_READWRITE);
		db.run(
			'CREATE TABLE IF NOT EXISTS user(id TEXT NOT NULL, code INTEGER NOT NULL)'
		);
		let query = 'SELECT * FROM user WHERE id = ?';
		db.get(query, [member.id], (err, row) => {
			if (err) console.log(err);
			if (row === undefined) {
				let insertData = db.prepare('INSERT INTO user VALUES(?, ?)');
				insertData.run(member.id, accessCode);
				return;
			} else {
				console.log(row.id, row.code);
				return;
			}
		});
		const messageContent = `Hey <@${member.id}>, welcome to **${
			member.guild.name
		}** 🎉🤗 ! Please read the ${utl
			.getChannel(member, targetChannels[0])
			.toString()} please note by you being here you accept the rules.
***__How to gain access:__***

**1.** If you are willing complete ${utl
			.getChannel(member, targetChannels[1])
			.toString()} once you are granted access this can not be filled out so do it first (again if you are willing it is not a requirement).

**2.** Type: "My Access Code is: ${accessCode} and I agree to the rules"
__Hint/Help: The rules are in: ${member.guild.channels.cache
			.get(targetChannels[0])
			.toString()}__

**3.** Then Type "**/join**"`;
		const message = {
			color: 'RANDOM',
			title: 'Science and Math Association Entry Procedure',
			author: {
				name: 'Government of SAMA Bot',
			},
			description: messageContent,
			footer: {
				text: `${date.getDate()}/${
					date.getMonth() + 1
				}/${date.getFullYear()}`,
			},
		};
		member.guild.channels.cache.get(channel).send({ embed: message });
	});
};
