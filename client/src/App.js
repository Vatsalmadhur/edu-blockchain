import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Layout } from './layout/Layout';
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './components/Home';
import  Dash  from './components/Dash';
function App() {
  return (
    <ChakraBaseProvider theme={extendTheme({})}>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/dashboard" element={<Dash/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
