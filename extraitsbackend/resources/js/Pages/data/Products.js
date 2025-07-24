import { generateSlug } from "../utils/generateSlug";
// src/data/products.js
const rawProducts = [
//   {
//   id: 1,
//   name: "Black Orchid",
//   slug: "black-orchid",
//   price: "12000 Fcfa",
//   size: "30ml",
//   category: "Eau de parfum",
//   imageUrl: "https://i.imgur.com/Ix0zOol.jpeg",
//   description: "Un parfum mystérieux et élégant...",
//   olfactiveFamily: "Oriental boisé - Chaud et sensuel",
//   keyIngredients: ["Truffe noire", "Ylang-ylang", "Bergamote"],
//   rating: 4.8
// },
  {

    id: 1,
    name: "Black Orchid",
    price: "15000 Fcfa",
    size: "120ml",
    category: "Extrait de parfum",
    imageUrl: "https://i.imgur.com/4q3h9JN.jpeg",
    description: `Nos parfums sont inspires de vos  marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.`,
    utilisation: 'Utilisation : Spray sur le corps',
    particularité: 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise',
     olfactiveFamily: "Oriental boisé - Chaud et sensuel",
  keyIngredients: ["Truffe noire", "Ylang-ylang", "Bergamote"],
  // rating: 4.8
  },
{
      id: 5,
      name: "L'eau par Kenza",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/Ix0zOol.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
  },
  {
    id: 2,
      name: "Nina red",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/aBMWVfV.jpeg",
      description: `Nos parfums sont inspirés de vos  marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.`,
      utilisation: 'Utilisation : Spray sur le corps',
      particularité : 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise'
  },
  {
      id: 6,
      name: "One million",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/jiz0Ih3.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 26,
      name: "Vanille Lemon",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/4riXP2u.jpeg",
      description:"    La délicatesse des senteurs des diffuseurs d’ambiance EXTRAITS n’est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d’une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l’odeur qu’il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d’ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l’opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s’imprègnent alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation: "Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)",
      particularité:"Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise"    
    },
    {
      id: 2,
      name: "Twilight",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/TbstkG0.jpeg",
      description:"    La délicatesse des senteurs des diffuseurs d’ambiance EXTRAITS n’est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d’une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l’odeur qu’il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d’ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l’opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s’imprègnent alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation: "Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)",
      particularité:"Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise" 
    },
     {
      id: 3,
      name: "Lavender Bouquet",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/YyvEELQ.jpeg",
      description:"    La délicatesse des senteurs des diffuseurs d’ambiance EXTRAITS n’est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d’une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l’odeur qu’il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d’ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l’opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s’imprègnent alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation: "Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)",
      particularité:"Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise" 
    },
    {
     id: 7,
      name: "Golden Dust",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/BRyWZic.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
     {
      id: 8,
      name: "Fruits Rouges",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/Aes9NpI.jpeg",
    },
    {
      id: 9,
      name: "Lemon Vanille",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/BZDxhAq.jpeg",
    },
     {
      id: 10,
      name: "Lavender Bouquet",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Brume parfumée",
      imageUrl: "https://i.imgur.com/lodJd7a.jpeg",
    },
      {
      id: 4,
      name: "Fruits rouges",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/7zsDJks.jpeg",
      description:"    La délicatesse des senteurs des diffuseurs d’ambiance EXTRAITS n’est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d’une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l’odeur qu’il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d’ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l’opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s’imprègnent alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation: "Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)",
      particularité:"Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise" 
    },
    {
      id: 5,
      name: "Tea Tree",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/SVOE0mI.jpeg",
      description:"Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d’une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara",
      utilisation:"Utilisation : En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d'eau en subtitut aux fondants",
      particularité:"Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%",
    },
    {
      id: 6,
      name: "Clove",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/sRLIIEX.jpeg",
      description:"Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d’une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara",
      utilisation:"Utilisation : En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d'eau en subtitut aux fondants",
      particularité:"Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%",
    },
     {
      id: 7,
      name: "Patchouli",
      price: "3500 Fcfa",
      size: "12ml",
      category: "Huile Essentielles",
      imageUrl: "https://i.imgur.com/nu0pQl2.jpeg",
      description:"Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d’une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara",
      utilisation:"Utilisation: En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d'eau en subtitut aux fondants",
      particularité:"Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%",
    },
    {
      id: 4,
      name: "Very Vanilla",
      price: "15000 Fcfa",
      size: "120ml",
      category: "Diffuseurs de parfum à tiges aromatiques",
      imageUrl: "https://i.imgur.com/6pfGY2e.jpeg",
      description:"    La délicatesse des senteurs des diffuseurs d’ambiance EXTRAITS n’est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d’une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l’odeur qu’il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d’ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l’opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s’imprègnent alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation: "Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)",
      particularité:"Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise" 
    },
    {
      id: 11,
      name: "Car perfume",
      price: "2500 Fcfa",
      size: "8ml",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/8pJ1gnY.jpeg",
      description:"La délicatesse des senteurs des parfums de voiture EXTRAITS n’est pas leur seul avantage. Avec leur look chic et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Le bois de diffusion recouvert d’une couche métallique colorée bouchonne le réservoir de parfum en verre. Véritable élément de déco de luxe pour votre véhicule, vous pouvez soit l’accrocher sur le rétroviseur avant ou l’épingler sur les bouches d’aération de climatisation. L’odeur qu’il diffuse se répartit de manière égale dans tout l’habitacle. Pour activer le parfum, il vous suffit de retirer l’opercule de protection, replacer le bouchon et d’agiter rapidement le flacon sans le retourner. Grâce à la capillarité du bouchon, il s’imprègne alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation:"Utilisation : Diffusion dans un véhicule",
      particularité:"Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free. Sans Alcools. Fabrication Artisanale Camerounaise",
    },
    {
      id: 12,
      name: "Car Diffuseur",
      price: "20000 Fcfa",
      size: "coffret",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/nJlAYj0.jpeg",
      description:"La délicatesse des senteurs des parfums de voiture EXTRAITS n’est pas leur seul avantage. Avec leur look chic et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Le bois de diffusion recouvert d’une couche métallique colorée bouchonne le réservoir de parfum en verre. Véritable élément de déco de luxe pour votre véhicule, vous pouvez soit l’accrocher sur le rétroviseur avant ou l’épingler sur les bouches d’aération de climatisation. L’odeur qu’il diffuse se répartit de manière égale dans tout l’habitacle. Pour activer le parfum, il vous suffit de retirer l’opercule de protection, replacer le bouchon et d’agiter rapidement le flacon sans le retourner. Grâce à la capillarité du bouchon, il s’imprègne alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      particularité:"Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free. Sans Alcools. Fabrication Artisanale Camerounaise",
      utilisation:"Utilisation : Retirer l'opercule de protection, replacer le bouchon et agiter rapidement le flacon sans le retourner. Accrocher sur le rétroviseur ou épingler sur les bouches d'aération de climatisation.",
    },
    {
      id: 13,
      name: "Car perfume refill",
      price: "5000 Fcfa",
      size: "30ml",
      category: "Parfum de voiture",
      imageUrl: "https://i.imgur.com/mzrSZ8D.jpeg",
      description:"La délicatesse des senteurs des parfums de voiture EXTRAITS n’est pas leur seul avantage. Avec leur look chic et épuré, ils sont tout aussi agréables à sentir qu’à regarder ! Le bois de diffusion recouvert d’une couche métallique colorée bouchonne le réservoir de parfum en verre. Véritable élément de déco de luxe pour votre véhicule, vous pouvez soit l’accrocher sur le rétroviseur avant ou l’épingler sur les bouches d’aération de climatisation. L’odeur qu’il diffuse se répartit de manière égale dans tout l’habitacle. Pour activer le parfum, il vous suffit de retirer l’opercule de protection, replacer le bouchon et d’agiter rapidement le flacon sans le retourner. Grâce à la capillarité du bouchon, il s’imprègne alors petit à petit de l’odeur que vous avez choisie. Il ne vous reste plus qu’à fermer les yeux, et à laisser cette douce fragrance vous enivrer !",
      utilisation:"Utilisation: Diffusion dans un véhicule",
      particularité:"Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free. Sans Alcools. Fabrication Artisanale Camerounaise",
    },
     {
      id: 3,
      name: "Tobacco Vanilla",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/fVasoSi.jpeg",
      description: `Nos parfums sont inspires de vos  marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.`,
    utilisation: 'Utilisation : Spray sur le corps',
    particularité: 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise',
    },
    {
      id: 4,
      name: "Chance eau tendre",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/SEOKOAe.jpeg",
      description: `Nos parfums sont inspires de vos  marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.`,
    utilisation: 'Utilisation : Spray sur le corps',
    particularité: 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise',
    },
    {
      id: 5,
      name: "Pink chiffon BBW",
      price: "15000 Fcfa",
      size: "120ml",
      category:"Extrait de parfum",
      imageUrl: "https://i.imgur.com/HwgyhCJ.jpeg",
      description: `Nos parfums sont inspires de vos  marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.`,
    utilisation: 'Utilisation : Spray sur le corps',
    particularité: 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise',
    },
    {
      id: 14,
      name: "Sekushi Nat",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 15,
      name: "Terre d'Hermes",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/sRGcaUJ.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 16,
      name: "Invictus",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 17,
      name: "Issey Miyake",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/7jVBCPr.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 18,
      name: "Bad boy carolina herrera",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/mcAyI4D.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
     {
      id: 9,
      name: "La nuit de l'Homme",
      price: "5550 Fcfa",
      size: "12ml",
      category: "Eau de parfum",
      imageUrl: "https://i.imgur.com/DsjTCUD.jpeg",
      description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    utilisation: 'Utilisation: Spray sur le corps',
    particularité:'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent  plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.',
    },
    {
      id: 10,
      name: "Sensual Amber",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/uGykVto.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 11,
      name: "Vanilla lace",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/laqVRGF.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 19,
      name: "Amber romance",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/kDmpaB1.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 20,
      name: "Warm vanilla sugar",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/5oYLMkH.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 21,
      name: "Love spell",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/h2d5Pby.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 26,
      name: "Japanese Cherry Blossom",
      price: "6500 Fcfa",
      size: "35ml",
      category: "Body mist",
      imageUrl: "https://i.imgur.com/Jb6eV93.jpeg",
      description:"Nos Brumes  sont inspires de vos  marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des  brumes du commerce a un prix très accessible",
    utilisation: 'Utilisation : Spray sur le corps.',
    particularité: 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.',
    },
    {
      id: 27,
      name: "Basil",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/jtRTZGZ.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 28,
      name: "Géranium",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/SSvQxIO.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 29,
      name: "Ylang Ylang",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/zWhs3cB.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 22,
      name: "Spearmint",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/5a4jdD0.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 23,
      name: "Cedarwood",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/DFRt0U6.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 24,
      name: "Ravintsara",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/wVcFcMA.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    {
      id: 25,
      name: "Lemongrass",
      price: "3000 Fcfa",
      size: "10ml",
      category: "Huile de parfum",
      imageUrl: "https://i.imgur.com/oRTbKef.jpeg",
      description:"Concentre d'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos  marques preferees.",
    utilisation: "Utilisation : Elle s'utilsent directement sur la peau ou dilue dans un lait de corps",
    particularité:"Particularité :Sans Alcool  - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.",
    },
    //  {
    //   id: 14,
    //   name: "Sekushi Nat",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    // utilisation: 'Utilisation: Spray sur le corps',
    // particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    // {
    //   id: 15,
    //   name: "Terre d'Hermes",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/sRGcaUJ.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    //   utilisation: 'Utilisation: Spray sur le corps',
    //   particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    // {
    //   id: 16,
    //   name: "Invictus",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/G7VMMms.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    // utilisation: 'Utilisation: Spray sur le corps',
    // particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    // {
    //   id: 17,
    //   name: "Issey Miyake",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/7jVBCPr.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    // utilisation: 'Utilisation: Spray sur le corps',
    // particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    // {
    //   id: 18,
    //   name: "Bad boy carolina herrera",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/mcAyI4D.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    //   utilisation: 'Utilisation: Spray sur le corps',
    //   particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    //  {
    //   id: 9,
    //   name: "La nuit de l'Homme",
    //   price: "5550 Fcfa",
    //   size: "12ml",
    //   category: "Eau de parfum",
    //   imageUrl: "https://i.imgur.com/DsjTCUD.jpeg",
    //   description: `Nos Eaux De Parfum sont inspirés de vos  marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.`,
    // utilisation: 'Utilisation: Spray sur le corps',
    // particularité:'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce Tiennent plus de 24h sur la peau et sur les vêtements Packaging Premium Fabrication Artisanale Camerounaise.',
    // },
    {
      id: 1,
      name: "BEESWAX Lip Balm",
      price: "1000 Fcfa",
      size: "5g",
      category: "Tube lip balm",
      imageUrl: "https://i.imgur.com/dwsPUxE.jpeg",
      description:"Fait a base de cire d'abeille et d'huiles vegetales bio, les baumes à lèvres EXTRAITS apportent douceur et confort pour vos lèvres. Le fini mat et la texture riche soulagent les lèvres et leur rendent leur souplesse, tout en assurant un aspect lisse et doux.Les abeilles prennent soin de vos lèvres avec ce baume hydratant à la cire d'abeille. Un sourire frais et naturel dans un tube retractable dans la poche ou le sac, pour hydrater vos lèvres à tout moment de la journée !",
     utilisation:"Uilisation : Appliquer sur les lèvres aussi souvent que nécessaire. Ne pas avaler.",
    particularité:"Sans Parfums ajoutes; A base d'ingredients 100% Naturels parmis lesquels la cire d'abeille reparatrice/protectrice et les beurres Hydratants. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly. Soulage les irritations",
    },
    {
      id: 1,
      name: "Vanilla lace",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/seFa5HK.jpeg",
      description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "Particularité:SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",    
    },
    {
      id: 2,
      name: "Warm vanilla sugar",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/d5EVyno.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },
    {
      id: 3,
      name: "Coconut passion noir",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/zttwqFM.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },
    {
      id: 4,
      name: "Amber Romance",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/S9efAzV.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },
    {
      id: 4,
      name: "Sensual Amber",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/id9dtBo.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },
    {
      id: 4,
      name: "Japanese cherry blossom",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/bhvyZRa.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },
    {
      id: 4,
      name: "Vanilla",
      price: "1500 Fcfa",
      size: "250ml",
      category: "Savon Liquide parfumé pour mains",
      imageUrl: "https://i.imgur.com/NMnekdf.jpeg",
       description:"Nos Savons Liquides Parfumés pour mains sont inspires de vos  marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.",
    utilisation: "Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l'eau claire.",
    particularité: "SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly",
    },

];

// Ajoute automatiquement un champ "slug" à chaque produit

export const products = rawProducts.map((product) => ({
  ...product,
  slug: generateSlug(product, rawProducts),
}));


// INSERT INTO produit (
//     categorie_id, 
//     nomProduit, 
//     sexeCible, 
//     familleOlfactive, 
//     quantiteProduit, 
//     quantiteAlerte, 
//     contenanceProduit, 
//     senteur, 
//     prixProduit, 
//     descriptionProduit, 
//     modeUtilisation, 
//     particularite, 
//     personnalite, 
//     imagePrincipale, 
//     estDisponible, 
//     created_at, 
//     updated_at
// ) VALUES 
// -- Golden Dust (id: 7)
// ('4', 'Golden Dust', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/BRyWZic.jpeg', 1, NOW(), NOW()),

// -- Fruits Rouges (id: 8)
// ((SELECT id FROM categorie WHERE name = 'Brume parfumée'), 'Fruits Rouges', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, NULL, NULL, NULL, NULL, 'https://i.imgur.com/Aes9NpI.jpeg', 1, NOW(), NOW()),

// -- Lemon Vanille (id: 9)
// ( (SELECT id FROM categorie WHERE name = 'Brume parfumée'), 'Lemon Vanille', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, NULL, NULL, NULL, NULL, 'https://i.imgur.com/BZDxhAq.jpeg', 1, NOW(), NOW()),

// -- Lavender Bouquet (id: 10)
// ( (SELECT id FROM categorie WHERE name = 'Brume parfumée'), 'Lavender Bouquet', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, NULL, NULL, NULL, NULL, 'https://i.imgur.com/lodJd7a.jpeg', 1, NOW(), NOW()),

// -- Fruits rouges (Diffuseur) (id: 4)
// ( (SELECT id FROM categorie WHERE name = 'Diffuseurs de parfum à tiges aromatiques'), 'Fruits rouges', 'Unisexe', NULL, 100, 10, '120ml', NULL, 15000, 'La délicatesse des senteurs des diffuseurs d\'ambiance EXTRAITS n\'est pas leur seul avantage. Avec leur look simple et épuré, ils sont tout aussi agréables à sentir qu\'à regarder ! Les longues tiges de rotin reposent sur un socle en verre, surmonté d\'une bague argentée. Véritable élément de déco de luxe, vous pouvez le placer où bon vous semble. Sur une table, une commode ou même une table de nuit, l\'odeur qu\'il diffuse se répartit de manière égale dans tous les coins de la pièce. Les diffuseurs d\'ambiance EXTRAITS se fondent discrètement dans la décoration de vos espaces de vie, et diffusent une odeur agréable et constante. Aucun entretien nécessaire, il vous suffit de retirer l\'opercule de protection et de plonger les tiges de rotin dans le liquide parfumé. Grâce à la capillarité, ils s\'imprègnent alors petit à petit de l\'odeur que vous avez choisie. Il ne vous reste plus qu\'à fermer les yeux, et à laisser cette douce fragrance vous enivrer !', 'Utilisation : Placer les tiges dans le liquide parfumé et laisser diffuser l\'odeur. En Interieur ( Sejour, SDB, Bureau, Chambres etc…)', 'Particularité :Les Fragrances utilisees dans nos produits sont répondent tous aux recommandations IFRA (International Fragrance Association) , VOC (Composé organique volatil) Free - Cruelty Free Sans Alcools Format Recharge disponible sur commande Fabrication Artisanale Camerounaise', NULL, 'https://i.imgur.com/7zsDJks.jpeg', 1, NOW(), NOW()),

// -- Tea Tree (id: 5)
// ( (SELECT id FROM categorie WHERE name = 'Huile Essentielles'), 'Tea Tree', 'Unisexe', NULL, 100, 10, '12ml', NULL, 3500, 'Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d\'une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara', 'Utilisation : En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d\'eau en subtitut aux fondants', 'Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%', NULL, 'https://i.imgur.com/SVOE0mI.jpeg', 1, NOW(), NOW()),

// -- Clove (id: 6)
// ( (SELECT id FROM categorie WHERE name = 'Huile Essentielles'), 'Clove', 'Unisexe', NULL, 100, 10, '12ml', NULL, 3500, 'Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d\'une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara', 'Utilisation : En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d\'eau en subtitut aux fondants', 'Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%', NULL, 'https://i.imgur.com/sRLIIEX.jpeg', 1, NOW(), NOW()),

// -- Patchouli (id: 7)
// ( (SELECT id FROM categorie WHERE name = 'Huile Essentielles'), 'Patchouli', 'Unisexe', NULL, 100, 10, '12ml', NULL, 3500, 'Les Huiles Essentielles EXTRAITS sont pures et 100% naturelles. Rigoureusement sélectionnées et contrôlées, elles sont issues de plantes sauvages, de cultures biologiques ou écologiques. Elles sont extraites par distillation. Nous disposons d\'une vingtaines de reference : Citronelle, Arbre a the, Orange, Lemon, Rose, Bois de Santal, Patchouli, Menthe Poivrée, Lavande, Eucalyptus, Cannelle, Clous de Girofle, Pamplemousse, Lemongrass, Rosemary, Sweet Orange, Vanille, Ylang Ylang, Ravintsara', 'Utilisation: En cosmetique en application sur la peau prealablement diluee au dixieme dans une huile vegetale. En Aromatherapie Dans nos diffseurs Ultrasonic ou en inhalation. Sur nos bruleurs avec un peu d\'eau en subtitut aux fondants', 'Toutes nos huiles essentielles sont extraites par distillation. Pures a 100%', NULL, 'https://i.imgur.com/nu0pQl2.jpeg', 1, NOW(), NOW()),





// -- Tobacco Vanilla (id: 3)
// ( '5', 'Tobacco Vanilla', 'Unisexe', NULL, 100, 10, '120ml', NULL, 15000, 'Nos parfums sont inspires de vos marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.', 'Utilisation : Spray sur le corps', 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise', NULL, 'https://i.imgur.com/fVasoSi.jpeg', 1, NOW(), NOW()),

// -- Chance eau tendre (id: 4)
// ('5', 'Chance eau tendre', 'Unisexe', NULL, 100, 10, '120ml', NULL, 15000, 'Nos parfums sont inspires de vos marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.', 'Utilisation : Spray sur le corps', 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise', NULL, 'https://i.imgur.com/SEOKOAe.jpeg', 1, NOW(), NOW()),

// -- Pink chiffon BBW (id: 5)
// ( '5', 'Pink chiffon BBW', 'Unisexe', NULL, 100, 10, '120ml', NULL, 15000, 'Nos parfums sont inspires de vos marques préferées, des senteurs quasi identiques, une teneur en parfum largement au dessus des parfums du commerce a un prix très accessible.', 'Utilisation : Spray sur le corps', 'Particularité : Teneur en parfum plus élevée que dans les Eau De Parfum du commerce; Tiennent plus de 24h sur la peau et sur les vêtements ;Packaging Premium Fabrication Artisanale Camerounaise', NULL, 'https://i.imgur.com/HwgyhCJ.jpeg', 1, NOW(), NOW()),

// -- Sekushi Nat (id: 14)
// ('4', 'Sekushi Nat', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/G7VMMms.jpeg', 1, NOW(), NOW()),

// -- Terre d'Hermes (id: 15)
// (39, '4', 'Terre d\'Hermes', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/sRGcaUJ.jpeg', 1, NOW(), NOW()),

// -- Invictus (id: 16)
// ( '4', 'Invictus', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/G7VMMms.jpeg', 1, NOW(), NOW()),

// -- Issey Miyake (id: 17)
// ( '4', 'Issey Miyake', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/7jVBCPr.jpeg', 1, NOW(), NOW()),

// -- Bad boy carolina herrera (id: 18)
// ( '4', 'Bad boy carolina herrera', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/mcAyI4D.jpeg', 1, NOW(), NOW()),

// -- La nuit de l'Homme (id: 9)
// ( '4', 'La nuit de l\'Homme', 'Unisexe', NULL, 100, 10, '12ml', NULL, 5550, 'Nos Eaux De Parfum sont inspirés de vos marques préférées, des senteurs quasi identiques, une teneur en parfum largement au dessus des eaux de parfum du commerce a un prix très accessible.', 'Utilisation: Spray sur le corps', 'Particularité :Teneur en parfum plus élevée que dans les EDP du commerce .Tiennent plus de 8h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/DsjTCUD.jpeg', 1, NOW(), NOW()),

// -- Sensual Amber (id: 10)
// ( (SELECT id FROM categorie WHERE name = 'Body mist'), 'Sensual Amber', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/uGykVto.jpeg', 1, NOW(), NOW()),

// -- Vanilla lace (id: 11)
// ( (SELECT id FROM categorie WHERE name = 'Body mist'), 'Vanilla lace', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/laqVRGF.jpeg', 1, NOW(), NOW()),

// -- Amber romance (id: 19)
// ((SELECT id FROM categorie WHERE name = 'Body mist'), 'Amber romance', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/kDmpaB1.jpeg', 1, NOW(), NOW()),

// -- Warm vanilla sugar (id: 20)
// ((SELECT id FROM categorie WHERE name = 'Body mist'), 'Warm vanilla sugar', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/5oYLMkH.jpeg', 1, NOW(), NOW()),

// -- Love spell (id: 21)
//  ((SELECT id FROM categorie WHERE name = 'Body mist'), 'Love spell', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/h2d5Pby.jpeg', 1, NOW(), NOW()),

// -- Japanese Cherry Blossom (id: 26)
// ((SELECT id FROM categorie WHERE name = 'Body mist'), 'Japanese Cherry Blossom', 'Unisexe', NULL, 100, 10, '35ml', NULL, 6500, 'Nos Brumes sont inspires de vos marques préférées (Victoria Secret & BBW), des senteurs quasi identiques, une teneur en parfum largement au dessus des brumes du commerce a un prix très accessible', 'Utilisation : Spray sur le corps.', 'Particularité :Teneur en parfum plus élevée que dans les brumes du commerce Fabrication Artisanale Camerounaise.', NULL, 'https://i.imgur.com/Jb6eV93.jpeg', 1, NOW(), NOW()),

// -- Basil (id: 27)
// ( (SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Basil', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/jtRTZGZ.jpeg', 1, NOW(), NOW()),

// -- Géranium (id: 28)
// ( (SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Géranium', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/SSvQxIO.jpeg', 1, NOW(), NOW()),

// -- Ylang Ylang (id: 29)
// ( (SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Ylang Ylang', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/zWhs3cB.jpeg', 1, NOW(), NOW()),

// -- Spearmint (id: 22)
// ( (SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Spearmint', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/5a4jdD0.jpeg', 1, NOW(), NOW()),

// -- Cedarwood (id: 23)
// ( (SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Cedarwood', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/DFRt0U6.jpeg', 1, NOW(), NOW()),

// -- Ravintsara (id: 24)
// ((SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Ravintsara', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/wVcFcMA.jpeg', 1, NOW(), NOW()),

// -- Lemongrass (id: 25)
// ((SELECT id FROM categorie WHERE name = 'Huile de parfum'), 'Lemongrass', 'Unisexe', NULL, 100, 10, '10ml', NULL, 3000, 'Concentre d\'huile de parfum non dilues et sans alcool. Nos Essences sont inspires de vos marques preferees.', 'Utilisation : Elle s\'utilsent directement sur la peau ou dilue dans un lait de corps', 'Particularité :Sans Alcool - Child/Baby Friendly Tiennent au minimum 24h sur la peau et bcp plus sur les vêtements Fabrication Artisanale Camerounaise Format Rechargeable.', NULL, 'https://i.imgur.com/oRTbKef.jpeg', 1, NOW(), NOW()),

// -- BEESWAX Lip Balm (id: 1)
// ((SELECT id FROM categorie WHERE name = 'Tube lip balm'), 'BEESWAX Lip Balm', 'Unisexe', NULL, 100, 10, '5g', NULL, 1000, 'Fait a base de cire d\'abeille et d\'huiles vegetales bio, les baumes à lèvres EXTRAITS apportent douceur et confort pour vos lèvres. Le fini mat et la texture riche soulagent les lèvres et leur rendent leur souplesse, tout en assurant un aspect lisse et doux.Les abeilles prennent soin de vos lèvres avec ce baume hydratant à la cire d\'abeille. Un sourire frais et naturel dans un tube retractable dans la poche ou le sac, pour hydrater vos lèvres à tout moment de la journée !', 'Uilisation : Appliquer sur les lèvres aussi souvent que nécessaire. Ne pas avaler.', 'Sans Parfums ajoutes; A base d\'ingredients 100% Naturels parmis lesquels la cire d\'abeille reparatrice/protectrice et les beurres Hydratants. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly. Soulage les irritations', NULL, 'https://i.imgur.com/dwsPUxE.jpeg', 1, NOW(), NOW()),

// -- Vanilla lace (Savon) (id: 1)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Vanilla lace', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/seFa5HK.jpeg', 1, NOW(), NOW()),

// -- Warm vanilla sugar (Savon) (id: 2)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Warm vanilla sugar', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/d5EVyno.jpeg', 1, NOW(), NOW()),

// -- Coconut passion noir (id: 3)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Coconut passion noir', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/zttwqFM.jpeg', 1, NOW(), NOW()),

// -- Amber Romance (Savon) (id: 4)
// ( (SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Amber Romance', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/S9efAzV.jpeg', 1, NOW(), NOW()),

// -- Sensual Amber (Savon) (id: 4)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Sensual Amber', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/id9dtBo.jpeg', 1, NOW(), NOW()),

// -- Japanese cherry blossom (Savon) (id: 4)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Japanese cherry blossom', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/bhvyZRa.jpeg', 1, NOW(), NOW()),

// -- Vanilla (Savon) (id: 4)
// ((SELECT id FROM categorie WHERE name = 'Savon Liquide parfumé pour mains'), 'Vanilla', 'Unisexe', NULL, 100, 10, '250ml', NULL, 1500, 'Nos Savons Liquides Parfumés pour mains sont inspires de vos marques préférées des senteurs quasi identiques, une teneur en parfum largement au dessus des savons liquides du commerce a un prix très accessible.', 'Utilisation : Appliquer sur les mains mouillées, frotter et rincer à l\'eau claire.', 'SAF (savon saponifié à froid): Processus qui permet de conserver proprietes de chaque ingredients pendant le production et de creer de la gylcerine naturelle qui est hydratante pour la peau. A base d\'huiles vegetales traitantes et hydratantes et de base alcaline. Sans Colorants, Sans conservateurs, Zero Phtalates, Zero Paraben. Baby and Pregnant women Friendly', NULL, 'https://i.imgur.com/NMnekdf.jpeg', 1, NOW(), NOW());