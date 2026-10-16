export const wardrobe=[
  {id:'france',src:'/duo-winning-outfit.png',alt:'Duo in his embroidered French court outfit'},
  {id:'spain',src:'/world-finale/duo-spain.webp',alt:'Duo adjusting an embroidered Spanish traje de luces and montera'},
  {id:'usa',src:'/world-finale/duo-usa.webp',alt:'Duo adjusting his cap in a cream and navy American baseball uniform'},
  {id:'japan',src:'/world-finale/duo-japan.webp',alt:'Duo in an indigo kimono with gold cranes and a red obi'},
  {id:'italy',src:'/world-finale/duo-italy.webp',alt:'Duo in an embroidered emerald Italian Renaissance doublet and burgundy cape'},
  {id:'china',src:'/world-finale/duo-china.webp',alt:'Duo in a red, ivory and jade Chinese hanfu with gold phoenix embroidery'},
]

export function projectCity(lon,lat){return [70+(lon+180)/360*1460,190+(85-lat)/145*620]}

export const cities=[
  {id:'paris',name:'Paris',coordinates:[2.3522,48.8566],label:[700,203],color:'#3b86c8'},
  {id:'tokyo',name:'Tokyo',coordinates:[139.6917,35.6895],label:[1450,295],color:'#f27b64'},
  {id:'seoul',name:'Seoul',coordinates:[126.978,37.5665],label:[1233,198],color:'#4f9e80'},
  {id:'rome',name:'Rome',coordinates:[12.4964,41.9028],label:[969,539],color:'#d6a35d'},
  {id:'beijing',name:'Beijing',coordinates:[116.4074,39.9042],label:[1177,538],color:'#da6554'},
  {id:'madrid',name:'Madrid',coordinates:[-3.7038,40.4168],label:[660,492],color:'#c7955a'},
]

// Each costume has an unhurried hold; the final hanfu gets an extra beat.
export const finaleTiming={firstChange:1.1,outfitInterval:1.9,costumeSwap:.29,dressingDuration:.82,pullback:11.2,cityStart:14.6,cityInterval:.67,title:18.9,complete:20.1}
