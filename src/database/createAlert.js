import PocketBase from 'pocketbase';
import config from '../../config.json' assert { type: 'json' };

const pb = new PocketBase('http://127.0.0.1:8090');

await pb.admins.authWithPassword(config.databaseMail, config.databasePassword);


/**
 * Créer une alerte pour un artiste dans la BDD
 * @param buttonInteraction Evénement d'interaction avec le bouton
 * @param artist Artiste dont on souhaite créer une alerte
 * @returns True si l'alerte a été créée, false sinon
 */
export default async function createAlert(buttonInteraction, artist) {
	let { user } = buttonInteraction;
	let guildName = buttonInteraction.member.guild.name;

	let newUser;
	let newArtist;
	let success = true;

	/**
	 * On vérifie si l'utilisateur existe dans la base de données
	 */
	try {
		newUser = await pb
			.collection('utilisateurs')
			.getFirstListItem(`idUtilisateur=${user.id}`);
	} catch (err) {
		// Si l'utilisateur n'existe pas, on le crée
		try {
			newUser = await pb
				.collection('utilisateurs')
				.create({ idUtilisateur: `${user.id}`, pseudo: user.username });
		} catch (err) {
			success = false;
			console.log(
				`L'utilisateur ${buttonInteraction.user.username} n'a pas pu être ajouté à la base de données pour la raison suivante :
                ${err}`
			);
		}
	}

	/**
	 * On vérifie si l'artiste existe dans la base de données
	 */
	try {
		newArtist = await pb
			.collection('artistes')
			.getFirstListItem(`idArtiste=${artist.id}`);
	} catch (err) {
		// Si l'artiste n'existe pas, on le crée
		try {
			newArtist = await pb.collection('artistes').create({
				idArtiste: artist.id,
				nom: artist.name,
				nbAlbum: artist.nb_album,
			});
		} catch (err) {
			success = false;
			console.log(
				`L'artiste ${artist.name} n'a pas pu être ajouté à la base de données`
			);
		}
	}

	/**
	 * On vérifie que l'alerte n'a pas déjà été créée
	 */
	try {
		let alreadyExists = await pb
			.collection('alertes')
			.getFirstListItem(
				`utilisateur.id="${newUser.id}" && artiste.id="${newArtist.id}"`
			);
		if (alreadyExists) {
			success = false;
		}
	} catch (err) {
		// Si l'alerte n'existe pas, on la crée
		try {
			await pb.collection('alertes').create({
				utilisateur: newUser.id,
				artiste: newArtist.id,
				from: guildName,
			});
		} catch (err) {
			success = false;
			console.log(
				`L'alerte de l'utilisateur ${buttonInteraction.user.username} pour l'artiste ${artist.name} n'a pas pu être ajoutée à la base de données`
			);
		}
	}

	return success;
}
