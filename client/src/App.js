import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Layout } from './layout/Layout';
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './components/Home';
function App() {
  return (
    <ChakraBaseProvider theme={extendTheme({})}>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home/>} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
