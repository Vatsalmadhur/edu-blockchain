import React from "react";
import "./Navbar.css";
import { ethers } from "ethers";
import { useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ children }) => {
  let [accountChanged, setAccChange] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [user, setUser] = useState({
    connected:false,
    address:null
})

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const PolygonChainId = "0x13881";

      if (chainId !== PolygonChainId) {
        alert("You are not connected to the Polygon Testnet!");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setUser({
        connected: true,
        address: accounts[0],
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      setUser({
        connected: false,
      });

      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    if (window.ethereum)
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccChange((prev) => {
          return !prev;
        });
      });
    else
      alert(
        "No Ethereum wallet detected\nThe website may not work as expected\nPlease install Metamask"
      );
  }, []);

  const getAccount = useCallback(async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setUser({
        connected: true,
        address: accounts[0],
      });
      setCurrentAccount(accounts[0]);
    } else {
      setUser({
        connected: false,
        address: null,
      });
      setCurrentAccount("wallet not connected");
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, [accountChanged]);

  const disconnectwallet = () => {};

  return (
    <>
      <div id="nav" className="flex navMain">
        <div className="flex logo">
          <Link to="/">
            <h2>
              <span className="ad"><img className="logoImg" src="/EduSafe.svg" alt="" /></span>
            </h2>
          </Link>
          </div>

          <div className="flex linkBox" >
          <Link to="/home">
            <h2>
              <span className="ad">Home</span>
            </h2>
          </Link>
          <Link to="/dashboard">
            <h2>
              <span className="ad">Dashboard</span>
            </h2>
          </Link>
          <Link to="/verify">
            <h2>
              <span className="ad">Verify</span>
            </h2>
          </Link>
        </div>
        <div className="flex account">
          <div className="flex connect">
            {children}
            <button onClick={user.connected ? () => {} : connectWallet}>
              {user.connected
                ? `${user.address.toString().substring(0, 5)}...${user.address
                    .toString()
                    .substring(38, 42)}`
                : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;