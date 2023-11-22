require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
module.exports = {
  solidity: "0.8.22",
  networks: {
    polygon: {
      url: process.env.API_URL,
      accounts: [process.env.SECRET_KEY],
    }
  }
};;
