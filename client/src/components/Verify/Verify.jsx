import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { verifyDoc } from "../../ContractMethods";
import { pineFileToIpfs } from "../../Utils";

export const Verify = () => {
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const darkBtn = useColorModeValue("green.300", "green.300");
  const gradientBorderStyle = {
    width: "450px",
    height: "500px",
    borderWidth: "2px",
    borderImage: "linear-gradient(45deg, #0575e6, #00eb67) 30",
  };

  const handleSubmit = async () => {
    const { status, msg, data } = await pineFileToIpfs({ file, userId });
    if (status) {
      const { status, issuedTo, issuedBy, title } = await verifyDoc(
        data.hash,
        userId
      );
      if (status) {
        alert(
          `Document verified for ${issuedTo.toString()} by ${issuedBy.toString()} with title ${title.toString()}`
        );
      }
    } else {
      alert(msg);
    }
  };

  return (
    <Flex
      style={gradientBorderStyle}
      boxShadow="dark-lg"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <Text
          fontSize="1.8rem"
          fontFamily="Ubuntu"
          textAlign="center"
          fontWeight="500"
        >
          Verify Document
        </Text>
        <FormControl width="400px" my={5}>
          <Stack spacing={5}>
            <FormLabel>
              <Input
                type="file"
                variant="flushed"
                onChange={(e) => {
                  setFile(() => e.target.files[0]);
                }}
              />
              <FormHelperText>Upload the document</FormHelperText>
            </FormLabel>
            <FormLabel>
              User id
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(() => e.target.value)}
                variant="flushed"
              />
              <FormHelperText>Please enter a UserId</FormHelperText>
            </FormLabel>
            <Button
              width="100px"
              border="2px solid"
              borderColor={darkBtn}
              bg="none"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </FormControl>
      </Flex>
    </Flex>
  );
};
