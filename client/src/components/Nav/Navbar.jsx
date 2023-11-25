import React from "react";
import "./Navbar.css";
import { ethers } from "ethers";
import { useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Text } from "@chakra-ui/react";
import { Toggle } from "../../layout/Toggle";
import { Box } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
const Navbar = ({ children }) => {
  let [accountChanged, setAccChange] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [user, setUser] = useState({
    connected: false,
    address: null
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

  const disconnectwallet = () => { };

  //hamburger
  const [isOpen, setIsOpen] = useState(false);
  const bg = useColorModeValue('white', 'blackAlpha.50');
  const darkBtn = useColorModeValue('cyan.500', 'cyan.500');


  return (
    <>
      <Box id="nav" className={isOpen ? 'flex navMain navResp' : 'flex navMain'} boxShadow="dark-lg" bg={bg} py="10px">
        <Box className="flex logo" >
          <Link to="/" onClick={() => setIsOpen()}>
            <Image className="logoImg" src="/EduSafe.svg" alt="" py={6} />
          </Link>
        </Box>

        <Box className={isOpen ? 'flex linkResp' : 'flex linkBox'}  >
          <Link to="/" className="link" onClick={() => setIsOpen()}>

            <Text className="ad">Home</Text>

          </Link>
          <Link to="/dashboard" onClick={() => setIsOpen()}>

            <Text className="ad">Dashboard</Text>

          </Link>
          <Link to="/verify" onClick={() => setIsOpen()}>

            <Text className="ad">Verify</Text>

          </Link>
        </Box>


        <Box
          className={isOpen ? "flex account showBtn" : "flex account hideBtn"}
          gap={6}
        >
          <Box className="flex connect">
            {children}
            <Button my={{ base: '20px', md: '' }} fontFamily="Ubuntu" bg="none" border="2px solid" borderColor={darkBtn} onClick={user.connected ? () => { } : connectWallet}>
              {user.connected
                ? `${user.address.toString().substring(0, 5)}...${user.address
                  .toString()
                  .substring(38, 42)}`
                : "Connect"}
            </Button>

          </Box>

        </Box>
        <Box position="absolute" right={{ base: '10px', md: "150px" }} top={{ base: '30px', md: "" }} width="auto"  >
          <Toggle />

            {isOpen ? <CloseIcon display={{ base: 'inline-block', md: "none" }}
            width="40px" height="18px" onClick={() => setIsOpen(!isOpen)} /> : <HamburgerIcon display={{ base: 'inline-block', md: "none" }}
              width="50px" height="25px" onClick={() => setIsOpen(!isOpen)} />}

          {/* <HamburgerIcon
            display={{base:'inline-block',  md:"none"}}
            width="50px" height="25px" onClick={() => setIsOpen(!isOpen)} /> */}
        </Box>

      </Box>

    </>
  );
};

export default Navbar;