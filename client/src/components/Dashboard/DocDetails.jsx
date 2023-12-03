import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const DocDetails = () => {
    const gradientBorderStyle = {
        maxHeight: "500px",
        height: '50vh',
        maxWidth: "400px",
        width: "90%",
        borderWidth: '2px',
        borderImage: 'linear-gradient(45deg, #0575e6, #00eb67) 30',

      };
      const details=["DocumentId","Document Name","Issued To","Issued By"];
  return (

    <Flex justifyContent="center" direction="column" alignItems="center"  boxShadow="dark-lg"
      style={gradientBorderStyle}    >
        <Flex  direction="column" width="300px" gap={50}
        >
        <Text fontSize='1.5rem' fontFamily="Ubuntu" textAlign="center">Document Details</Text>
        <Flex direction="column">
            {details.map((detail)=>(
                 <Text > <span style= {{fontWeight:"600"}} >{detail}:</span></Text>
            ))}
        </Flex>
        </Flex>
    </Flex>
  )
}
