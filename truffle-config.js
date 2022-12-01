const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider({
   privateKeys: ['1e5d24c69fc9e5b62578a1d8bc3c2cf54d4f0f61806484a01f2078b1d5b575a3'],
   providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
})


module.exports = {
  networks: {
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