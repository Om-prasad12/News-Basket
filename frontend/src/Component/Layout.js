import {React,useEffect,useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {auth} from '../firebase'
const Layout = ({children}) => {
  const [userName,setUserName]=useState("")
  const [userId,setUserId]=useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
        setUserId(user.uid);
      }else{
        setUserName("")
      }
    })
  },[])
  return (
    <>
    <Navbar name={userName}
    userId={userId}/>
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout;
