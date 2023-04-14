import {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from 'discord.js';

/**
 * Embed qui demande la confirmation d'ajouter une alerte pour un artiste
 * @param artist Artiste dont on veut ajouter une alerte
 * @param lastAlbum Dernier album de l'artiste
 */
export function confirmArtist(artist, lastAlbum) {
	return new EmbedBuilder()
		.setColor(0xfbb03b)
		.setTitle(artist.name)
		.setURL(artist.share)
		.setThumbnail(artist.picture)
		.setAuthor({
		})
		.setDescription(artist.nb_fan + ' fans')

		.addFields({
			name: 'Dernier album',
			value: `${lastAlbum.title}`,
			inline: true,
		})
		.setImage(lastAlbum.cover);
}

export const confirmButtons = new ActionRowBuilder()
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



