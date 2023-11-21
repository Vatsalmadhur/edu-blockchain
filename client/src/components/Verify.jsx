import React from 'react'
import { Button, Flex,Input,Text } from '@chakra-ui/react'
import '../components/css/global.css'
export const Verify = () => {
  return (
    <Flex height="100vh" width="100vw" border="2px solid red" justifyContent="center" alignItems="center"  >
        <Flex  height="500px" width="400px" borderRadius="20px"  justifyContent="space-around" direction="column"alignItems="center" boxShadow="dark-lg"className='gradBrdr' >
          <Flex height="250px" width="300px" direction="column" alignItems="center" justifyContent="space-evenly">
            <Text className='raleway' fontSize="1.5rem">Choose File to Upload</Text>
            <Button>Upload</Button>
            <Input width="300px" className='gradBrdr'/>
            </Flex>
        </Flex>


    </Flex>
  )
}
