import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  Heading,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { NewDocForm } from "../Forms/NewDocForm";
import {
  getMyDocs,
  issueDoc,
  verifyDoc,
} from "../../ContractMethods";
import { useOutletContext } from "react-router-dom";
import { More } from "iconsax-react";
import { CloseIcon } from "@chakra-ui/icons";
import { InputModal } from "../Models/inputmodel";
import { IssueModal } from "../Models/issuemodel";

export const Dashboard = () => {
  const { user } = useOutletContext();
  const newDoc = useDisclosure();
  const issue = useDisclosure();
  const [docId, setDocId] = useState("");
  const [myDocs, setMyDocs] = useState([]);
  const fetchDocs = async () => {
    const { status, docs } = await getMyDocs();
    if (!!status) setMyDocs(docs);
  };
  useEffect(() => {
    if (!!user.status) {
      fetchDocs();
    }
  }, [user]);

  const darkBtn = useColorModeValue("green.300", "green.300");

  return (
    <>
      <Flex
        wrap="wrap"
        justifyContent="center"
        gap={10}
        mt={20}
        flexDir="column"
        align="center"
      >
        {user.status ? (
          <>
            <Heading as="h1" size="lg" fontWeight={700}>
              Hello {user.name},{" "}
            </Heading>
            {!!user.isOrg && (
              <Button onClick={newDoc.onOpen} border="2px solid" borderColor={darkBtn} bg="none" >Add New Document</Button>
            )}
            {!!myDocs && myDocs.length > 0 ? (
              myDocs.map((doc) => {
                const issued =
                  doc.issuedTo.toString().replaceAll("0", "").toLowerCase() !==
                  "x";
                return (
                  <Card  marginX="20px">
                    <CardBody>
                      <Flex flexDir="column" gap={1}>
                        <Grid templateColumns="1fr auto">
                          <Text width="auto">
                            {doc.title}
                            {"  "}
                            <Badge
                              borderRadius="full"
                              px={2}
                              colorScheme={issued ? "green" : "red"}
                            >
                              {issued ? "Issued" : "Not Issued"}
                            </Badge>
                          </Text>
                          <Menu>
                            <MenuButton as={Button} borderRadius="full">
                              <More />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  setDocId(doc.docId.toString());
                                  issue.onOpen();
                                }}
                              >
                                Issue
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Grid>
                        <Text  wordBreak="break-all"><Text fontWeight={700}>Doc Id:</Text> {doc.docId.toString()}</Text>
                        <Text  wordBreak="break-all"><Text fontWeight={700}>Issuer:</Text>{doc.issuedBy.toString()}</Text>
                        <Text  wordBreak="break-all"><Text fontWeight={700}>Issued to:</Text> {doc.issuedTo.toString()}</Text>
                      </Flex>
                    </CardBody>
                    <CardFooter>
                      <Link
                        href={`https://ipfs.io/ipfs/${doc.cid.toString()}`}
                        isExternal
                      >
                        View Document
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <Text>No Docs</Text>
            )}
          </>
        ) : (
          <Text fontSize="2rem" paddingLeft={{base:'10px',md:'auto'}} width={{base:'auto',md:'800px'}} textAlign="center" >OOPS! Looks like your wallet is not connected, connect your wallet to proceed!</Text>
        )}
        <IssueModal
          isOpen={issue.isOpen}
          onClose={issue.onClose}
          docId={docId}
        />
        <Modal isOpen={newDoc.isOpen} onClose={newDoc.onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
          <Button onClick={newDoc.onClose} width="20px" position="absolute" right="10px" margin="5px" borderRadius="50%"><CloseIcon/></Button>
            </ModalHeader>
            <ModalBody display="flex" alignItems="center" justifyContent="center" margin={5}>
              <NewDocForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
