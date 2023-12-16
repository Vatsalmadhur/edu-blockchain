import React, { useState } from "react";
import Navbar from "../components/Nav/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  const [user, setUser] = useState({
    connected: false,
    address: null,
  });
  return (
    <Box width="100vw" overflowY="hidden">
      <Navbar user = {user} setUser={setUser} />
      <Outlet context={{user, setUser}} />
    </Box>
  );
};
