import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home } from "./components/Home/Home";
import { Verify } from "./components/Verify/Verify";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Layout } from "./layout/Layout";
function App() {
  return (
    <ChakraProvider theme={extendTheme({})}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
