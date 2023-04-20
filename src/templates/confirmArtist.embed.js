import {
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ComponentType,
} from 'discord.js';

import { pluralize } from '../utils/utils.js';
import createAlert from '../database/createAlert.js';

let interval;

/**
 * Embed qui demande la confirmation d'ajouter une alerte pour un artiste
 * @param artist Artiste dont on veut ajouter une alerte
 * @param lastAlbum Dernier album de l'artiste
 */
export function confirmArtist(artist, lastAlbum, timeLeft) {
	let timeMessage;

	if (timeLeft > 0) {
		timeMessage = `⏳ ${pluralize(
			timeLeft,
			'seconde'
		)} restantes pour confirmer`;
	} else {
		timeMessage = `❌ Le temps est écoulé, tape /alert pour recommencer`;
	}
	return new EmbedBuilder()
		.setColor(0xfbb03b)
		.setTitle(artist.name)
		.setURL(artist.share)
		.setThumbnail(artist.picture)
		.setAuthor({
			name: `🔔 Nouvelle alerte pour ${artist.name}`,
		})
		.setDescription(artist.nb_fan + ' fans')

		.addFields({
			name: 'Dernier album',
			value: `${lastAlbum.title}`,
			inline: true,
		})
		.setImage(lastAlbum.cover)
		.setFooter({ text: timeMessage });
}

/**
 * Boutons pour confirmer l'ajout d'une alerte
 */
export const confirmButtons = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('accept')
			.setLabel('🔔 Oui je veux être alerté')
			.setStyle(ButtonStyle.Primary)
	)
	.addComponents(
		new ButtonBuilder()
			.setCustomId('decline')
			.setLabel('❌ Non je me suis trompé')
			.setStyle(ButtonStyle.Danger)
	);

/**
 * Action des boutons
 * @param confirmEmbed Embed de confirmation
 * @param artist Artiste dont on veut ajouter une alerte
 */
export const onConfirmationClick = async (confirmEmbed, artist) => {
	// Récupérer les actions sur l'embed
	const collector = confirmEmbed.createMessageComponentCollector({
		componentType: ComponentType.Button,
		time: 15000,
	});

	// Lorsqu'une action est effectuée
	collector.on('collect', async (buttonInteraction) => {
		// Désactiver les boutons
		confirmButtons.components.forEach((component) =>
			component.setDisabled(true)
		);
		confirmEmbed.edit({ components: [confirmButtons] });

		clearInterval(interval);
		// Effectuer les actions correspondantes au bouton cliqué
		if (buttonInteraction.customId === 'accept') {
			let success = await createAlert(buttonInteraction, artist);
			if (success) {
				await buttonInteraction.reply({
					content: "✅ L'alerte viens d'être ajoutée à ton profil",
					ephemeral: true,
				});
			} else {
				await buttonInteraction.reply({
					content: '❌ Tu as déjà créé une alerte pour cet artiste',
					ephemeral: true,
				});
			}
		} else if (buttonInteraction.customId === 'decline') {
			await buttonInteraction.reply({
				content: '😥 Mince, on réessaie ? Tape /alert pour recommencer',
				ephemeral: true,
			});
		}
	});
};

/**
 * Temps restant avant la fin de la confirmation
 * @param confirmEmbed Embed de confirmation
 * @param artist Artiste de l'embed
 * @param lastAlbum Son dernier album
 */
export const timeLeftToConfirm = (confirmEmbed, artist, lastAlbum) => {
	// Temps restant
	let timeLeft = 14;
	interval = setInterval(async () => {
		// On change le texte du footer de l'embed
		confirmEmbed.edit({
			embeds: [confirmArtist(artist, lastAlbum[0], timeLeft)],
			components: [confirmButtons],
			ephemeral: true,
		});
		// Si le temps est écoulé, on désactive les boutons
		if (timeLeft === 0) {
			confirmButtons.components.forEach((component) =>
				component.setDisabled(true)
			);
			confirmEmbed.edit({
				embeds: [confirmArtist(artist, lastAlbum[0], timeLeft)],
				components: [confirmButtons],
				ephemeral: true,
			});
			clearInterval(interval);
		}
		// On enlève 1 seconde au temps restant
		timeLeft--;
	}, 1000);
};
