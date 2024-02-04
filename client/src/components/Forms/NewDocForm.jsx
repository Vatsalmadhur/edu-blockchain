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
import axios from "axios";
import { addDoc } from "../../ContractMethods";
import {toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NewDocForm = () => {
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const darkBtn = useColorModeValue("green.300", "green.300");
  const gradientBorderStyle = {
    width: "450px",
    height: "500px",
    borderWidth: "2px",
    borderImage: "linear-gradient(45deg, #0575e6, #00eb67) 30",
  };

  const uploadFile = async () => {
    const load = toast.loading("Adding...")
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", docName);
    const { status: code, data: fileData } = await axios.post(
      "http://localhost:5000/getIpfsHash",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (code === 200) {
      const { data, msg, status } = fileData;
      if (status === true) {
        await addDoc(docName, data.hash);
        toast.update(load, {render: "Doc Added!",type:"success", isLoading: false, autoClose: 5000 });

      } else {
      toast.update(load, { render: "An error occured!", type: "error", isLoading: false, autoClose: 5000 });

      }
    }
    // else {
    //   toast.update(load, { render: "An error occured!", type: "error", isLoading: false, autoClose: 5000 });

    // }
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
          Create new document
        </Text>
        <FormControl width="400px" my={5}>
          <Stack spacing={5}>
            <FormLabel>
              Document Title
              <Input
                type="Title"
                value={docName}
                onChange={(e) => setDocName(() => e.target.value)}
                variant="flushed"
              />
              <FormHelperText>Please enter a title</FormHelperText>
            </FormLabel>
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
            <Button
              width="100px"
              border="2px solid"
              borderColor={darkBtn}
              bg="none"
              onClick={uploadFile}
            >
              Submit
            </Button>
          </Stack>
        </FormControl>
      </Flex>
    </Flex>
  );
};
