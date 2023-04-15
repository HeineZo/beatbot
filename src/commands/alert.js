import { SlashCommandBuilder } from 'discord.js';
import {
	determinePodium,
	getArtist,
	getAlbumFromArtist,
} from '../utils/utils.js';
import {
	confirmArtist,
	confirmButtons,
	onConfirmationClick,
	timeLeftToConfirm,
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
			choice?.name
				?.toUpperCase()
				?.startsWith(focusedOption.value.toUpperCase())
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
		// Choix de l'utilisateur
		let userChoice = interaction.options.getString('artiste');
		// On récupère les informations de l'artiste
		const artist = await getArtist(userChoice);
		// On récupère son dernier album
		let lastAlbum = await getAlbumFromArtist(userChoice, 1);

		// On réactive les boutons (si l'utilisateur a déjà utilisé la commande)
		confirmButtons.components.forEach((component) =>
			component.setDisabled(false)
		);

		// On envoie l'embed de confirmation
		const confirmEmbed = await interaction.reply({
			embeds: [confirmArtist(artist, lastAlbum[0], 15)],
			components: [confirmButtons],
			ephemeral: true,
		});

		// On laisse 15s à l'utilisateur pour confirmer son choix
		timeLeftToConfirm(confirmEmbed, artist, lastAlbum);

		// On écoute les interactions sur les boutons
		onConfirmationClick(confirmEmbed);
	},
};
