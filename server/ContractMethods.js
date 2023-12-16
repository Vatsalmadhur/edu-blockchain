const ethers = require("ethers");
const TaskAbi = require("./DocManager.json");

const TaskContractAddress = "0x01e70cbb2152a68569f39c528328a396a73288d4";

const getContractData = async () => {
    try {
        const provider = new ethers.AlchemyProvider(
            "maticmum",
            process.env.ALCHEMY_API_KEY
        );
        const TaskContract = new ethers.Contract(
            TaskContractAddress,
            TaskAbi.abi,
            provider
        );
        console.log(await TaskContract.getFunction("createUser").call("theanuragshukla", true));
    } catch (error) {
        console.log(error);
    }
};
module.exports = { getContractData };
