import React from "react";
import "./Navbar.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Toggle } from "../../layout/Toggle";
import { Box } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { createUser, getMyDetails } from "../../ContractMethods";
import { useFormik } from "formik";
const PolygonChainId = "0x13881";
const Navbar = ({ children, user, setUser }) => {
  const hamMenu = useDisclosure();
  const modal = useDisclosure();
  const bg = useColorModeValue("white", "blackAlpha.50");
  const darkBtn = useColorModeValue("cyan.500", "cyan.500");
  const initialValues = {
    name: "",
    isOrg: false,
  };

  const onSubmit = async (values) => {
    const { status, error } = await createUser(values);
    if (status) {
      setUser({
        status,
        address: user.address,
        isOrg: values.isOrg,
        name: values.name,
      });
      modal.onClose();
    } else {
      alert(error);
    }
  };
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues,
    onSubmit,
  });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMask not found!");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== PolygonChainId) {
        alert("Connect your wallet to Polygon Network");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const { status, isOrg, name } = await getMyDetails();
      if (status) {
        setUser((o) => ({
          ...o,
          status,
          address: accounts[0],
          isOrg,
          name,
        }));
      } else {
        modal.onOpen();
      }
    } catch (error) {
      setUser({
        connected: false,
        address: null,
      });
      alert("something went wrong");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) window.ethereum.on("accountsChanged", connectWallet);
    else
      alert(
        "No Ethereum wallet detected\nThe website may not work as expected\nPlease install Metamask"
      );
  }, []);

  return (
    <>
      <Box
        id="nav"
        className={hamMenu.isOpen ? "flex navMain navResp" : "flex navMain"}
        boxShadow="dark-lg"
        bg={bg}
        py="10px"
      >
        <Box className="flex logo">
          <Link to="/">
            <Image className="logoImg" src="/EduSafe.svg" alt="" py={6} />
          </Link>
        </Box>

        <Box className={hamMenu.isOpen ? "flex linkResp" : "flex linkBox"}>
          <Link to="/" className="link">
            <Text className="ad">Home</Text>
          </Link>
          <Link to="/dashboard">
            <Text className="ad">Dashboard</Text>
          </Link>
          <Link to="/verify">
            <Text className="ad">Verify</Text>
          </Link>
        </Box>

        <Box
          className={
            hamMenu.isOpen ? "flex account showBtn" : "flex account hideBtn"
          }
          gap={6}
        >
          <Box className="flex connect">
            {children}
            <Button
              my={{ base: "20px", md: "" }}
              fontFamily="Ubuntu"
              bg="none"
              border="2px solid"
              borderColor={darkBtn}
              onClick={user.connected ? () => {} : connectWallet}
            >
              {user.status
                ? `${user.address.toString().substring(0, 5)}..${user.address
                    .toString()
                    .substring(38, 42)}`
                : "Connect"}
            </Button>
          </Box>
        </Box>
        <Box
          position="absolute"
          right={{ base: "10px", md: "170px" }}
          top={{ base: "30px", md: "" }}
          width="auto"
        >
          <Toggle />

          {hamMenu.isOpen ? (
            <CloseIcon
              display={{ base: "inline-block", md: "none" }}
              width="40px"
              height="18px"
              onClick={hamMenu.onClose}
            />
          ) : (
            <HamburgerIcon
              display={{ base: "inline-block", md: "none" }}
              width="50px"
              height="25px"
              onClick={hamMenu.onOpen}
            />
          )}
        </Box>
      </Box>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signup</ModalHeader>
          <ModalBody py={4}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </FormControl>
              <FormControl>
                <Flex gap={4}>
                  <FormLabel> Is Organisation? </FormLabel>
                  <RadioGroup
                    onChange={(e) => {
                      setFieldValue("isOrg", e === "true");
                    }}
                    name="isOrg"
                    value={values.isOrg}
                  >
                    <Stack direction="row">
                      <Radio value={false}>No</Radio>
                      <Radio value={true}>Yes</Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex gap={4}>
              <Button
                onClick={modal.onClose}
                colorScheme="red"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} colorScheme="green">
                Signup
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
