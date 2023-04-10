import {REST, Routes} from 'discord.js';
import config from '../config.json' assert { type: "json" };
import {retrieveFiles} from './utils/utils.js';

const commands = [];

// Utilise le nom des commandes pour l'autocomplétion de Discord
for (const filePath of retrieveFiles('commands')) {
	const command = await import(filePath);
	commands.push(command.command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config.token);

// Déploi les commandes
(async () => {
	try {
		console.log(`Initialisation des ${commands.length} commandes ⏳`);
		const data = await rest.put(
			Routes.applicationCommands(config.clientId), //Pour déployer sur un serveur en particulier -> Routes.applicationGuildCommands(clientId, guildId)
			{ body: commands },
		);

		console.log(`Les ${data.length} commandes ont été initialisées avec succès ✅`);
	} catch (error) {
		console.error(error);
	}
})();
