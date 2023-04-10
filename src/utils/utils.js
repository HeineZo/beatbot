import * as path from 'path';
import * as fs from 'fs';
import url from 'url';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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

const retrieveData = async (apiCall) => {
    let value;
    await fetch(apiCall)
        .then((response) => response.json())
        .then((data) => (value = data));
    return value;
}

export async function getArtist(idArtist) {
    return retrieveData(`https://api.deezer.com/artist/${idArtist}`);
}

export async function getAlbumFromArtist(idArtist, limit = -1) {
    let value;
    await fetch(`https://api.deezer.com/artist/${idArtist}/albums?limit=${limit}`)
        .then((response) => response.json())
        .then((data) => (value = data["data"]));
    return value;
}

export function sendDM(bot, userID, message) {
    bot.users.fetch(userID).then((user) => {
        user.send(message);
    })
}
