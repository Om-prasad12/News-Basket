import React from 'react'
import {Route,Routes } from 'react-router-dom'
import Test from './Component/Test'
import AddNews from './Component/Admin/addNews'
import Log from './Component/Login/Log'
import Signup from './Component/Login/Signup'
import Protected from './Component/Protected'
import Profile from './Component/Profile'
// import Layout from './\/Component/Layout'
const App =() => {
  
  return (
    <>
   <Routes>
    <Route exact path='/' element={<Test api="/news" />}/>
    <Route exact path='/headlines' element={<Test api="/news/category/headlines" />}/>
    <Route exact path='/technology' element={<Test api="/news/category/technology" />}/>
    <Route exact path='/business' element={<Test api="/news/category/economy" />}/>
    <Route exact path='/entertainment' element={<Test api="/news/category/entertainment" />}/>
    <Route exact path='/health' element={<Test api="/news/category/health" />}/>
    <Route exact path='/general' element={<Test api="/news/category/general" />}/>
    <Route exact path='/sports' element={<Test api="/news/category/sports" />}/>
    <Route exact path='/admin' element={ <Protected api="/news"/>}/>
    <Route exact path='/profile' element={ <Profile/>}/>
    <Route exact path='/admin/headlines' element={<Protected api="/news/category/headlines"/>}/>
    <Route exact path='/admin/technology' element={<Protected api="/news/category/technology"/>}/>
    <Route exact path='/admin/business' element={<Protected api="/news/category/economy"/>}/>
    <Route exact path='/admin/entertainment' element={<Protected api="/news/category/entertainment"/>}/>
    <Route exact path='/admin/health' element={<Protected api="/news/category/health"/>}/>
    <Route exact path='/admin/general' element={<Protected api="/news/category/general"/>}/>
    <Route exact path='/admin/sports' element={<Protected api="/news/category/sports"/>}/>
    <Route exact path='/admin/about' element={<AddNews/>}/>
    <Route exact path='/login' element={<Log/>}/>
    <Route exact path='/signup' element={<Signup/>}/>
   </Routes>
    </>
    
  )
}

export default App

