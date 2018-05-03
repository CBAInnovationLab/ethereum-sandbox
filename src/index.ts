import { Wallet } from 'ethers';

function main() {
  var wallet = Wallet.createRandom();
  console.log(wallet);

  console.log('hi');
}

main();
