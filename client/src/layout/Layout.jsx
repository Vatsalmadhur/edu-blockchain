import React from 'react'
import Navbar from '../components/Nav/Navbar'
import { Home } from '../components/Home/Home'
import { Image,Box } from '@chakra-ui/react'
import { Verify } from '../components/Verify/Verify'
import { Outlet } from 'react-router-dom'
export const Layout = () => {
  return (
<Box width="100vw" overflowY="hidden" >
<Navbar/>
<Outlet/>
</Box>
  )
}
