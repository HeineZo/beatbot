import { SlashCommandBuilder } from 'discord.js';
import {
	determinePodium,
	getArtist,
	getAlbumFromArtist,
} from '../utils/utils.js';
import {
	confirmArtist,
	confirmButtons,
} from '../templates/confirmArtist.embed.js';

/**
 * Commande qui permet de définir une alerte pour un artiste
 */
export const command = {
	data: new SlashCommandBuilder()
		.setName('alert')
		.setDescription(
			"Définis une alerte lorsque l'artiste choisis sors un nouvel album/titre"
		)
		.addStringOption((option) =>
			option
				.setName('artiste')
				.setDescription("L'artiste dont vous voulez être alerté")
				.setAutocomplete(true)
		),
	// Autocomplete avec les artistes qui correspondent à la recherche
	async autocomplete(interaction) {
		// Champ de recherche
		const focusedOption = interaction.options.getFocused(true);
		let choices = [];
		let popular = true;

		// Si le champ de recherche n'est pas vide
		if (focusedOption.value) {
			// Requête API pour récupérer les artistes qui correspondent au champ de recherche
			await fetch(
				`https://api.deezer.com/search/artist?q=${focusedOption.value}&index=0&limit=5`
			)
				.then((response) => response.json())
				.then((data) => (choices = Object.values(data.data)));
			popular = false;
		} else {
			// Sinon on récupère les artistes les plus populaires
			await fetch(`https://api.deezer.com/chart/0/artists?limit=5`)
				.then((response) => response.json())
				.then((data) => (choices = Object.values(data.data)));
			popular = true;
		}

		// On filtre les artistes qui correspondent au champ de recherche
		const filtered = choices.filter((choice) =>
			choice.name
				.toUpperCase()
				.startsWith(focusedOption.value.toUpperCase())
		);

		// On envoie les choix possibles
		await interaction.respond(
			// Si les artistes sont les plus populaires, on affiche pas le nombre de fans et le podium
			popular
				? filtered.map((choice) => ({
						name: `${choice.name}`,
						value: choice.id.toString(),
				  }))
				: filtered.map((choice, index) => ({
						name: `${determinePodium(index)} ${choice.name} • ${
							choice.nb_fan
						} fans`,
						value: choice.id.toString(),
				  }))
		);
	},
	// Si un artiste est choisi, on envoi l'embed de confirmation
	async execute(interaction) {
		let userChoice = interaction.options.getString('artiste');
		const artist = await getArtist(userChoice);
		let lastAlbum = await getAlbumFromArtist(userChoice, 1);

		await interaction.reply({
			embeds: [confirmArtist(artist, lastAlbum[0])],
			components: [confirmButtons],
		});
	},

	// Si l'utilisateur confirme
	async button(interaction) {
		if (interaction.customId === 'accept') {
			await interaction.reply(
				"L'alerte viens d'être ajouté à votre profil ✅"
			);
		} else if (interaction.customId === 'decline') {
			await interaction.reply(
				'Mince, on réessaie ? Tapez /alert pour recommencer 🥳'
			);
		}
	},
};
