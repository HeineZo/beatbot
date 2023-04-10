import {SlashCommandBuilder} from 'discord.js';
import {determinePodium, getArtist, getAlbumFromArtist} from '../utils/utils.js';
import {confirmArtist, confirmButtons} from '../templates/confirmArtist.embed.js';

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
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices = [];
		let popular = true;

		if (focusedOption.value) {
			await fetch(
				`https://api.deezer.com/search/artist?q=${focusedOption.value}&index=0&limit=5`
			)
				.then((response) => response.json())
				.then((data) => (choices = Object.values(data.data)));
			popular = false;
		} else {
			await fetch(
				`https://api.deezer.com/chart/0/artists?limit=5`
			)
				.then((response) => response.json())
				.then((data) => (choices = Object.values(data.data)));
			popular = true;
		}

		const filtered = choices.filter((choice) => 
			choice.name.toUpperCase().startsWith(focusedOption.value.toUpperCase())
		);


		await interaction.respond(
			popular ?
				filtered.map((choice) => ({ name: `${choice.name}`, value: choice.id.toString() }))
				: filtered.map((choice, index) => ({ name: `${determinePodium(index)} ${choice.name} • ${choice.nb_fan} fans`, value: choice.id.toString() }))
		);
	},
	async execute(interaction) {
		let userChoice = interaction.options.getString('artiste');
		const artist = await getArtist(userChoice);
		let lastAlbum = await getAlbumFromArtist(userChoice, 1);


		await interaction.reply({embeds: [confirmArtist(artist, lastAlbum[0])], components: [confirmButtons]});
	},

	async button(interaction) {
		if (interaction.customId === 'accept') {
			await interaction.reply("L'alerte viens d'être ajouté à votre profil ✅");
		} else if (interaction.customId === 'decline') {
			await interaction.reply("Mince, on réessaie ? Tapez /alert pour recommencer 🥳");
		}
	}
};
