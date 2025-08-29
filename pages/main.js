
const estado = {
  refresh: false
};

const observado = new Proxy(estado, {
  set(obj, prop, value) {
    obj[prop] = value;

    if (prop === "refresh") {
      if (value === true) {
        console.log("A porta está aberta");
      } else {
        console.log("A porta está fechada");
      }
    }

    return true;
  }
});

const botao = document.getElementById("start");
const description = document.getElementById("description");
const highscore = document.getElementById("highscore");
if (!localStorage.getItem('highscore')) {
  localStorage.setItem('highscore', 0);
  highscore.textContent = "HIGHSCORE: " + 0;
} else {
  let highscore_achado = Number(localStorage.getItem('highscore'));
  highscore.textContent = "HIGHSCORE: " + highscore_achado
}
let playerhighscore = Number(localStorage.getItem('highscore'));
const minerio = document.getElementById("minerio");
const minerio_img = document.querySelector("#minerio img");
const score = document.getElementById("score")
const lj_bt1 = document.getElementById("powerup-1")
const lj_bt2 = document.getElementById("powerup-2")
const lj_bt3 = document.getElementById("powerup-3")
const lj_img1 = document.getElementById("pw-1")
const lj_img2 = document.getElementById("pw-2")
const lj_img3 = document.getElementById("pw-3")
const lj_pc1 = document.getElementById("preco-1")
const lj_pc2 = document.getElementById("preco-2")
const lj_pc3 = document.getElementById("preco-3")
var luck_upgrades = 1
var speed_upgrades = 1
var multiplier_upgrades = 1
var m_atual = 3
var scorenumber = 0
var HP = 4
var minerio_atual = "pedra"
var slot1 = "speed"
var slot2 = "luck"
var slot3 = "double"
var dinheiro = 1000
import { carregar_Luck } from "./info-storage.js"
import { carregar_Speed } from "./info-storage.js"
import { valor_minerios } from "./info-storage.js"
import { hp_minerios } from "./info-storage.js"
import { luck_preco } from "./info-storage.js"
import { speed_preco } from "./info-storage.js"
var luck_price = Number(luck_preco) * luck_upgrades
var speed_price = Number(speed_preco) * speed_upgrades

botao.addEventListener("click", function () {
  description.style.display = "none";
  botao.style.display = "none";
  highscore.style.display = "none"
  minerio.style.display = "block";
  minerio_img.style.display = "block";
  score.style.display = "block";
  lj_img1.style.display = "block";
  lj_img2.style.display = "block";
  lj_img3.style.display = "block";
  lj_bt1.style.display = "block";
  lj_bt2.style.display = "block";
  lj_bt3.style.display = "block";
  lj_pc1.style.display = "block";
  lj_pc2.style.display = "block";
  lj_pc3.style.display = "block";
  const upgrade1 = Math.floor(Math.random() * 2) + 1;
  const upgrade2 = Math.floor(Math.random() * 2) + 1;
  const upgrade3 = Math.floor(Math.random() * 2) + 1;
  if (upgrade1 == 1) {
    carregar_Luck("pw-1", luck_upgrades)
    slot1 = "luck"
  }
  if (upgrade1 == 2) {
    carregar_Speed("pw-1", speed_upgrades)
    slot1 = "speed"
  }
  if (upgrade2 == 1) {
    carregar_Luck("pw-2", luck_upgrades)
    slot2 = "luck"
  }
  if (upgrade2 == 2) {
    carregar_Speed("pw-2", speed_upgrades)
    slot2 = "speed"
  }
  if (upgrade3 == 1) {
    carregar_Luck("pw-3", luck_upgrades)
    slot3 = "luck"
  }
  if (upgrade3 == 2) {
    carregar_Speed("pw-3", speed_upgrades)
    slot3 = "speed"
  }
  
  setTimeout(function () {
    description.style.display = "block";
    botao.style.display = "inline-block";
    highscore.style.display = "block"
    minerio.style.display = "none";
    minerio_img.style.display = "none";
    score.style.display = "none";
    score.style.display = "none";
    lj_img1.style.display = "none";
    lj_img2.style.display = "none";
    lj_img3.style.display = "none";
    lj_bt1.style.display = "none";
    lj_bt2.style.display = "none";
    lj_bt3.style.display = "none";
    lj_pc1.style.display = "none";
    lj_pc2.style.display = "none";
    lj_pc3.style.display = "none";

    if (scorenumber > playerhighscore) {
      localStorage.setItem('highscore', scorenumber);
      highscore.textContent = "HIGHSCORE: " + scorenumber
    }
    scorenumber = 0
    score.textContent = "SCORE: " + scorenumber;
  }, 180000)
});

let animationTimeout;

