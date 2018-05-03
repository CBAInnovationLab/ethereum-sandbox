import {
  Contract as ContractInterface,
  CompiledContract,
  TransactionReceipt
} from 'ethers';
import { waitForReceipt, getWallet, provider } from './ethers';
import { DefaultRegistry } from './registry';

export const SimpleStorage: CompiledContract = require('../truffle/build/contracts/SimpleStorage.json');

const NAME = 'SimpleStorage';

async function factory(sender: string): Promise<ContractInterface> {
  const address = await DefaultRegistry.getAddress(NAME);
  const providerOrWallet = sender ? getWallet(sender) : provider;
  return new ContractInterface(address, SimpleStorage.abi, providerOrWallet);
}

export class Storage {
  private sender: string;

  constructor(sender: string) {
    this.sender = sender;
  }
  async get(): Promise<number> {
    const instance = await factory(null);
    return instance.get();
  }
  async set(value: number): Promise<TransactionReceipt> {
    const instance = await factory(this.sender);
    const tx = await instance.set({
      number: value
    });
    return waitForReceipt(tx.hash);
  }
}
