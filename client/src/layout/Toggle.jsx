import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'

export const Toggle = () => {
    const {colorMode,toggleColorMode}=useColorMode();
  return (
    <>
    <Button borderRadius="30%" width="20px" height="40px" onClick={()=>toggleColorMode()}>{colorMode==="dark"?<SunIcon/>:<MoonIcon/>}
    </Button>
    </>
  )
}
