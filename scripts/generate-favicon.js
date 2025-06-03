const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Lire le fichier SVG
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/images/favicon.svg'));
    
    // Convertir en PNG avec fond transparent
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer()
      .then(buffer => {
        // Sauvegarder comme favicon.ico dans le dossier public
        fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), buffer);
        console.log('Favicon générée avec succès !');
      });
  } catch (error) {
    console.error('Erreur lors de la génération de la favicon:', error);
  }
}

generateFavicon(); 