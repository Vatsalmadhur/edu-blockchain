import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorModeValue } from '@chakra-ui/react';

export const NewDocForm = () => {
    const [input,setInput]=useState('');
    const isError=input==='';
  const darkBtn = useColorModeValue('green.300', 'green.300');
  const gradientBorderStyle = {
    width: "450px",
    height:"500px",
    borderWidth: '2px',
    borderImage: 'linear-gradient(45deg, #0575e6, #00eb67) 30',

  };
  return (
    <Flex  style={gradientBorderStyle}  boxShadow='dark-lg' direction="column" alignItems=
    "center" justifyContent="center">
      <Flex  direction="column"  alignItems=
    "center" justifyContent="center" gap={5}>
      <Text fontSize="1.8rem" fontFamily="Ubuntu" textAlign="center" fontWeight="500">Create new document</Text>
    <FormControl width="400px" my={5}>
      <Stack spacing={5}>
        <FormLabel >
          Document Title
        <Input type='Title' value={input} variant="flushed" />
        {!isError?
        <FormHelperText>What would you like call your document?</FormHelperText>:
        <FormHelperText>Please enter a title</FormHelperText>
        }
        </FormLabel>
        <FormLabel>
        <Input type='file'variant="flushed" />
        <FormHelperText>Upload the document</FormHelperText>
        </FormLabel>
        <Button width="100px" border="2px solid" borderColor={darkBtn} bg="none">Submit</Button>
        </Stack>
    </FormControl>
    </Flex>
    </Flex>

  )
}
