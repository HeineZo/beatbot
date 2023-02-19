const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Informations sur un utilisateur'),
	async execute(interaction) {
		await interaction.reply(`Nom d'utilisateur: ${interaction.user.username}\nID: ${interaction.user.id}`	);
	},
};
