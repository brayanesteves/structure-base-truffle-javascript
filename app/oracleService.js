const Web3         = require('web3');
const Tx           = require('ethereumjs-tx');
const fetch        = require('node-fetch');
const contractJson = require('../build/contracts/Orcle.json');

const web3 = new Web3('ws://127.0.0.1:7545');

const addressContract = '0x9cef2c785b91271b8aa0D5B4617B472E7dADc84A';

const contractInstance = new web3.eth.Contract(contractJson.abi, addressContract);

const privateKey = Buffer.from('f3607b3092813ec32039142c8a83c063dd3b15f66824229fb74e0d6d7a9621dc', 'hex');
// const address    = '0XA11D9B435F049B45D2FF4AAF980A58738920210B';
const address    = '0xa11d9B435f049b45D2ff4AAF980A58738920210b';

web3.eth.getBlockNumber()
    .then(n => listenEvent(n - 1))

function listenEvent(lastBlock) {
    contractInstance.events.__calbackNewData({}, { fromBlock: lastBlock, toBlock: 'latest' }, (err, event) => {
        event ? updateData() : null
        err ? console.log(err) : null
    })
}

function updateData() {
    const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-10-12&end_date=2019-10-16&api_key=DEMO_KEY';

    fetch(url).then(response => response.json()).then(json => setDataContract(json.element_count));
}

function setDataContract(_value) {
    web3.eth.getTransactionCount(address, (err, txNum) => {
        contractInstance.methods.setNumberAsteroids(_value).estimateGas({ }, (err, gasAmount) => {
            let rawTx = {
                   nonce: web3.utils.toHex(txNum),
                gasPrice: web3.utils.toHex(web3.utils.toWei('1.4', 'gwei')),
                gasLimit: web3.utils.toHex(gasAmount),
                      to: addressContract,
                   value: '0x00',
                    data: contractInstance.methods.setNumberAsteroids(_value).encodeABI(),
            }

            const tx = new Tx(rawTx)
            tx.sign(privateKey)
            const serializedTx = tx.serialize().toString('hex')

            web3.eth.sendSignedTransaction('0x' + serializedTx)
        })
    })
}