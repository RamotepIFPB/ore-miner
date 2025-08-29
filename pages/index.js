import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import fireImg from "../images/fire.png";
import luckImg from "../images/luck.png";
import doubleImg from "../images/Double.png";
import rockImg from "../images/rock.png";
import ironImg from "../images/iron.png";
import coalImg from "../images/coal.png";

// Importe os hooks do React aqui em cima
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const botaoRef = useRef(null);
  const cheatRef = useRef(null);
  const cheatInputRef = useRef(null);
  const descriptionRef = useRef(null);
  const highscoreRef = useRef(null);
  const GhighscoreRef = useRef(null);
  const scoreRef = useRef(null);
  const minerioRef = useRef(null);
  const minerio_imgRef = useRef(null);
  const lj_bt1Ref = useRef(null);
  const lj_bt2Ref = useRef(null);
  const lj_bt3Ref = useRef(null);
  const lj_img1Ref = useRef(null);
  const lj_img2Ref = useRef(null);
  const lj_img3Ref = useRef(null);
  const lj_pc1Ref = useRef(null);
  const lj_pc2Ref = useRef(null);
  const lj_pc3Ref = useRef(null);
  const slot1 = useRef("luck")
  const slot2 = useRef("speed")
  const slot3 = useRef("double")
  const [shopImage1Src, setShopImage1Src] = useState(fireImg.src);
  const [shopImage2Src, setShopImage2Src] = useState(luckImg.src);
  const [shopImage3Src, setShopImage3Src] = useState(doubleImg.src);
  const [oreImageSrc, setOreImageSrc] = useState(rockImg.src)
  const [globalhighscore, setHighscore] = useState();
  const [loadingHighscore, setLoadingHighscore] = useState(true);
  const [scorenumber, setScore] = useState(0);
  const scorenumberRef = useRef(scorenumber); 
  const [HP, setHP] = useState(4);
  const [speed_price, setSpeedPrice] = useState(75);
  const [luck_price, setLuckPrice] = useState(100);
  const luck_priceRef = useRef(luck_price)
  const speed_priceRef = useRef(speed_price)
  const [speed_upgrades, setSpeedUpgrades] = useState(1);
  const [luck_upgrades, setLuckUpgrades] = useState(1);
  const [minerio_atual, setMinerioAtual] = useState("pedra");
  const [isShaking, setIsShaking] = useState(false);
  let animationTimeout;

  const handleSlot1 = () => {
    if (slot1.current == "luck") {
      console.log(scorenumber)
      if (scorenumber >= luck_price) {
        setScore((prev) => prev - luck_price);
        setLuckUpgrades((prev) => prev + 1);
        setLuckPrice((prev) => prev * luck_upgrades)
        lj_img1Ref.current.style.display = "none";
        lj_bt1Ref.current.style.display = "none";
        lj_pc1Ref.current.style.display = "none";
      }
    }
    if (slot1.current == "speed") {
      console.log(scorenumber)
      if (scorenumber >= speed_price) {
        setScore((prev) => prev - speed_price);
        setSpeedUpgrades((prev) => prev + 1);
        setSpeedPrice((prev) => prev * luck_upgrades)
        lj_img1Ref.current.style.display = "none";
        lj_bt1Ref.current.style.display = "none";
        lj_pc1Ref.current.style.display = "none";
      }
    }
  }

  const handleSlot2 = () => {
    if (slot2.current == "luck") {
      console.log(scorenumber)
      if (scorenumber >= luck_price) {
        setScore((prev) => prev - luck_price);
        setLuckUpgrades((prev) => prev + 1);
        setLuckPrice((prev) => prev * luck_upgrades)
        lj_img2Ref.current.style.display = "none";
        lj_bt2Ref.current.style.display = "none";
        lj_pc2Ref.current.style.display = "none";
      }
    }
    if (slot2.current == "speed") {
      console.log(scorenumber)
      if (scorenumber >= speed_price) {
        setScore((prev) => prev - speed_price);
        setSpeedUpgrades((prev) => prev + 1);
        setSpeedPrice((prev) => prev * luck_upgrades)
        lj_img2Ref.current.style.display = "none";
        lj_bt2Ref.current.style.display = "none";
        lj_pc2Ref.current.style.display = "none";
      }
    }
  }

  const handleSlot3 = () => {
    if (slot3.current == "luck") {
      console.log(scorenumber)
      if (scorenumber >= luck_price) {
        setScore((prev) => prev - luck_price);
        setLuckUpgrades((prev) => prev + 1);
        setLuckPrice((prev) => prev * luck_upgrades)
        lj_img3Ref.current.style.display = "none";
        lj_bt3Ref.current.style.display = "none";
        lj_pc3Ref.current.style.display = "none";
      }
    }
    if (slot3.current == "speed") {
      console.log(scorenumber)
      if (scorenumber >= speed_price) {
        setScore((prev) => prev - speed_price);
        setSpeedUpgrades((prev) => prev + 1);
        setSpeedPrice((prev) => prev * luck_upgrades)
        lj_img3Ref.current.style.display = "none";
        lj_bt3Ref.current.style.display = "none";
        lj_pc3Ref.current.style.display = "none";
      }
    }
  }

  const handleMinerar = () => {
    if (HP > 0) {
    setHP((prev) => prev - 1);
    setScore((prev) => prev + 1);
  } else {
    if (minerio_atual == "pedra") {
      const preço = 10;
      setScore((prev) => prev + preço);
    }
    if (minerio_atual == "carvao") {
      const preço = 15;
      console.log(preço)
      setScore((prev) => prev + preço);
    }
    if (minerio_atual == "ferro") {
      const preço = 25;
      setScore((prev) => prev + preço);
    }
    if (luck_upgrades == 1) {
      const ore = Math.floor(Math.random() * 5) + 1;
      if (ore == 1) {
        setOreImageSrc(ironImg.src);
        setMinerioAtual("ferro");
        const durabilidade = 7;
        setHP(Math.ceil(durabilidade / speed_upgrades));
      }
      if (ore == 2) {
        setOreImageSrc(coalImg.src);
        setMinerioAtual("carvao");
        const durabilidade = 5;
        setHP(Math.ceil(durabilidade / speed_upgrades));
      }
      if (ore == 3) {
        setOreImageSrc(rockImg.src);
        setMinerioAtual("pedra");
        const durabilidade = 4;
        setHP(Math.ceil(durabilidade / speed_upgrades));
      }
      if (ore == 4) {
        setOreImageSrc(rockImg.src);
        setMinerioAtual("pedra");
        const durabilidade = 4;
        setHP(Math.ceil(durabilidade / speed_upgrades));
      }
      if (ore == 5) {
        setOreImageSrc(rockImg.src);
        setMinerioAtual("pedra");
        const durabilidade = 4;
        setHP(Math.ceil(durabilidade / speed_upgrades));
      }
    } else if (luck_upgrades == 2) {
        const ore = Math.floor(Math.random() * 10) + 1;
        if (ore < 5) {
          setOreImageSrc(rockImg.src);
          setMinerioAtual("pedra");
          const durabilidade = 4;
          setHP(Math.ceil(durabilidade / speed_upgrades));
        } else {
            if (ore < 9) {
            setOreImageSrc(coalImg.src);
            setMinerioAtual("carvao");
            const durabilidade = 5;
            setHP(Math.ceil(durabilidade / speed_upgrades));
          } else {
            setOreImageSrc(ironImg.src);
            setMinerioAtual("ferro");
            const durabilidade = 7;
            setHP(Math.ceil(durabilidade / speed_upgrades));
          }
        }
    } else {
      const ore = Math.floor(Math.random() * 20) + 1;
        if (ore < 5) {
          setOreImageSrc(rockImg.src);
          setMinerioAtual("pedra");
          const durabilidade = 4;
          setHP(Math.ceil(durabilidade / speed_upgrades));
        } else {
            if (ore < 13) {
            setOreImageSrc(coalImg.src);
            setMinerioAtual("carvao");
            const durabilidade = 5;
            setHP(Math.ceil(durabilidade / speed_upgrades));
          } else {
            setOreImageSrc(ironImg.src);
            setMinerioAtual("ferro");
            const durabilidade = 7;
            setHP(Math.ceil(durabilidade / speed_upgrades));
          }
        }
    } 
  }
    console.log(scorenumber);
    setIsShaking(false);

    requestAnimationFrame(() => {
      setIsShaking(true);
    });

    console.log(HP)

    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(function () {
      setIsShaking(false);
    }, 500);
  }

  

  useEffect(() => {
    const botao = botaoRef.current;
    const cheatbutton = cheatRef.current;
    const cheatInput = cheatInputRef.current;
    const description = descriptionRef.current;
    const highscore = highscoreRef.current;
    const score = scoreRef.current;
    const minerio = minerioRef.current;
    const minerio_img = minerio_imgRef.current;
    const lj_bt1 = lj_bt1Ref.current;
    const lj_bt2 = lj_bt2Ref.current;
    const lj_bt3 = lj_bt3Ref.current;
    const lj_img1 = lj_img1Ref.current;
    const lj_img2 = lj_img2Ref.current;
    const lj_img3 = lj_img3Ref.current;
    const lj_pc1 = lj_pc1Ref.current;
    const lj_pc2 = lj_pc2Ref.current;
    const lj_pc3 = lj_pc3Ref.current;
    var cglobalhighscore = null;
    
    async function fetchHighscore() {
      try {
        setLoadingHighscore(true);
        const { data, error } = await supabase
          .from('scores')
          .select('value')
          .order('value', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          setHighscore(data.value)
          cglobalhighscore = data.value;
          
        }
      } catch (error) {
        console.error("Erro ao buscar highscore:", error.message);
      } finally {
        setLoadingHighscore(false);
      }
    }

    async function saveNewHighscore(newScore) {
      console.log("score registrado:", newScore)
      console.log("maior highscore registrado:", cglobalhighscore)
      if (newScore > cglobalhighscore) {
        try {
          const { error } = await supabase
            .from('scores')
            .insert([{ value: newScore }]);
  
          if (error) throw error;
  
          setHighscore(newScore);
          console.log("Novo highscore salvo com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar highscore:", error.message);
        }
      }
    }

    const parseCheatCode = (code) => {
      const cheatRegex = /^([A-Z]+)_(\d+)$/;
      const match = code.toUpperCase().match(cheatRegex);
      console.log("digitado:", code)
  
      if (match) {
        const command = match[1]; 
        const value = parseInt(match[2], 10); 
  
        console.log(`Código válido! Comando: ${command}, Valor: ${value}`);
  
        switch (command) {
          case 'GOLD':
            setScore((prev) => prev + value);
            console.log("foi adicionado no seu SCORE:", value)
            console.log("SEU SCORE NUMBER:", scorenumber)
            break;
          case 'SPEED':
            speed_upgrades = speed_upgrades + value;
            console.log("foi adicionado no seu SPEED:", value, "níveis!")
            break;
          default:
            console.log("Código válido, mas comando desconhecido.");
        }
      } else {
        console.log("Formato de código inválido!");
      }
    };
  
    function handleApplyCheat(codeInput) {
      parseCheatCode(codeInput); 
      cheatInput.value = ""; 
    }

    if (botao && description && highscore && minerio && minerio_img && score && lj_bt1 && lj_bt2 && lj_bt3 && lj_img1 && lj_img2 && lj_img3 && lj_pc1 && lj_pc2 && lj_pc3 && cheatbutton) {

      console.log("Todos os elementos foram carregados com sucesso!");
      fetchHighscore();
      if (!localStorage.getItem('highscore')) {
        localStorage.setItem('highscore', 0);
        highscore.textContent = "HIGHSCORE: " + 0;
      } else {
        let highscore_achado = Number(localStorage.getItem('highscore'));
        highscore.textContent = "HIGHSCORE: " + highscore_achado
      }
      let playerhighscore = Number(localStorage.getItem('highscore'));
      var multiplier_upgrades = 1
      var m_atual = 3
      var minerio_atual = "pedra"
      var dinheiro = 1000

      scorenumberRef.current = scorenumber;

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
          setShopImage1Src(luckImg.src)
          const luckupdated = luck_priceRef.current;
          slot1.current = "luck"
          const preco_final = luckupdated * luck_upgrades
          lj_pc1.textContent = "PREÇO: $" + preco_final
        }
        if (upgrade1 == 2) {
          setShopImage1Src(fireImg.src)
          const speedupdated = speed_priceRef.current;
          slot1.current = "speed"
          const preco_final = speedupdated * speed_upgrades
          lj_pc1.textContent = "PREÇO: $" + preco_final
        }
        if (upgrade2 == 1) {
          setShopImage2Src(luckImg.src)
          const luckupdated = luck_priceRef.current;
          slot2.current = "luck"
          const preco_final = luckupdated * luck_upgrades
          lj_pc2.textContent = "PREÇO: $" + preco_final
        }
        if (upgrade2 == 2) {
          setShopImage2Src(fireImg.src)
          const speedupdated = speed_priceRef.current;
          slot2.current = "speed"
          const preco_final = speedupdated * speed_upgrades
          lj_pc2.textContent = "PREÇO: $" + preco_final
        }
        if (upgrade3 == 1) {
          setShopImage3Src(luckImg.src)
          const luckupdated = luck_priceRef.current;
          slot3.current = "luck"
          const preco_final = luckupdated * luck_upgrades
          lj_pc3.textContent = "PREÇO: $" + preco_final
        }
        if (upgrade3 == 2) {
          setShopImage3Src(fireImg.src)
          const speedupdated = speed_priceRef.current;
          slot3.current = "speed"
          const preco_final = speedupdated * speed_upgrades
          lj_pc3.textContent = "PREÇO: $" + preco_final
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

          const finalScore = scorenumberRef.current;
          console.log("score final:", finalScore)

          if (finalScore > playerhighscore) {
            localStorage.setItem('highscore', finalScore); 
            highscore.textContent = "HIGHSCORE: " + finalScore;
          }
          console.log('jogo terminado!')
          saveNewHighscore(finalScore);
          setScore(0);
        }, 30000)
      });


      cheatbutton.addEventListener("click", function () {
        handleApplyCheat(cheatInput.value)
      })
      
    }
  }, []); // Roda apenas uma vez após a montagem

  useEffect(() => {
    scorenumberRef.current = scorenumber;
    luck_priceRef.current = luck_price;
    speed_priceRef.current = speed_price;
  }, [scorenumber], [luck_price], [speed_price]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="src/style.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ore Miner</title>
      </Head>
      <div>
        <div id="app"></div>
        <h1>ORE MINER</h1>
        <h2>ㅤ</h2>
        <h2>ㅤ</h2>
        <h2 id="description" ref={descriptionRef}>Bem vindos a ore miner! Quebre minerios para conseguir dinheiro e pontos! Gaste o dinheiro que você conseguiu com upgrades/melhorias para conseguir ainda mais pontos em um espaço de 3 minutos, qual o maior highscore que você consegue fazer? Vamos começar?</h2>
        <h2 id="ghighscore" ref={GhighscoreRef}>GLOBAL HIGHSCORE: {loadingHighscore ? "Carregando..." : globalhighscore}</h2>
        <h2 id="highscore" ref={highscoreRef}>HIGHSCORE: 0</h2>
        <h2 id="score" ref={scoreRef}>SCORE: {scorenumber}</h2>
        <div style={{ textAlign: 'center' }}>
          <button id="start" ref={botaoRef}>Começar</button> 
        </div>
        <div id="div-minerio">
          <button onClick={handleMinerar} id="minerio" ref={minerioRef}>
            <img src={oreImageSrc} id="minerio-img" ref={minerio_imgRef} className={isShaking ? 'shake' : ''} alt="Botão de imagem"/>
          </button>
        </div>
        <div className="shop"> 
          <button id="powerup-1" ref={lj_bt1Ref} onClick={handleSlot1}>
            <img src={shopImage1Src} id="pw-1" ref={lj_img1Ref} />
          </button>
          <button id="powerup-2" ref={lj_bt2Ref} onClick={handleSlot2}>
            <img src={shopImage2Src} id="pw-2" ref={lj_img2Ref} />
          </button>
          <button id="powerup-3" ref={lj_bt3Ref} onClick={handleSlot3}>
            <img src={shopImage3Src} id="pw-3" ref={lj_img3Ref} />
          </button>
        </div>
        <div className="precos">
          <h3 id="preco-1" ref={lj_pc1Ref}>PREÇO: {speed_price}</h3>
          <h3 id="preco-2" ref={lj_pc2Ref}>PREÇO: {luck_price}</h3>
          <h3 id="preco-3" ref={lj_pc3Ref}>PREÇO: {luck_price}</h3>
        </div>
        <div className="cheat-section" style={{ marginTop: '20px' }}>
        <h3>Cheat Codes</h3>
        <input 
          type="text"
          placeholder="Ex: GOLD_1000"
          ref={cheatInputRef}
        />
        <button ref={cheatRef}>Aplicar</button>
      </div>
        {/* A tag <script> foi removida pois não é necessária */}
      </div>
    </>
  );
}