minerio.addEventListener("click", function () {
  if (HP > 0) {
    HP = HP - 1
    scorenumber = scorenumber + 1;
  } else {
    if (minerio_atual == "pedra") {
      const preço = Number(valor_minerios.filter((elemento, indice) => indice == 0));
      scorenumber = scorenumber + preço
    }
    if (minerio_atual == "carvao") {
      const preço = Number(valor_minerios.filter((elemento, indice) => indice == 1));
      console.log(preço)
      scorenumber = scorenumber + preço
    }
    if (minerio_atual == "ferro") {
      const preço = Number(valor_minerios.filter((elemento, indice) => indice == 2));
      scorenumber = scorenumber + preço
    }
    if (luck_upgrades == 1) {
      const ore = Math.floor(Math.random() * 5) + 1;
      if (ore == 1) {
        minerio_img.src = "../Ore-Miner/images/iron.png";
        minerio_atual = "ferro"
        const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
        HP = Math.ceil(durabilidade / speed_upgrades)
      }
      if (ore == 2) {
        minerio_img.src = "../Ore-Miner/images/coal.png";
        minerio_atual = "carvao"
        const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 1));
        HP = Math.ceil(durabilidade / speed_upgrades)
      }
      if (ore == 3) {
        minerio_img.src = "../Ore-Miner/images/rock.png";
        minerio_atual = "pedra"
        const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 0));
        HP = Math.ceil(durabilidade / speed_upgrades)
      }
      if (ore == 4) {
        minerio_img.src = "../Ore-Miner/images/rock.png";
        minerio_atual = "pedra"
        const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 0));
        HP = Math.ceil(durabilidade / speed_upgrades)
      }
      if (ore == 5) {
        minerio_img.src = "../Ore-Miner/images/rock.png";
        minerio_atual = "pedra"
        const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 0));
        HP = Math.ceil(durabilidade / speed_upgrades)
      }
    } else if (luck_upgrades == 2) {
        const ore = Math.floor(Math.random() * 10) + 1;
        if (ore < 5) {
          minerio_img.src = "../Ore-Miner/images/rock.png";
          minerio_atual = "pedra"
          const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
          HP = Math.ceil(durabilidade / speed_upgrades)
        } else {
            if (ore < 9) {
            minerio_img.src = "../Ore-Miner/images/coal.png";
            minerio_atual = "carvao"
            const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
            HP = Math.ceil(durabilidade / speed_upgrades)
          } else {
            minerio_img.src = "../Ore-Miner/images/iron.png";
            minerio_atual = "ferro"
            const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
            HP = Math.ceil(durabilidade / speed_upgrades)
          }
        }
    } else {
      const ore = Math.floor(Math.random() * 20) + 1;
        if (ore < 5) {
          minerio_img.src = "../Ore-Miner/images/rock.png";
          minerio_atual = "pedra"
          const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
          HP = Math.ceil(durabilidade / speed_upgrades)
        } else {
            if (ore < 13) {
            minerio_img.src = "../Ore-Miner/images/coal.png";
            minerio_atual = "carvao"
            const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
            HP = Math.ceil(durabilidade / speed_upgrades)
          } else {
            minerio_img.src = "../Ore-Miner/images/iron.png";
            minerio_atual = "ferro"
            const durabilidade = Number(hp_minerios.filter((elemento, indice) => indice == 2));
            HP = Math.ceil(durabilidade / speed_upgrades)
          }
        }
    }

  }
  score.textContent = "SCORE: " + scorenumber;
  console.log(scorenumber);
  minerio_img.classList.remove('shake');

  requestAnimationFrame(() => {
    minerio_img.classList.add('shake');
  });

  console.log(HP)

  clearTimeout(animationTimeout);
  animationTimeout = setTimeout(function () {
    minerio_img.classList.remove('shake');
  }, 500);
})

lj_bt1.addEventListener('click', function() {
  if (slot1 == "luck") {
    if (scorenumber >= luck_price) {
      scorenumber = scorenumber - luck_price;
      score.textContent = "SCORE: " + scorenumber;
      luck_upgrades = luck_upgrades + 1;
      lj_img1.style.display = "none";
      lj_bt1.style.display = "none";
      lj_pc1.style.display = "none";
    }
  }
  if (slot1 == "speed") {
    if (scorenumber >= speed_price) {
      scorenumber = scorenumber - speed_price;
      score.textContent = "SCORE: " + scorenumber;
      speed_upgrades = speed_upgrades + 1;
      lj_img1.style.display = "none";
      lj_bt1.style.display = "none";
      lj_pc1.style.display = "none";
    }
  }
})

lj_bt2.addEventListener('click', function() {
  if (slot2 == "luck") {
    if (scorenumber >= luck_price) {
      scorenumber = scorenumber - luck_price;
      score.textContent = "SCORE: " + scorenumber;
      luck_upgrades = luck_upgrades + 1;
      lj_img2.style.display = "none";
      lj_bt2.style.display = "none";
      lj_pc2.style.display = "none";
    }
  }
  if (slot2 == "speed") {
    if (scorenumber >= speed_price) {
      scorenumber = scorenumber - speed_price;
      score.textContent = "SCORE: " + scorenumber;
      speed_upgrades = speed_upgrades + 1;
      lj_img2.style.display = "none";
      lj_bt2.style.display = "none";
      lj_pc2.style.display = "none";
    }
  }
})

lj_bt3.addEventListener('click', function() {
  if (slot3 == "luck") {
    if (scorenumber >= luck_price) {
      scorenumber = scorenumber - luck_price;
      score.textContent = "SCORE: " + scorenumber;
      luck_upgrades = luck_upgrades + 1;
      lj_img3.style.display = "none";
      lj_bt3.style.display = "none";
      lj_pc3.style.display = "none";
    }
  }
  if (slot3 == "speed") {
    if (scorenumber >= speed_price) {
      scorenumber = scorenumber - speed_price;
      score.textContent = "SCORE: " + scorenumber;
      speed_upgrades = speed_upgrades + 1;
      lj_img3.style.display = "none";
      lj_bt3.style.display = "none";
      lj_pc3.style.display = "none";
    }
  }
})

// Testando:
observado.refresh = true;  // 👉 "A porta está aberta"
observado.refresh = false; // 👉 "A porta está fechada"

const randomNumber = Math.floor(Math.random() * 5) + 1;
console.log(randomNumber);
