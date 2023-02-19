const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;

        console.log(interaction.values[0]);

        switch(interaction.customId) {
            case 'select':
                await interaction.followUp({ content: interaction.values[0], components: [] });
        }

		// const command = interaction.client.commands.get(interaction.commandName);

		// if (!command) {
		// 	console.error(`No command matching ${interaction.commandName} was found.`);
		// 	return;
		// }

		// try {
		// 	await command.execute(interaction);
		// } catch (error) {
		// 	console.error(`Error executing ${interaction.commandName}`);
		// 	console.error(error);
		// }
	},
};
