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
          <Route  element={<Layout/>} >
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/verify" element={<Verify/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
