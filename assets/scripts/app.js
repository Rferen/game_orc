const NYUGDIJASOK = 6;
const SZANKCIOK = 13;
const MONSTER_ATTACK_VALUE = 9;
const CIGI = 12;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let isPlaying = false;

adjustHealthBars(chosenMaxLife);

// function uSure (){
//   if (confirm ("Azt állította MiniszterElnök Úr hogy áremelések lesznek ezigaz?")) {
//     // Igen
//     alert('Fake news!');
//     playVideo("./assets/videos/Fake_news.mp4")
//   } else {
//     //  Nem
//     alert('Mondtál valamit vicceset és mindeki elfelejetette a kérdést!');
//     playVideo("./assets/videos/Vicces_orban.mp4")
//   }
// }

// function randomExecute(func) {
//   const randomValue = Math.random();
//   if (randomValue <= 0.10) {
//     func();
//   }
// }
// randomExecute(uSure);

async function playVideo(newSource){
  videoSource.setAttribute('src', newSource);
  await video.load();
  video.currentTime = 0; // Videó visszaállítása az elejére
  await video.play();
  isPlaying = true;
}

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if  (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert('2/3 NYERTÉL MINT MINDIG!');
    playVideo("./assets/videos/Fidesz_nyert.mp4")
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Az ellenzék nyert!');
    playVideo("./assets/videos/Mocskos_fidesz.mp4")
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
    alert('Draw');
  }
}

async function suicide(){
  await playVideo("./assets/videos/Biztos.mp4")
  if (confirm ("Biztos meg vonod a 13 havi nyugdíjat?")) {
    // Igen
    alert('A szavazóid elálltak mellőled mert meg vontad a 13 havi nyugdíjat ezért automatikusan vesztettél!');
    const playerDamage = dealPlayerDamage(1000);
    currentPlayerHealth -= playerDamage;
  } else {
    // Nem
    alert('Bölcs döntés!');
  }
  endRound();
}

function easyWin(){
  alert('Magyarország 99% beszopta a dumádat ezért tovább uralkodsz mint királyuk! Automatikusan nyertél!');
  const monsterDamage = dealMonsterDamage(100000);
  currentMonsterHealth -= monsterDamage;
  playVideo("./assets/videos/Brusszel_hibas.mp4");
  endRound();
}

function attackMonster (mode) {
  let maxDamage;
  if(mode ==='NYUGDIJASOK'){
    maxDamage = NYUGDIJASOK;
  } else if (mode === 'SZANKCIOK'){
    maxDamage = SZANKCIOK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function selfHarm() {
  playVideo("./assets/videos/verd_ki.mp4");
  const playerDamage = dealPlayerDamage(31);
  currentPlayerHealth -= playerDamage;
}

function attackHandler() {
  attackMonster('NYUGDIJASOK');
  playVideo("./assets/videos/Nyugdijasok_duhe_mortal.mp4");
}

function strongAttackHandler() {
  attackMonster('SZANKCIOK');
  playVideo("./assets/videos/Szankciok.mp4");
}

function healPlayerHandler(){
  let healValue;
  if(currentPlayerHealth >= chosenMaxLife - CIGI){
    alert('Ennél táposabb már nem leszel!');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = CIGI;
  }
  playVideo("./assets/videos/Kolbasz_eves.mp4");
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
suicideBtn.addEventListener('click', suicide);
winBTN.addEventListener('click', easyWin);
selfHarmBtn.addEventListener('click', selfHarm)