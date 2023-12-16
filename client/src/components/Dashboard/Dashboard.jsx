import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { NewDocForm } from "../Forms/NewDocForm";
import {
  createUser,
  getDocDetails,
  getMyDetails,
  getMyDocs,
  issueDoc,
  verifyDoc,
} from "../../ContractMethods";

const DocDetails = () => {
  const [docId, setDocId] = useState("");
  const handleSubmit = async () => {
    await getDocDetails(docId);
  };

  return (
    <Flex gap={4} flexDir="column">
      <Input
        placeholder="Doc Id"
        value={docId}
        onChange={(e) => {
          setDocId(() => e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Get Details</Button>
    </Flex>
  );
};


const IssueDocument = () => {
  const [docId, setDocId] = useState("");
  const [userId, setUserid] = useState("");
  const handleSubmit = async () => {
    await issueDoc(docId, userId);
  };

  return (
    <Flex gap={4} flexDir="column">
      <Input
        placeholder="Doc Id"
        value={docId}
        onChange={(e) => {
          setDocId(() => e.target.value);
        }}
      />
      <Input
        placeholder="user id"
        value={userId}
        onChange={(e) => {
          setUserid(() => e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Issue</Button>
    </Flex>
  );
};

const Verify = () => {
  const [docId, setDocId] = useState("");
  const [verifyFor, setVerifyFor] = useState("");
  const handleSubmit = async () => {
    await verifyDoc(docId, verifyFor);
  };

  return (
    <Flex gap={4} flexDir="column">
      <Input
        placeholder="Doc Id"
        value={docId}
        onChange={(e) => {
          setDocId(() => e.target.value);
        }}
      />
      <Input
        placeholder="verify for"
        value={verifyFor}
        onChange={(e) => {
          setVerifyFor(() => e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Verify</Button>
    </Flex>
  );
};

const Signup = () => {
  const [name, setName] = useState("");
  const [isOrg, setIsOrg] = useState("false");

  const makeSignupRequest = () => {
    createUser(name, isOrg);
    console.log({ name, isOrg });
  };

  return (
    <Flex gap={4} flexDir="column">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(() => e.target.value);
        }}
      />
      <FormControl>
        <Flex>
          <FormLabel> Is Organisation? </FormLabel>
          <RadioGroup onChange={setIsOrg} value={isOrg} name="organisation">
            <Stack direction="row">
              <Radio value="false">No</Radio>
              <Radio value="true">Yes</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
      </FormControl>
      <Button onClick={makeSignupRequest}>Signup</Button>
      <Button onClick={getMyDetails}>get Details</Button>
      <Button onClick={getMyDocs}>get Docs</Button>
    </Flex>
  );
};

export const Dashboard = () => {
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
        <Signup />
    <Verify />
        <DocDetails />
    <IssueDocument />
        <NewDocForm />
      </Flex>
    </>
  );
};
