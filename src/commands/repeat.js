import {SlashCommandBuilder} from 'discord.js';

/**
 * Commande qui répète le message de l'utilisateur
 * @deprecated Va être supprimé
 */
export const command = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Redis la même chose mais avec des options')
		.addStringOption(option =>
			option.setName('message')
				.setDescription("Le message à répéter")
				.setRequired(true))
		.addStringOption(option =>
				option.setName('type')
					.setDescription('Normal, majuscule ou minuscule')
					.addChoices(
						{ name: 'Normal', value: 'normal' },
						{ name: 'Minuscule', value: 'minuscule' },
						{ name: 'Majuscule', value: 'majuscule' },
					)),
	async execute(interaction) {
		let message = interaction.options.getString('message');
		const type = interaction.options.getString('type') ?? 'normal';

		switch (type) {
			case 'minuscule':
				message = message.toLowerCase();
				break;
			case 'majuscule':
				message = message.toUpperCase();
				break;
		}

		await interaction.reply(message);
	},
};
