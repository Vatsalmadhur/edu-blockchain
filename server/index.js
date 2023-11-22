require('dotenv').config()
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const {abi} = require('./DocManager.json');
const { getContractData } = require('./ContractMethods');

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

const runApp = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    const address = "0x01e70cbb2152a68569f39c528328a396a73288d4";

    const chain = EvmChain.MUMBAI;


    const response = await Moralis.EvmApi.events.getContractLogs({
    address,
    chain,
    topic0:"0x5d81a4820ba59743a3a12dfb7406d10cc166b75b18c7743ef47f740487378617"
  });
    console.log(response.toJSON());
    console.log(await getContractData())
};

runApp();
