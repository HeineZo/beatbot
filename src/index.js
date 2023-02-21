const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const {retrieveFiles} = require('./utils/utils.js');


// Création du bot
const bot = new Client({intents: [GatewayIntentBits.Guilds]});

// ----------- Liste des commandes du bot
bot.commands = new Collection();

for (const filePath of retrieveFiles('commands')) {
    // Pour chaque fichier, on l'importe 
	const command = require(filePath);

	// On attribue aux commandes du bot leurs noms et leur fichier
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(`[Attention] La commande situé à : ${filePath} manque la proprité 'data' ou 'execute'.`);
	}
}

// ----------- Liste des évènements du bot
for (const filePath of retrieveFiles('events')) {
	const event = require(filePath);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

bot.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`La commande ${interaction.commandName} n'existe pas`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
		}
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`La commande ${interaction.commandName} n'existe pas`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});

// Connexion du bot
bot.login(token);


