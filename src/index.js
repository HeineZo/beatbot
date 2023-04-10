import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import token from '../config.json' assert { type: "json" };
import {retrieveFiles, sendDM} from './utils/utils.js';
import {nextFriday} from 'date-fns';

// Création du bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// ----------- Liste des commandes du bot
bot.commands = new Collection();

for (const filePath of retrieveFiles('commands')) {
	// Pour chaque fichier, on l'importe
	let command = await import(filePath);
	command = command.command;

	// On attribue aux commandes du bot leurs noms et leur fichier
	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(
			`[Attention] La commande situé à : ${filePath} manque la proprité 'data' ou 'execute'.`
		);
	}
}
bot.on('ready', () => {
	console.log(`${bot.user.tag} est prêt! 🥊`);
});

// ----------- Liste des évènements du bot
for (const filePath of retrieveFiles('events')) {
	const event = import(filePath);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

// bot.on('ready', () => {
// 	setTimeout(
// 		() => sendDM(bot, '295133253096964097', 'Hello world'),
// 		nextFriday(Date.now()) - Date.now()
// 	);
// });

bot.on(Events.InteractionCreate, async (interaction, client) => {
	// Commande exécutée avec un /
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) {
			console.error(
				`La commande ${interaction.commandName} n'existe pas`
			);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
		}
		// Commande exécutée avec un autocomplete
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) {
			console.error(
				`La commande ${interaction.commandName} n'existe pas`
			);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}

		// Bouton appuyé
	} else if (interaction.isButton()) {
		// console.log(interaction.customId)
		if (interaction.customId === 'accept') {
			// await interaction.user.send("Hey, vous avez accepté l'alerte !");
			await interaction.reply(
				"L'alerte viens d'être ajoutée à votre profil ✅"
			);
		} else if (interaction.customId === 'decline') {
			await interaction.reply(
				'Mince, on réessaie ? Tapez /alert pour recommencer 🥳'
			);
		}
	}
});

// Connexion du bot
bot.login(token.token);
