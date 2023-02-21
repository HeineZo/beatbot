const path = require('node:path');
const fs = require('node:fs');

exports.retrieveFiles = function(folder) {

    // On récupère tous les fichiers .js dans le dossier spécifié
    const commandsPath = path.join(__dirname, `../${folder}`);
    const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // On crée des chemins d'accès pour chaque fichier
    const filesPath = [];
    for (const file of files) {
        const filePath = path.join(commandsPath, file);
        filesPath.push(filePath);
    }
    return filesPath;
}

exports.determinePodium = function(place) {
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
