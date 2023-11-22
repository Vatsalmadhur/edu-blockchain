require('dotenv').config()
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const {abi} = require('./DocManager.json')

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

const runApp = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    const address = "0x93c07D1D2907dC8B25830121d0D2f5f67bE6d09b";

    const chain = EvmChain.MUMBAI;


    const response = await Moralis.EvmApi.events.getContractLogs({
    address,
    chain,
    topic0:"0x5d81a4820ba59743a3a12dfb7406d10cc166b75b18c7743ef47f740487378617"
  });
    console.log(response.toJSON());
};

runApp();
