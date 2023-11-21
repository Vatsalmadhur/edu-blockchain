import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout';
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './components/Home';
import { Verify } from './components/Verify';
function App() {
  return (
    <ChakraBaseProvider theme={extendTheme({})}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
