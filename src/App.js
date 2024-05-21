import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Edit from './Pages/Edit/Edit';
import Profile from './Pages/Profile/Profile';
import Header from './Components/Header/Header';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/registration' element={<Register/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/*' element={<h1>Page Not fount</h1>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;




