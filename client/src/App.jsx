import Navbar from './Navbar'
import {BrowserRouter,Route,Routes, useNavigate} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import CreatePost from './CreatePost'
import Post from './Post'
import EditPost from './EditPost'
export const userContext=createContext()
function App() {
  const [user,setUser]=useState({})
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:3000/user')
    .then(user=>{
      setUser(user.data)
    })
    .catch(err=>console.log(err))
  },[user])

  return (
    <userContext.Provider value={user}>
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element={<RedirectToHome/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/create' element={<CreatePost/>}/>
    <Route path='/post/:id' element={<Post/>}/>
    <Route path='/editpost/:id' element={<EditPost/>}/>
  </Routes>
  </BrowserRouter>
  </userContext.Provider>
  )
}
const RedirectToHome=()=>{
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/home')
  },[navigate])
  return null
  }
  
export default App
