import React from 'react'
import Navbar from '../components/Nav/Navbar'
import { Home } from '../components/Home'
import { Image,Box } from '@chakra-ui/react'
export const Layout = () => {
  return (
<Box width="100vw" overflowY="hidden" >
<Navbar/>
<Home/>
</Box>
  )
}
