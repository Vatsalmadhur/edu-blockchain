import { ethers } from "ethers";
const TaskAbi = require("./DocManager.json");
const TaskContractAddress = "0xB32B60411014322bD0d4C17F49C60375783721EE"



const getSigner = async () => {
  const ethereum = window.ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider(ethereum);
  const walletAddress = accounts[0];
  const signer = provider.getSigner(walletAddress);
  return signer;
};

const getContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    TaskContractAddress,
    TaskAbi.abi,
    signer
  );
  return contract;
};

const getMyDetails = async () => {
  const contract = await getContract();
  try {
    const { name, isOrg } = await contract.getMyDetails();
    return { status: true, name, isOrg };
  } catch (error) {
    return { status: false, error: Object.values(error)[0] };
  }
};

const getMyDocs = async () => {
  const contract = await getContract();
  try {
    const txn = await contract.getMyDocs();
    console.log(txn);
    return { status: true, docs: txn };
  } catch (error) {
    return { status: false, error: Object.values(error)[0] };
  }
};

const getDocDetails = async (docId) => {
  const contract = await getContract();
  try {
    const txn = await contract.getDocumentDetails(docId);
    console.log(txn);
  } catch (error) {
    alert(Object.values(error)[0]);
  }
};

const addDoc = async (docName, docHash) => {
  const contract = await getContract();
  try {
    const txn = await contract.createDocument(docName, docHash);
    await txn.wait();
    alert("Document added successfully");
  } catch (error) {
    console.log(error);
  }
};

const createUser = async ({ name, isOrg }) => {
  const contract = await getContract();
  try {
    const txn = await contract.createUser(name, isOrg);
    await txn.wait();
    return { status: true };
  } catch (error) {
    return { status: false, error: Object.values(error)[0] };
  }
};

const issueDoc = async (docId, userId) => {
  const contract = await getContract();
  try {
    const txn = await contract.issue(docId, userId);
    await txn.wait();
    return { status: true };
  } catch (error) {
    return { status: false, error: Object.values(error)[0] };
  }
};

const verifyDoc = async (docId, userId) => {
  const contract = await getContract();
  try {
    const txn = await contract.verify(docId, ethers.utils.getAddress(userId));
    console.log(txn)
    return { status: true, ...txn };
  } catch (error) {
    return { status: false, error: Object.values(error)[0] };
  }
};

export {
  createUser,
  verifyDoc,
  issueDoc,
  getMyDetails,
  getMyDocs,
  addDoc,
  getDocDetails,
};
