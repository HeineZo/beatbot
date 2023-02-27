const { SlashCommandBuilder } = require('discord.js');
const {determinePodium, getArtist, getAlbumFromArtist} = require('../utils/utils.js');
const {confirmArtist} = require('../templates/confirmArtist.embed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alert')
		.setDescription(
			"Définis une alerte lorsqu'un artiste choisis sors un nouvel album/titre"
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


		await interaction.reply({embeds: [confirmArtist(artist, lastAlbum[0])]});
	},
};
