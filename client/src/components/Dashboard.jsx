import React from 'react'
import { DocCards } from './DocCards'
import { Flex } from '@chakra-ui/react'

export const Dashboard = () => {
  return (
    <>
    <Flex wrap="wrap" justifyContent="center" gap={10} mt={20}>
    <DocCards/>
    <DocCards/>
    <DocCards/>
    <DocCards/>
    <DocCards/>
    <DocCards/>
    </Flex>

    </>


  )
}
