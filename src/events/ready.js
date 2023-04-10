import {Events} from 'discord.js';

export const readyEvent = {
	name: Events.ClientReady,
	once: true,
	async execute(bot) {
		console.log(`${bot.user.tag} est prêt! 🥊`);
	},
};
