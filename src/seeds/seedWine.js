const fs = require('fs')
const path = require('path')
const { prisma } = require('../prisma')
const files = fs.readdirSync(path.join('wines', 'vivino'))
const batch = []

// Liste tout les fichiers json
for (let file of files) {
  // Pour chaque fichier json, on lit le contenu
  const data = fs.readFileSync(path.join('wines', 'vivino', file))
  // On transforme le string en JSON
  const json = JSON.parse(data)
  
  // Pour chaque vin dans chaque fichier:
  for (let { vintage } of json.explore_vintage.matches) {
    const wine = vintage
    
    // Si on a pas trop de données, on skip ce vin
    if (!wine.wine.winery && !wine.wine.region) {
      continue;
    }
    
    // On pousse le vin dans un batch
    batch.push({
      name: wine.name,
      best_before: null,
      food: wine.wine.style?.food?.map(aliment => aliment.name).join('|') ?? "",
      grapes: wine.wine.style?.grapes?.map(grape => grape.name).join('|') ?? "",
      isPublic: true,
      maker: wine.wine.winery?.name,
      picture: wine.image?.variations.bottle_large,
      year: isNaN(wine.year) ? null : (wine.year || null)
    })
  }
}

/*
 * Process le batch en mappant la requête sur la création dans prisma
 * [{ name: '....' }, { name: '....' }]
 * to
 * [prisma.create(...), prisma.create(...)]
 */
const promises = batch.map((wine) => 
  prisma.wine.create({
    data: wine
  })
)

// Execute le batch et display les infos
Promise.all(promises)
  .then(() => {
    console.log(`Created ${batch.length} wines`)
  })
  .finally(() => {
    process.exit(1)
  })