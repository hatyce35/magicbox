import { Combination } from '../types/game';

export const COMBINATIONS: Combination[] = [
  // --- FIRST 10 PROGRESSION CHAIN ---
  {
    inputs: ['seed', 'water'],
    result: 'plant',
    animation: 'grow',
    funFact: {
      en: 'The seed drank the cool water and sprouted a fresh green plant!',
      tr: 'Tohum suyu içti ve yemyeşil bir bitkiye dönüştü!',
    },
  },
  {
    inputs: ['plant', 'sun'],
    result: 'flower',
    animation: 'grow',
    funFact: {
      en: 'Warm sunlight kissed the leaves, blooming into a lovely flower!',
      tr: 'Ilık güneş yapraklara dokundu ve harika bir çiçek açtı!',
    },
  },
  {
    inputs: ['plant', 'seed'],
    result: 'tree',
    animation: 'grow',
    funFact: {
      en: 'Growing bigger and taller, it became a great friendly tree!',
      tr: 'Büyüdü, serpildi ve kocaman bir dost ağaç oldu!',
    },
  },
  {
    inputs: ['tree', 'sun'],
    result: 'apple',
    animation: 'bounce',
    funFact: {
      en: 'Sunshine ripened the branches, dropping a delicious red apple!',
      tr: 'Güneş dalları olgunlaştırdı ve tatlı bir kırmızı elma verdi!',
    },
  },
  {
    inputs: ['flower', 'sun'],
    result: 'bee',
    animation: 'sparkle',
    funFact: {
      en: 'A cheerful buzzing bee flew over to visit the sweet petals!',
      tr: 'Neşeyle vızıldayan bir arı çiçekleri ziyarete geldi!',
    },
  },
  {
    inputs: ['bee', 'flower'],
    result: 'honey',
    animation: 'bounce',
    funFact: {
      en: 'The busy bee made sweet, golden honey!',
      tr: 'Çalışkan arı lezzetli, altın rengi bal yaptı!',
    },
  },
  {
    inputs: ['stone', 'fire'],
    result: 'lava',
    animation: 'sparkle',
    funFact: {
      en: 'Fire melted the stone into glowing, crackling lava!',
      tr: 'Ateş taşı eritti ve ışıldayan lavlara dönüştürdü!',
    },
  },
  {
    inputs: ['fire', 'water'],
    result: 'steam',
    animation: 'float',
    funFact: {
      en: 'Sizzle! Water touched fire and rose into puffy steam clouds!',
      tr: 'Cısss! Su ateşe değdi ve gökyüzüne buhar olarak yükseldi!',
    },
  },
  {
    inputs: ['water', 'stone'],
    result: 'river',
    animation: 'float',
    funFact: {
      en: 'Water carved smooth paths around the stones to form a river!',
      tr: 'Su taşların etrafından akıp berrak bir nehir oluşturdu!',
    },
  },
  {
    inputs: ['water', 'sun'],
    result: 'rainbow',
    animation: 'sparkle',
    funFact: {
      en: 'Sunlight shining through water droplets cast a magical rainbow!',
      tr: 'Güneş ışığı su damlalarından geçip gökkuşağı yarattı!',
    },
  },

  // --- SECONDARY NATURE & ELEMENTS CHAINS ---
  {
    inputs: ['steam', 'water'],
    result: 'cloud',
    animation: 'float',
    funFact: {
      en: 'Floating steam gathered together to make a fluffy cloud!',
      tr: 'Uçuşan buharlar birleşip yumuşacık bir bulut oldu!',
    },
  },
  {
    inputs: ['cloud', 'water'],
    result: 'rain',
    animation: 'bounce',
    funFact: {
      en: 'The cloud got heavy with droplets and started to rain!',
      tr: 'Bulut doldu taştı ve tatlı tatlı yağmur yağmaya başladı!',
    },
  },
  {
    inputs: ['rain', 'seed'],
    result: 'flower',
    animation: 'grow',
    funFact: {
      en: 'Gentle raindrops helped baby seeds wake up into blossoms!',
      tr: 'Yağmur damlaları tohumları uyandırıp çiçeğe dönüştürdü!',
    },
  },
  {
    inputs: ['rain', 'sun'],
    result: 'rainbow',
    animation: 'sparkle',
    funFact: {
      en: 'Rain and sun together created an arch of seven colors!',
      tr: 'Güneş ve yağmur el ele verip gökkuşağı çizdi!',
    },
  },
  {
    inputs: ['rainbow', 'cloud'],
    result: 'rainbow_cloud',
    animation: 'sparkle',
    funFact: {
      en: 'A soft cloud captured all the colors of the rainbow!',
      tr: 'Pamuk bulut gökkuşağının tüm renklerine büründü!',
    },
  },
  {
    inputs: ['sun', 'flower'],
    result: 'sunflower',
    animation: 'grow',
    funFact: {
      en: 'A big, joyful sunflower opened up to smile back at the sun!',
      tr: 'Kocaman sarı bir ayçiçeği güneşe neşeyle gülümsedi!',
    },
  },
  {
    inputs: ['plant', 'water'],
    result: 'frog',
    animation: 'bounce',
    funFact: {
      en: 'Ribbit! A tiny green frog leaped onto the floating leaves!',
      tr: 'Vırak! Minik yeşil bir kurbağa yaprakların üstüne zıpladı!',
    },
  },
  {
    inputs: ['river', 'water'],
    result: 'fish',
    animation: 'bounce',
    funFact: {
      en: 'A splash in the river! A little silver fish swam into view!',
      tr: 'Nehirde bir şıpırtı! Minik bir balık yüzerek geldi!',
    },
  },
  {
    inputs: ['fish', 'water'],
    result: 'aquarium',
    animation: 'sparkle',
    funFact: {
      en: 'A clean crystal bowl made a cozy home for the fish!',
      tr: 'Balık için pırıl pırıl temiz bir akvaryum yuvası yapıldı!',
    },
  },
  {
    inputs: ['plant', 'flower'],
    result: 'caterpillar',
    animation: 'bounce',
    funFact: {
      en: 'A friendly caterpillar arrived for an afternoon snack on a leaf!',
      tr: 'Sevimli bir tırtıl yaprakta öğle yemeği yemeye geldi!',
    },
  },
  {
    inputs: ['caterpillar', 'flower'],
    result: 'butterfly',
    animation: 'float',
    funFact: {
      en: 'Flutter flutter! The caterpillar unfolded colorful butterfly wings!',
      tr: 'Pır pır! Tırtıl kanatlanıp rengarenk bir kelebeğe dönüştü!',
    },
  },
  {
    inputs: ['tree', 'river'],
    result: 'bird',
    animation: 'float',
    funFact: {
      en: 'A sweet songbird flew down to drink from the clean river!',
      tr: 'Güzel sesli minik kuş nehir kenarına su içmeye kondu!',
    },
  },
  {
    inputs: ['tree', 'bird'],
    result: 'nest',
    animation: 'bounce',
    funFact: {
      en: 'The bird gathered soft twigs to build a snug nest!',
      tr: 'Kuş incecik dalları toplayıp sıcacık bir yuva kurdu!',
    },
  },
  {
    inputs: ['nest', 'bird'],
    result: 'egg',
    animation: 'bounce',
    funFact: {
      en: 'Inside the warm nest, a smooth little egg appeared!',
      tr: 'Sıcak yuvanın içinde pürüzsüz minik bir yumurta belirdi!',
    },
  },
  {
    inputs: ['egg', 'fire'],
    result: 'baby_dino',
    animation: 'bounce',
    funFact: {
      en: 'Crack! Gentle warmth hatched an adorable baby dinosaur!',
      tr: 'Çat! Ilık sıcaklık sevimli bir yavru dinozor çıkarttı!',
    },
  },
  {
    inputs: ['cloud', 'stone'],
    result: 'ice',
    animation: 'sparkle',
    funFact: {
      en: 'Cold mountain breezes froze moisture into shimmering ice!',
      tr: 'Dağ rüzgarları suyu pırıl pırıl bir buza dönüştürdü!',
    },
  },
  {
    inputs: ['ice', 'stone'],
    result: 'snowman',
    animation: 'bounce',
    funFact: {
      en: 'Rolling snowballs together made a jolly snowman friend!',
      tr: 'Kar toplarını yuvarlayınca neşeli bir kardan adam dost oldu!',
    },
  },
  {
    inputs: ['tree', 'rain'],
    result: 'mushroom',
    animation: 'grow',
    funFact: {
      en: 'After the woodland rain, a polka-dot mushroom popped up!',
      tr: 'Orman yağmurundan sonra benekli sevimli bir mantar bitti!',
    },
  },

  // --- CELESTIAL & SPACE CHAINS ---
  {
    inputs: ['sun', 'fire'],
    result: 'star',
    animation: 'sparkle',
    funFact: {
      en: 'The blazing fire joined the sun and created a shining star!',
      tr: 'Ateşin parıltısı güneşe katıldı ve parlak bir yıldız doğdu!',
    },
  },
  {
    inputs: ['star', 'stone'],
    result: 'moon',
    animation: 'float',
    funFact: {
      en: 'The cool cosmic stone reflected starlight as a smiling moon!',
      tr: 'Yıldız ışığı taşa yansıdı ve gülümseyen bir ay oldu!',
    },
  },
  {
    inputs: ['moon', 'star'],
    result: 'night_sky',
    animation: 'sparkle',
    funFact: {
      en: 'Together, the moon and stars painted the deep night sky!',
      tr: 'Ay ve yıldızlar birleşip büyüleyici gece gökyüzünü çizdi!',
    },
  },
  {
    inputs: ['star', 'magic_dust'],
    result: 'shooting_star',
    animation: 'sparkle',
    funFact: {
      en: 'Glittery magic made the star zoom fast across the sky!',
      tr: 'Sihirli toz yıldıza değdi ve gökyüzünden bir yıldız kaydı!',
    },
  },
  {
    inputs: ['star', 'fire'],
    result: 'rocket',
    animation: 'float',
    funFact: {
      en: '3... 2... 1... Blastoff! A speedy rocket headed for the stars!',
      tr: '3... 2... 1... Ateşle! Yıldızlara uçan hızlı bir roket!',
    },
  },
  {
    inputs: ['night_sky', 'stone'],
    result: 'planet',
    animation: 'float',
    funFact: {
      en: 'Deep in space, a beautiful planet with shimmering rings spun!',
      tr: 'Uzayın derinliklerinde halkaları olan harika bir gezegen döndü!',
    },
  },

  // --- MAGIC & WONDERS CHAINS ---
  {
    inputs: ['star', 'flower'],
    result: 'magic_dust',
    animation: 'sparkle',
    funFact: {
      en: 'Flower nectar and starlight ground into shimmering magic dust!',
      tr: 'Çiçek özü ve yıldız ışığı ışıltılı sihirli toza dönüştü!',
    },
  },
  {
    inputs: ['tree', 'magic_dust'],
    result: 'wand',
    animation: 'sparkle',
    funFact: {
      en: 'A branch polished with magic dust became a true magic wand!',
      tr: 'Sihirli tozla parlatılan dal büyülü bir değneğe dönüştü!',
    },
  },
  {
    inputs: ['wand', 'stone'],
    result: 'crystal',
    animation: 'sparkle',
    funFact: {
      en: 'A tap of the wand turned ordinary rock into a glowing crystal sphere!',
      tr: 'Değneğin ucu taşa değdi ve parlayan kristal bir küre oldu!',
    },
  },
  {
    inputs: ['lava', 'stone'],
    result: 'gem',
    animation: 'sparkle',
    funFact: {
      en: 'Tremendous heat and rock pressed into a brilliant gemstone!',
      tr: 'Yoğun sıcaklık ve kaya harika bir mücevhere dönüştü!',
    },
  },
  {
    inputs: ['flower', 'magic_dust'],
    result: 'fairy',
    animation: 'float',
    funFact: {
      en: 'Sparkles swirled around the petals and a tiny fairy laughed!',
      tr: 'Işıltılar çiçeğin etrafında döndü ve minik bir peri belirdi!',
    },
  },
  {
    inputs: ['water', 'magic_dust'],
    result: 'potion',
    animation: 'sparkle',
    funFact: {
      en: 'Bubbly colors swirled in the vial to make a wondrous potion!',
      tr: 'Şişede dans eden renkler harika bir sihirli iksire dönüştü!',
    },
  },

  // --- ITEMS & FOOD CHAINS ---
  {
    inputs: ['seed', 'fire'],
    result: 'bread',
    animation: 'bounce',
    funFact: {
      en: 'Ground grain baked by warm fire into delicious golden bread!',
      tr: 'Tahıllar ateşin sıcağında mis kokulu ekmeğe dönüştü!',
    },
  },
  {
    inputs: ['honey', 'bread'],
    result: 'sweet_snack',
    animation: 'bounce',
    funFact: {
      en: 'Drizzling honey over fresh bread made sweet fluffy pancakes!',
      tr: 'Ekmeğin üstüne bal dökülünce enfes ballı pankek oldu!',
    },
  },
  {
    inputs: ['tree', 'apple'],
    result: 'fruit_basket',
    animation: 'bounce',
    funFact: {
      en: 'A basket full of crunchy apples gathered under the big tree!',
      tr: 'Ağacın altından toplanan elmalarla dolu nefis bir meyve sepeti!',
    },
  },
];

/**
 * Finds a combination matching two input item ids (order independent).
 */
export function findCombination(itemA: string, itemB: string): Combination | null {
  for (const combo of COMBINATIONS) {
    const [in1, in2] = combo.inputs;
    if ((in1 === itemA && in2 === itemB) || (in1 === itemB && in2 === itemA)) {
      return combo;
    }
  }
  return null;
}
