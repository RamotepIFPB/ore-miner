/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta é a linha que faltava e que resolve o problema
  output: 'export',

  // Deixe o reactStrictMode, não há problema
  reactStrictMode: true,

  // Configurações para o GitHub Pages
  basePath: '/ore-miner', // MUDE AQUI para o nome do seu repositório (ex: /ore-miner)
  assetPrefix: '/ore-miner/', // MUDE AQUI para o nome do seu repositório (ex: /ore-miner)

  // Configuração para evitar erros com imagens no deploy
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
