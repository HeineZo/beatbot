import * as path from 'path';
import * as fs from 'fs';
import url from 'url';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * Récupérer tous les fichiers d'un dossier
 * @param folder Dossier dont on veut récupérer les fichiers
 * @returns Les fichiers du dossier
 */
export function retrieveFiles(folder) {
    // On récupère tous les fichiers .js dans le dossier spécifié
    const commandsPath = path.join('file://',__dirname, `../${folder}`);
    
    const files = fs.readdirSync(path.resolve(__dirname, `../${folder}`)).filter(file => file.endsWith('.js'));

    // On crée des chemins d'accès pour chaque fichier
    const filesPath = [];
    for (const file of files) {
        const filePath = path.join(commandsPath, file);
        filesPath.push(filePath);
    }
    return filesPath;
}

/**
 * Attribue un emoji en fonction de sa place dans la liste
 * @param place Index de la liste
 * @returns Emoji correspondant
 */
export function determinePodium(place) {
    switch (place) {
        case 0:
            return '🥇';
        case 1:
            return '🥈';
        case 2:
            return '🥉';
        default:
            return '👻';
    }
}

/**
 * Récupère les requêtes envoyées à l'API Deezer
 * @param apiCall Requête à envoyer
 * @returns Données récupéres
 */
const retrieveData = async (apiCall) => {
    let value;
    await fetch(apiCall)
        .then((response) => response.json())
        .then((data) => (value = data));
    return value;
}

/**
 * Récupère les informations d'un artiste
 * @param idArtist ID de l'artiste dont on veut récupérer les informations
 * @returns Les informations de l'artiste
 */
export async function getArtist(idArtist) {
    return retrieveData(`https://api.deezer.com/artist/${idArtist}`);
}

/**
 * Récupérer les albums d'un artiste
 * @param idArtist ID de l'artiste
 * @param limit Limitation du nombre d'albums à récupérer
 * @returns Les albums de l'artiste
 */
export async function getAlbumFromArtist(idArtist, limit = -1) {
    let value;
    await fetch(`https://api.deezer.com/artist/${idArtist}/albums?limit=${limit}`)
        .then((response) => response.json())
        .then((data) => (value = data["data"]));
    return value;
}

/**
 * Envoi un DM à une personne
 * @param bot Le bot qui envoi le message
 * @param userID ID de l'utilisateur qui reçois le message
 * @param message Contenu du message
 */
export function sendDM(bot, userID, message) {
    bot.users.fetch(userID).then((user) => {
        user.send(message);
    })
}

/**
 * Rajoute un s à la fin d'un mot s'il doit être au pluriel
 * @param word Mot à conjuguer
 * @param number Chifffre avant le mot
 * @returns Le mot conjugué
 */
export function pluralize(word, number) {
    return number > 1 ? word + 's' : word;
}

