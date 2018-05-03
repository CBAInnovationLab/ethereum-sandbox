import { deploy } from '../blockchain/contracts';
import config from '../config';
import { DefaultRegistry } from '../blockchain/registry';
import { SimpleStorage, Storage } from '../blockchain/storage';

export default async function main(): Promise<Array<string>> {
  console.log('Deploying contracts');
  console.log(`Using Geth: ${config.gethUrl}`);

  const deployReceipt = await deploy('SimpleStorage', SimpleStorage, 123);

  const address = await DefaultRegistry.getAddress('SimpleStorage');
  const storage = new Storage(config.coinbase);
  const initialValue = await storage.get();
  await storage.set(987);
  const newValue = await storage.get();

  console.log('------------------------------------');
  console.log(`Storage Address:   ${address}`);
  console.log(`Initial Value:     ${initialValue}`);
  console.log(`New Value:         ${newValue}`);
  console.log('------------------------------------');

  console.log('\nContracts deployed');
  return [deployReceipt.contractAddress];
}

main()
  .then(() => {
    console.log('Goodbye!');
  })
  .catch(err => {
    console.log('ERROR', err);
    process.exit(1);
  });
