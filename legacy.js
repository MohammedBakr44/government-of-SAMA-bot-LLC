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

//

		// if(message.content.startsWith(`ts!joined`)) {
		//	message.channel.send("Someone joined");
		//		setTimeout(
		//				message.embeds.forEach(embed => {
		//				let desc = embed.description;
		//				let randomNumber = desc.substr(0, desc.indexOf("and")).trim();
		//				console.log(randomNumber);
		//			message.channel.send(desc);
		//			}), 1000)
		//	}

//

	// if(message.author.id === client.user.id) {
	//     if(message.author.bot) {
	//         message.channel.send(`${message.author} sent this`);
	//         message.channel.send(`A bot sent this`);

	//     }
	// }