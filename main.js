const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data),
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2024', 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let adrianCoin = new Blockchain();
adrianCoin.addBlock(new Block(1, '10/01/2024', { amount: 4 }));
adrianCoin.addBlock(new Block(2, '11/01/2024', { amount: 10 }));
console.log(JSON.stringify(adrianCoin, null, 4));

console.log('is blockchain valid? ' + adrianCoin.isChainValid());

adrianCoin.chain[1].data = { amount: 100 };
adrianCoin.chain[1].hash = adrianCoin.chain[1].calculateHash();

console.log('is blockchain valid? ' + adrianCoin.isChainValid());

console.log(JSON.stringify(adrianCoin, null, 4));
