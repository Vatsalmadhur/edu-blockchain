import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './components/Home/Home';
import { Verify } from './components/Verify/Verify';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Layout } from './layout/Layout';
function App() {
  return (
    <ChakraBaseProvider theme={extendTheme({})}>
      <BrowserRouter>
        <Routes>
          <Route  element={<Layout/>} >
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/verify" element={<Verify/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
