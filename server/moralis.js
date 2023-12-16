require("dotenv").config();
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require("./connection.js");

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const chain = EvmChain.MUMBAI;

const topics = {
  userCreated:
    "0x384db929b7c14f2ec4d06c16fc6e81671a8918499ec04b4d8d8f5b73f3480ce7",
  documentCreated:
    "0x93ee0f6c8dd03625ce887cd15cc2579791c72c53191d3d6f65c2e179e147c20b",
  documentIssued:
    "0x73c875dc1b2b485c71b18141e9b9bc38851b8e0722d65108e4ce3f0fb0dd2095",
  documentAccessGranted:
    "0xe074a0c52bc01efdbb73f9cefd8a5f6565d8f4d0c8d76d1986356c2ce9390512",
  documentAccessRevoked:
    "0xe146f065c4b0910f9677ddaf01f936acde8e7ed2c597a68a3fe75f90f03ea4db",
};

const runApp = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
  const response = await Moralis.EvmApi.events.getContractLogs({
    address: contractAddress,
    chain,
    topic0: topics.userCreated,
  });
  console.log(response.toJSON());
};

runApp();
