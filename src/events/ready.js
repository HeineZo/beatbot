const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(bot) {
        console.log(`${bot.user.tag} est prêt! 🥊`);
	},
};
