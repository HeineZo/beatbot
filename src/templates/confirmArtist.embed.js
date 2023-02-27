const { EmbedBuilder } = require('discord.js');
const { getAlbumFromArtist } = require('../utils/utils.js');

function confirmArtist(artist, lastAlbum) {


	// let lastAlbum = await getAlbumFromArtist(artist.id, 1)
	// await fetch(`https://api.deezer.com/artist/${artist.id}/top?limit=1`)
	// 	.then((response) => response.json())
	// 	.then((data) => (topSong = data));

	// await fetch(`https://api.deezer.com/artist/${artist.id}/albums?limit=1`)
	// 	.then((response) => response.json())
	// 	.then((data) => (lastAlbum = data));

	return new EmbedBuilder()
		.setColor(0xffffff)
		.setTitle(artist.name)
		.setURL(artist.share)
		.setAuthor({
			name: `🔔 Nouvelle alerte pour ${artist.name}`,
			// iconURL: '/img/LetterBig.png',
		})
		.setDescription('Some description here')
		.setThumbnail(artist.picture)
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			}
		)
		.addFields({
			name: 'Dernier album',
			value: `${lastAlbum.title}`,
			inline: true,
		})
		.setImage(lastAlbum.cover)
		.setImage(lastAlbum.cover)
		.setTimestamp()
		.setFooter({
			text: 'Some footer text here',
			iconURL: 'https://i.imgur.com/AfFp7pu.png',
		});
}

module.exports = { confirmArtist };


