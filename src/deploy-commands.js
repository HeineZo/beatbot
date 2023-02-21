const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');
const {retrieveFiles} = require('./utils/utils.js');

const commands = [];

// Utilise le nom des commandes pour l'autocomplétion de Discord
for (const filePath of retrieveFiles('commands')) {
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// Déploi les commandes
(async () => {
	try {
		console.log(`Initialisation des ${commands.length} commandes ⏳`);
		const data = await rest.put(
			Routes.applicationCommands(clientId), //Pour déployer sur un serveur en particulier -> Routes.applicationGuildCommands(clientId, guildId)
			{ body: commands },
		);

		console.log(`Les ${data.length} commandes ont été initialisées avec succès ✅`);
	} catch (error) {
		console.error(error);
	}
})();
