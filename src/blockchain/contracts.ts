import { Contract, TransactionReceipt } from 'ethers';
import config from '../config';
import { processTransaction } from './ethers';
import { Registry } from './registry';

export async function deploy(
  name: string,
  compiled: any,
  ...args: Array<any>
): Promise<TransactionReceipt> {
  const contractArgs: Array<any> = [
    compiled.bytecode,
    JSON.stringify(compiled.abi),
    ...args
  ];

  const deployTransaction: any = Contract.getDeployTransaction.apply(
    {},
    contractArgs
  );

  const receipt: TransactionReceipt = await processTransaction(
    deployTransaction,
    config.coinbase
  );

  if (name) {
    const registry = new Registry(config.coinbase);
    await registry.setAddress(name, receipt.contractAddress);
  }

  return receipt;
}
