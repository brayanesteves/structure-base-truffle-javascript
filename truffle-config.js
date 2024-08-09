const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();

const provider = new HDWalletProvider({
   privateKeys: ['1e5d24c69fc9e5b62578a1d8bc3c2cf54d4f0f61806484a01f2078b1d5b575a3'],
   providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
})


module.exports = {
  networks: {
    development: {
      host:'localhost',
      port: 8545,
      network_id: '*', // Match any network 'id'.
    },
    ropsten: {
      provider: () => HDWalletProvider(process.env.KEY_ADDRESS, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 3,
      gas: 3000000,
      gasPrice:10000000000,
    },
    kovan: {
      provider: () => HDWalletProvider(process.env.MNENOMIC, `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 42,
      gas: 3000000,
      gasPrice:10000000000,
    },
    rinkeby: {
      provider: () => HDWalletProvider(process.env.MNENOMIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 4,
      gas: 3000000,
      gasPrice:10000000000,
    },
    mainnet: {
      provider: () => HDWalletProvider(process.env.MNENOMIC, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 1,
      gas: 3000000,
      gasPrice:10000000000,
    },
    binanceTestnet: {
      provider: () => provider,
      network_id: "97",
      gas: 29000000
    },
    develop: {
      port: 8545
    }
  } 
};