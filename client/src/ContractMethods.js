import { ethers } from "ethers";
import TaskAbi from "./DocManager";

const TaskContractAddress = "0xA76318b9FCE5EDB39a82a624656bF0DC5597429C";

const getMyDocs = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://rpc-mumbai.maticvigil.com/"
        );
        const TaskContract = new ethers.Contract(
            TaskContractAddress,
            TaskAbi.abi,
            provider
        );

    const data = await TaskContract.getMyDocs();
        console.log("all docs", data)
        return data
    } catch (error) {
        console.log(error);
        return [];
    }
};

const signup = async (username, isOrg) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const TaskContract = new ethers.Contract(
                TaskContractAddress,
                TaskAbi.abi,
                signer
            );
            const transaction = await TaskContract.createUser(username, isOrg);
            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                alert("error");
                return;
            } else {
                alert("done! user created");
            }
        } else {
            console.log("Ethereum object doesn't exist");
        }
    } catch (error) {
        console.log(error);
    }
};

const uploadDoc = async (title, cid) => {
    console.log(title)
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const TaskContract = new ethers.Contract(
                TaskContractAddress,
                TaskAbi.abi,
                signer
            );
            const transaction = await TaskContract.createDocument(
                title,
                cid,
                cid
            );
            const transactionReceipt = await transaction.wait();
            if (transactionReceipt.status !== 1) {
                alert("error");
                return;
            } else {
                alert("done! document uploaded");
            }
        } else {
            console.log("Ethereum object doesn't exist");
        }
    } catch (error) {
        console.log(error);
    }
};

export { getMyDocs, signup, uploadDoc };
