import logo from './logo.svg';
import './App.css';
import Login from './component/account/login'
import Home from './component/home/Home'
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useSearchParams } from 'react-router-dom'
import DataProvider from './context/DataProvider.jsx';
import Header from './component/Header/Header';
import { useState } from 'react';
import Createpost from './component/create/Createpost';
import DetailView from './component/details/Detailview';
import Update from './component/create/update';
import Contact from './component/home/contact/Contact';
import About from './component/about/About';
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accestoken');
  return isAuthenticated  ?
    <>
       <Header /> 
      <Outlet />
    </> :
    <Navigate replace to='/account' />
    
}


function App() {
  const [isAuthenticated, isuserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      {/* style={{ marginTop: 64 }} */}
        <div >
          <Routes>
            <Route path='/account' element={<Login isuserAuthenticated={isuserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/blogs/:username' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/blogs/:username' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<Createpost />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/about' element={<About />} />
            </Route> 


            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/details/:id' element={<DetailView />} />
            </Route>


            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
