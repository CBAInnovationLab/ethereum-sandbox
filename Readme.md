## Ethereum Sandbox

This is a skeleton app that can be used as the basis of an Ethereum based application.
The genesis block includes a registry contract for looking up the address of deployed
contracts. The registry contract is found at address `0x0000000000000000000000000000000000000084`.

### Prerequisites
* MacOS / Linux environment
* Docker
* NodeJS 8+
* Yarn

### Running
1. `yarn install` to install node_modules
1. `yarn docker:up` to start the Parity client and bind its RPC to http://localhost:8545
1. `yarn start` to deploy the SimpleStorage contract and send a test transaction
