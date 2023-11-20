import { Box, Button, Flex, Text, Image } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import React from 'react'
import './Home.css'

export const Home = () => {
  return (
    <>
    <Box  width="100vw" position="relative" minHeight="90vh" height="auto" overflow="hidden">
      <Flex width="100vw" height="80vh" direction="column" textAlign="center" gap={20} alignItems="center" justifyContent="center">
        <Text className='heading'>The Blockchain Network for <br /> Educational credentials</Text>
        <Button width="200px">Get Started <ArrowForwardIcon width={10} height={6} /> </Button>

      </Flex>
      <Image position="absolute"  left="50px" top="-400px" width={600} opacity={0.2} src='/img1.svg' />
      <Image position="absolute"  bottom="-400" right="50px" width={600} opacity={0.2} src='/img1.svg' />
      </Box>
    </>
  )
}
