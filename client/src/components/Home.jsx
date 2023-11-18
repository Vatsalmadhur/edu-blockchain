import { Box, Button, Flex, Text } from '@chakra-ui/react'
import {ArrowForwardIcon} from "@chakra-ui/icons"
import React from 'react'
import './Home.css'

export const Home = () => {
  return (
    <Flex  height="70vh"  width="100vw" direction="column" textAlign="center" gap={20}  alignItems="center" justifyContent="center">

            <Text  className='heading'>The Blockchain Network for <br/> Educational credentials</Text>
            <Button width="200px">Get Started <ArrowForwardIcon width={10} height={6}/> </Button>

    </Flex>
  )
}
