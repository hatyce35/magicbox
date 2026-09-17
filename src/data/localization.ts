import { Language } from '../types/game';

export interface Translations {
  gameTitle: string;
  gameSubtitle: string;
  discoveries: string;
  collection: string;
  map: string;
  worlds: string;
  settings: string;
  dragHere: string;
  dropInBox: string;
  newDiscovery: string;
  alreadyDiscovered: string;
  tryAnother: string;
  dailyDiscovery: string;
  dailySecretHint: string;
  parentArea: string;
  holdToEnter: string;
  secLeft: string;
  parentGateTitle: string;
  parentGateSub: string;
  language: string;
  soundEffects: string;
  music: string;
  resetProgress: string;
  resetConfirm: string;
  resetSuccess: string;
  close: string;
  allCategories: string;
  nature: string;
  elements: string;
  animals: string;
  magic: string;
  space: string;
  items: string;
  unlocked: string;
  locked: string;
  needMoreStars: string;
  world1Title: string;
  world2Title: string;
  world3Title: string;
  world4Title: string;
  world5Title: string;
  statsTitle: string;
  totalCombinations: string;
  successRate: string;
  tapToContinue: string;
  installApp: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    gameTitle: 'MAGIC BOX',
    gameSubtitle: 'Discover • Combine • Create',
    discoveries: 'Discoveries',
    collection: 'My Discoveries',
    map: 'Discovery Map',
    worlds: 'Worlds',
    settings: 'Grown-Ups',
    dragHere: 'Drag into Magic Box!',
    dropInBox: 'Drop here ✨',
    newDiscovery: 'NEW DISCOVERY!',
    alreadyDiscovered: 'You made this before!',
    tryAnother: 'Hmm... Something else might happen!',
    dailyDiscovery: 'Secret of the Day',
    dailySecretHint: 'Combine these two to reveal today’s secret!',
    parentArea: 'Parent & Settings Area',
    holdToEnter: 'Press & hold 3 seconds',
    secLeft: 'seconds',
    parentGateTitle: 'Parent Verification',
    parentGateSub: 'Hold the button for 3 seconds to enter.',
    language: 'Language',
    soundEffects: 'Sound Effects',
    music: 'Magical Ambience',
    resetProgress: 'Reset Progress',
    resetConfirm: 'Are you sure you want to start over from the beginning?',
    resetSuccess: 'Progress reset! Starting fresh.',
    close: 'Close',
    allCategories: 'All',
    nature: 'Nature',
    elements: 'Elements',
    animals: 'Animals',
    magic: 'Magic',
    space: 'Space',
    items: 'Treasures',
    unlocked: 'Unlocked',
    locked: 'Locked',
    needMoreStars: 'Discover more to unlock!',
    world1Title: 'Little Nature',
    world2Title: 'Ocean Deep',
    world3Title: 'Dino Valley',
    world4Title: 'Cosmic Galaxy',
    world5Title: 'Enchanted Realm',
    statsTitle: 'Play Activity',
    totalCombinations: 'Combinations Explored',
    successRate: 'Recipes Discovered',
    tapToContinue: 'Tap anywhere to collect!',
    installApp: 'Install App',
  },
  tr: {
    gameTitle: 'SİHİRLİ KUTU',
    gameSubtitle: 'Keşfet • Birleştir • Yarat',
    discoveries: 'Keşifler',
    collection: 'Keşiflerim',
    map: 'Keşif Haritası',
    worlds: 'Dünyalar',
    settings: 'Büyükler İçin',
    dragHere: 'Sihirli Kutuya sürükle!',
    dropInBox: 'Buraya bırak ✨',
    newDiscovery: 'YENİ KEŞİF!',
    alreadyDiscovered: 'Bunu daha önce bulmuştun!',
    tryAnother: 'Hmm... Başka bir şey dene bakalım!',
    dailyDiscovery: 'Günün Sırrı',
    dailySecretHint: 'Bugünün sırrını bulmak için bu ikisini birleştir!',
    parentArea: 'Ebeveyn ve Ayarlar',
    holdToEnter: '3 saniye basılı tutun',
    secLeft: 'saniye',
    parentGateTitle: 'Ebeveyn Doğrulaması',
    parentGateSub: 'Giriş yapmak için butona 3 saniye basılı tutun.',
    language: 'Dil',
    soundEffects: 'Ses Efektleri',
    music: 'Sihirli Melodi',
    resetProgress: 'İlerlemeyi Sıfırla',
    resetConfirm: 'Tüm keşifleri sıfırlamak istediğinize emin misiniz?',
    resetSuccess: 'İlerleme sıfırlandı!',
    close: 'Kapat',
    allCategories: 'Tümü',
    nature: 'Doğa',
    elements: 'Elementler',
    animals: 'Hayvanlar',
    magic: 'Sihir',
    space: 'Uzay',
    items: 'Eşyalar',
    unlocked: 'Açık',
    locked: 'Kilitli',
    needMoreStars: 'Açmak için daha fazla keşfet!',
    world1Title: 'Minik Doğa',
    world2Title: 'Derin Okyanus',
    world3Title: 'Dino Vadisi',
    world4Title: 'Kozmik Uzay',
    world5Title: 'Büyülü Diyar',
    statsTitle: 'Oyun İstatistikleri',
    totalCombinations: 'Denenen Birleşimler',
    successRate: 'Bulunan Tarifler',
    tapToContinue: 'Toplamak için tıkla!',
    installApp: 'Uygulamayı Yükle',
  },
};
