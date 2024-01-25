const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
  '615f1c876839bf3ed9d199551689d18820d5039fff85eee45a6627b09aa5bdcc',
);
const myWalletAddress = myKey.getPublic('hex');

let adrianCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
adrianCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
adrianCoin.minePendingTransactions(myWalletAddress);

console.log(
  '\n Balance of ucup is',
  adrianCoin.getBalanceOfAddress(myWalletAddress),
);

// try to hacking
adrianCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', adrianCoin.isChainValid());
