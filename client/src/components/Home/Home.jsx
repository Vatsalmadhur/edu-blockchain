import { Box, Button, Flex, Text, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import React from 'react'
import './Home.css'

export const Home = () => {
  const darkBtn = useColorModeValue('cyan.500', 'cyan.500');
  return (
    <>
      <Box width="100vw" position="relative" minHeight="90vh" height="auto" overflow="hidden">
        <Flex  width="100vw" minHeight="70vh" direction="column" textAlign="center" gap={20} alignItems="center" justifyContent="center" >
          <Flex  textAlign="center" direction="column" alignItems="center">
          <Text
            bgGradient='linear(to-l, rgba(0,242,96,1) 30%,  rgba(5,117,230,1) 100%)'
            bgClip='text'
            fontSize={{base:"2rem", md:"4rem"}} width={{base:'95vw',md:"60vw"}} fontFamily="Ubuntu"> The Blockchain Network for Educational credentials</Text>
            <Text width={{base:'90vw',md:"45vw"}} fontSize={{base:"1rem", md:"1.5rem"}} fontFamily="Ubuntu" mt={{base:"20px",md:""}}>Transforming Education's Foundation: Embrace a Future where Credentials are Immutable, Accessible, and Secure on a Unified Blockchain Network. Join us in Redefining Trust and Transparency in Education.</Text>
            </Flex>
          <Button width="170px" border="2px solid" borderColor={darkBtn} bg="none" >Get Started <ArrowForwardIcon width={10} height={5} /> </Button>

        </Flex>
        <Image position="absolute" left="50px" top="-400px" width={600} opacity={0.1} src='/img1.svg' pointerEvents='none' />
        <Image position="absolute" bottom="-400" right="50px" width={600} opacity={0.1} src='/img1.svg' pointerEvents='none'  />
      </Box>
    </>
  )
}
