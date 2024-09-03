const HDWalletProvider        = require('@truffle/hdwallet-provider');
const HDWalletProviderPrivKey = require('truffle-hdwallet-provider-privkey');
const infuraKey               = "fj4jll3k.....";

require('dotenv').config();

const provider = new HDWalletProvider({
  privateKeys: ['1e5d24c69fc9e5b62578a1d8bc3c2cf54d4f0f61806484a01f2078b1d5b575a3'],
  providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
})
const PRIVATE_KEY_KOVAN = process.env.PRIVATE_KEY_KOVAN;
const INFURA_ID_KOVAN   = process.env.INFURA_ID_KOVAN;

const fs       = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    development: {
      host:'localhost',
      port: 8545,
      network_id: '*', // Match any network 'id'.
    },
    development_ip_local: {
      host:"127.0.0.1",
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
    kovan_dev: {
      provider: () => new HDWalletProviderPrivKey([PRIVATE_KEY_KOVAN], `https://kovan.infura.io/v3/${INFURA_ID_KOVAN}`),
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
  },

  // Set default 'mocha' options here, use special reporters etc.
  mocha: {
    // timeout: 100000,
  },

  // Configure your compilers.
  compilers: {
    solc: {
      // version:"0.5.1",      // Fetch exact version from 'solc-bin' (default: truffle's version).
      // version:"0.6.0",      
      version:"0.8.0",         
      // docker: true,         // Use "0.5.1" you've installed locally with docker (default: false).
      // settings: {           // See the solidity docs for advice about optimization and 'evmVersion'.
      //    optimizer: {
      //      enabled: false,
      //      runs: 200,
      //    },
      // },
    },
  },
  /**
   * Truffle DB is currently disabled by default; to enable it, change enabled: 'false' to enabled: true
   * 
   * Note: if you migrated yous contracts prier to enabling this field in your 'Truffle' project and want
   *       those previuosly migrated contracts available in the .db directory, you will need to run the following:
   *       $ truffle migrate --reset --compile-all
   */
  db: {
    enabled: false,
  },
};