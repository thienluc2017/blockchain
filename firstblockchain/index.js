const hash = require("crypto-js/sha256");

class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date();
    this.hash = this.caculateHash();
    this.mineVar=0;
  }
  caculateHash() {
    return hash(
      this.prevHash + JSON.stringify(this.data) + this.timeStamp+this.mineVar
    ).toString();
  }
  // quy luat nhu the nao do , mo phong lai mine trong blockchain
  mine(difficulty){
     while(!this.hash.startsWith('0'.repeat(difficulty))){
        this.mineVar++;
        this.hash=this.caculateHash();
     }
  }
}
class Blockchain {
  constructor(difficulty) {
    const tempBlock = new Block("0000", {
      check: true,
    });
    // khoi tao chain chi gom block dau
    this.difficulty=difficulty;
    this.chain = [tempBlock];
  }
  //lay block cuoi cung trong chain
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(data) {
    //block co hash tu hash cua block cuoi cung //tuong tu add last trong linked list
    const lastBlock = this.getLastBlock();
    const newBlock = new Block(lastBlock.hash,data);
    console.log('start mining');
    console.time('mine');
    newBlock.mine(this.difficulty);
    console.timeEnd('mine');
    //console.log(newBlock);
    //add block vao mang chain
    this.chain.push(newBlock);
  }
  isValid(){
    for(let i=1;i<this.chain.length;i++){
        const currentBlock=this.chain[i];
        const prevBlock=this.chain[i-1];
        if(currentBlock.hash !=currentBlock.caculateHash()){
            return false;
        }
        if(currentBlock.prevHash!=prevBlock.hash){
            return false;

        }
        return true;
    }
  }
}

//console.log(block);
const lucDepzaiChain = new Blockchain(4);

//lucDepzaiChain.addBlock('cuccutbietnoi');
lucDepzaiChain.addBlock({
    name: "lucthongminh",
    hobby : "biet an biet ngu biet hoc hanh la ngoan",
    age: 21
});
lucDepzaiChain.addBlock({
    name: "cuccutbietnoi",
    game : "LOL,dota, genshin impact",
    top: 10
});
//sua du lieu => valid false
// lucDepzaiChain.chain[1].data={
//     name: "cuccutkobietnoi",
//     game : "choi ngu lam",
//     top: 1000000
// }
//lucDepzaiChain.chain[1].hash=lucDepzaiChain.chain[1].caculateHash();
 console.log(lucDepzaiChain.chain);
 console.log('chain valid',lucDepzaiChain.isValid());

