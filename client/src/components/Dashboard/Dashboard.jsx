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
import { NewDocForm } from "../Forms/NewDocForm";
import {
  getMyDocs,
  issueDoc,
  verifyDoc,
} from "../../ContractMethods";
import { useOutletContext } from "react-router-dom";
import { More } from "iconsax-react";

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
              <Button onClick={newDoc.onOpen}>Add New Document</Button>
            )}
            {!!myDocs && myDocs.length > 0 ? (
              myDocs.map((doc) => {
                const issued =
                  doc.issuedTo.toString().replaceAll("0", "").toLowerCase() !==
                  "x";
                return (
                  <Card>
                    <CardBody>
                      <Flex flexDir="column" gap={1}>
                        <Grid templateColumns="1fr auto">
                          <Text>
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
                        <Text>Doc Id: {doc.docId.toString()}</Text>
                        <Text>Issuer: {doc.issuedBy.toString()}</Text>
                        <Text>Issued to: {doc.issuedTo.toString()}</Text>
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
          "Please connect your wallet to proceed"
        )}
        <IssueModal
          isOpen={issue.isOpen}
          onClose={issue.onClose}
          docId={docId}
        />
        <Modal isOpen={newDoc.isOpen} onClose={newDoc.onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Document</ModalHeader>
            <ModalBody>
              <NewDocForm />
            </ModalBody>
            <ModalFooter>
              <Button onClick={newDoc.onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

const InputModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const IssueModal = ({ isOpen, onClose, docId }) => {
  const [userId, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async () => {
    setLoading(true);
    const { status, error } = await issueDoc(docId, userId);
    if (!!status) {
      toast({
        title: "Document Issued",
        status: "success",
      });
      onClose();
    } else {
      toast({
        title: error,
        status: "error",
      });
    }
    setLoading(false);
  };
  return (
    <InputModal isOpen={isOpen || loading} onClose={onClose}>
      <Input
        name="issueTo"
        placeholder="Issue to"
        onChange={(e) => setUserid(() => e.target.value)}
      />
      <Input name="docId" placeholder="Doc Id" value={docId} readOnly />
      <Button onClick={handleSubmit}>Issue</Button>
    </InputModal>
  );
};
