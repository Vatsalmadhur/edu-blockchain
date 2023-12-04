import React from 'react'
import { Box, Button, DarkMode, Flex, Input, LightMode, Text, useColorModeValue } from '@chakra-ui/react'
import '../css/global.css'
import { Toggle } from '../../layout/Toggle'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { DocDetails } from '../Dashboard/DocDetails'
export const Verify = () => {
  const bg = useColorModeValue('white', 'blackAlpha.50');
  const gradientBorderStyle = {
    maxHeight: "500px",
    height: '50vh',
    maxWidth: "400px",
    width: "90%",
    borderWidth: '2px',
    borderImage: 'linear-gradient(45deg, #0575e6, #00eb67) 30',

  };
  const darkBtn1 = useColorModeValue('cyan.500', 'cyan.500');
  const darkBtn2 = useColorModeValue('green.300', 'green.300');
  const darkbrdr = useColorModeValue('blackAlpha.500', 'whiteAlpha.900');


  return (
    <Flex minHeight="80vh" width="100vw" justifyContent="center" alignItems="center" bg={bg} >

      <Flex justifyContent="space-around" direction="column" alignItems="center" boxShadow="dark-lg"
        // className='gradBrdr'
        style={gradientBorderStyle}
      >


        <Flex height="250px" width="300px" direction="column" alignItems="center" justifyContent="space-evenly" >
          <Text className='raleway' fontSize="1.5rem">Choose File to Upload</Text>

          <Flex gap={5} width="300px" height="50px" justifyContent="space-around" alignItems="center" border="2px solid " borderColor={darkbrdr} borderRadius="10px" >
            {/* <Box>No File Choosen</Box><Button border="2px solid" borderColor={darkBtn1} bg='none' height="35px">Upload <ArrowUpIcon height={8} width={5} /></Button> */}
            <input type='file'/>
            </Flex>

        <Button bg="none" border="2px solid" borderColor={darkBtn2}>Verify</Button>
        </Flex>
      </Flex>
      <DocDetails/>
    </Flex>
  )
}
