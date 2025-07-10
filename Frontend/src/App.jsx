import Header from './Header';
import Footer from  './Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactDOM  from 'react-dom/client';
import Home from './Pages/Home.jsx';
import Registration from './Pages/Registration.jsx';
import Visit from './Pages/Visit.jsx';
import Admin from './Pages/Admin.jsx';
import Search from './Admin/Search.jsx';
import Finance from './Admin/Finance.jsx';
import './App.css';



function App() {
  return (
  <>
  <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/visit" element={<Visit />} />
     <Route path="/admin" element={<Admin />} /> 
     <Route path="/search" element={<Search />} /> 
     <Route path="/finance" element={<Finance />} />  
   </Routes>
  
   <Footer/>
   </BrowserRouter>
   </>
  )
}

export default App;
