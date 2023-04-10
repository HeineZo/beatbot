import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

function newRelease(artist, lastAlbum) {
	return new EmbedBuilder()
		.setColor(0xfbb03b)
		.setTitle(artist.name)
		.setURL(artist.share)
		.setThumbnail(artist.picture)
		.setAuthor({
			name: `🔔 Nouvelle alerte pour ${artist.name}`,
			// iconURL: '/img/LetterBig.png',
		})
		.setDescription(artist.nb_fan + ' fans')

		.addFields({
			name: 'Dernier album',
			value: `${lastAlbum.title}`,
			inline: true,
		})
		.setImage(lastAlbum.cover);
}

const actionButtons = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('accept')
			.setLabel("Oui je veux être alerté")
			.setStyle(ButtonStyle.Primary)
	)
	.addComponents(
		new ButtonBuilder()
			.setCustomId('decline')
			.setLabel("Non je me suis trompé")
			.setStyle(ButtonStyle.Danger)
	);

module.exports = { newRelease, actionButtons };
