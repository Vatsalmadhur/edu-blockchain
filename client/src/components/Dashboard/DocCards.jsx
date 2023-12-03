import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Stack, Image } from '@chakra-ui/react'
export const DocCards = () => {
    const details=["DocumentId","Issued To","Issued By"];
    const gradientBorderStyle = {
        minHeight: "250px",
        height:"auto",
        maxWidth: "450px",
        borderWidth: '2px',
        borderImage: 'linear-gradient(45deg, #0575e6, #00eb67) 30',
      };
  return (
    <>
    <Card style={gradientBorderStyle} margin="10px" boxShadow="md" >
        <CardBody display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" >
            <Image src='/docicon.png' w="150px" h="150px" ></Image>
            <Stack>
            <Text textAlign="center" fontSize="1.5rem" >Document name here</Text>
                <Text>{details.map((detail)=>(
                 <Text > <span style= {{fontWeight:"600"}} >{detail}:</span></Text>
            ))}</Text>
            </Stack>
        </CardBody>
    </Card>
    </>
  )
}
