import React from 'react'
import { Button, DarkMode, Flex, Input, LightMode, Text, useColorModeValue } from '@chakra-ui/react'
import '../components/css/global.css'
import { Toggle } from '../layout/Toggle'
import { ArrowUpIcon } from '@chakra-ui/icons'
export const Verify = () => {
  const bg = useColorModeValue('white', 'blackAlpha.50');
  const gradientBorderStyle = {
    height:"500px",
     width:"400px",
    borderWidth: '2px',
    borderImage: 'linear-gradient(45deg, #0575e6, #00eb67) 30',
  };
  const darkBtn = useColorModeValue('cyan.500', 'cyan.500');
  return (
    <Flex height="100vh" width="100vw" justifyContent="center" alignItems="center" bg={bg} >

        <Flex height="500px" width="400px" justifyContent="space-around" direction="column" alignItems="center" boxShadow="dark-lg"
        // className='gradBrdr'
        style={gradientBorderStyle}
         >


          <Flex height="250px" width="300px" direction="column" alignItems="center" justifyContent="space-evenly" >
            <Text className='raleway' fontSize="1.5rem">Choose File to Upload</Text>
            <Button border="2px solid" borderColor={darkBtn} bg='none'>Upload <ArrowUpIcon height={8} width={5}/></Button>
            <Input width="300px" />

          </Flex>
        </Flex>



    </Flex>
  )
}
