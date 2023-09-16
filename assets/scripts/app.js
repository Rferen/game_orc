const NYUGDIJASOK = 6;
const SZANKCIOK = 13;
const MONSTER_ATTACK_VALUE = 9;
const CIGI = 12;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let isPlaying = false;
let actionCounter = 0;

async function usure() {
  if (
    confirm('azt állította miniszterelnök úr hogy áremelések lesznek ezigaz?')
  ) {
    // igen
    alert('fake news!');
    await playvideo('./assets/videos/fake_news.mp4');
  } else {
    //  nem
    alert('mondtál valamit vicceset és mindeki elfelejetette a kérdést!');
    await playvideo('./assets/videos/vicces_orban.mp4');
  }
}

function playOptional() {
  actionCounter++;

  if (actionCounter === 3) {
    uSure();
  }
}

function randomExecute(func) {
  const randomValue = Math.random();
  if (randomValue <= 0.1) {
    func();
  }
}
// function randomexecute(func) {
//   const randomvalue = math.random();
//   if (randomvalue <= 0.10) {
//     func();
//   }
// }
// randomexecute(usure);

async function playVideo(newSource) {
  videoSource.setAttribute('src', newSource);
  await video.load();
  video.currentTime = 0; // Videó visszaállítása az elejére
  await video.play();
  isPlaying = true;
}

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('2/3 NYERTÉL MINT MINDIG!');
    playVideo('./assets/videos/Fidesz_nyert.mp4');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Az ellenzék nyert!');
    playVideo('./assets/videos/Mocskos_fidesz.mp4');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('Draw');
  }
}

async function suicide() {
  await playOptional();

  await playVideo('./assets/videos/Biztos.mp4');
  if (confirm('Biztos meg vonod a 13 havi nyugdíjat?')) {
    // Igen
    alert(
      'A szavazóid elálltak mellőled mert meg vontad a 13 havi nyugdíjat ezért automatikusan vesztettél!'
    );
    const playerDamage = dealPlayerDamage(1000);
    currentPlayerHealth -= playerDamage;
  } else {
    // Nem
    alert('Bölcs döntés!');
  }
  endRound();
}

async function easyWin() {
  await playOptional();

  alert(
    'Magyarország 99% beszopta a dumádat ezért tovább uralkodsz mint királyuk! Automatikusan nyertél!'
  );
  const monsterDamage = dealMonsterDamage(100000);
  currentMonsterHealth -= monsterDamage;
  playVideo('./assets/videos/Brusszel_hibas.mp4');
  endRound();
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'NYUGDIJASOK') {
    maxDamage = NYUGDIJASOK;
  } else if (mode === 'SZANKCIOK') {
    maxDamage = SZANKCIOK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

async function selfHarm() {
  await playOptional();

  playVideo('./assets/videos/verd_ki.mp4');
  const playerDamage = dealPlayerDamage(31);
  currentPlayerHealth -= playerDamage;
}

async function attackHandler() {
  attackMonster('NYUGDIJASOK');
  await playVideo('./assets/videos/Nyugdijasok_duhe_mortal.mp4');
  await playOptional();
}

async function strongAttackHandler() {
  attackMonster('SZANKCIOK');
  await playVideo('./assets/videos/Szankciok.mp4');
  await playOptional();
}

async function healPlayerHandler() {
  await playOptional();

  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - CIGI) {
    alert('Ennél táposabb már nem leszel!');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = CIGI;
  }
  playVideo('./assets/videos/Kolbasz_eves.mp4');
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
suicideBtn.addEventListener('click', suicide);
winBTN.addEventListener('click', easyWin);
selfHarmBtn.addEventListener('click', selfHarm);

adjustHealthBars(chosenMaxLife);
randomExecute(uSure);
