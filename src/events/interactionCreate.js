const { Events } = require('discord.js');
const {determinePodium} = require('../utils/utils.js');


// module.exports = {
// 	name: Events.InteractionCreate,
// 	async execute(interaction) {
// 		if (!interaction.isAutocomplete()) return;

// 		const focusedOption = interaction.options.getFocused(true);
// 		let choices = [];
// 		let popular = true;

// 		if (focusedOption.value) {
// 			await fetch(
// 				`https://api.deezer.com/search/artist?q=${focusedOption.value}&index=0&limit=5`
// 			)
// 				.then((response) => response.json())
// 				.then((data) => (choices = Object.values(data.data)));
// 			popular = false;
// 		} else {
// 			await fetch(
// 				`https://api.deezer.com/chart/0/artists?limit=5`
// 			)
// 				.then((response) => response.json())
// 				.then((data) => (choices = Object.values(data.data)));
// 			popular = true;
// 		}

// 		const filtered = choices.filter((choice) => 
// 			choice.name.toUpperCase().startsWith(focusedOption.value.toUpperCase())
// 		);


// 		await interaction.respond(
// 			popular ?
// 				filtered.map((choice) => ({ name: `${choice.name}`, value: choice.id.toString() }))
// 				: filtered.map((choice, index) => ({ name: `${determinePodium(index)} ${choice.name} • ${choice.nb_fan} fans`, value: choice.id.toString() }))
// 		);
		
// 	},
// };
