import {React,useEffect,useState }from 'react'
import {Box, Button, Card, CardContent, TextField, Typography,CardActions} from "@mui/material"
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import { auth} from '../../firebase';
import axios from 'axios'
import { NavLink,useNavigate } from "react-router-dom";
const Signup = () => {

// For storing user role in firestore
const [userId,setUserId]=useState({id:""})
 const [value,setValue]=useState({
  name:"",
  email:"",
  pass:""
 });
 const navigate=useNavigate();
 const submitHandel=()=>{
  if(!value.name||!value.email||!value.pass){
    alert("Fill all required fields");
  }else{
  createUserWithEmailAndPassword(auth,value.email,value.pass)
  .then(async(res)=>{
    const user=res.user;
    const {uid} =  res.user
    setUserId({...userId,id:uid});
    await updateProfile(user,{
       displayName:value.name
    })
    navigate("/");
  }).catch((err)=>
    console.log("Error:",err)
  )
 }}

 useEffect(()=>{
  axios.post(`/user`,userId)
    .then((responce) => {  
      console.log(userId);
     }).catch((error)=>{
       console.log(error);}
     )
 },[userId])
  return (
    <div>
      <Box >
         <Card sx={{height:"530px",width:"450px",margin:"80px auto"}}>
            <CardContent>
                <Typography variant="h3" sx={{margin:"15px "}}>SignUp</Typography>
                <TextField label="Name"  placeholder='Enter your name'
                variant='outlined' fullWidth required sx={{margin:"15px auto"}}
                onChange={(event)=>{
                  setValue((prev)=>({...prev,name:event.target.value}))
                }}
                />
                <TextField label="Email"  placeholder='Enter your email'
                variant='outlined' fullWidth required sx={{margin:"15px auto"}}
                onChange={(event)=>{
                  setValue((prev)=>({...prev,email:event.target.value}))
                }}
                />
                <TextField  label="Password"  type="password" placeholder='Enter your password'
                variant='outlined' fullWidth required sx={{margin:"15px auto"}}
                onChange={(event)=>{
                  setValue((prev)=>({...prev,pass:event.target.value}))
                }}
                />
                <CardActions>
                <Button type='submit' variant='contained' color='primary'
                fullWidth sx={{margin:"10px auto",padding:"10px"}}
                onClick={()=>{submitHandel()}}
                >Login</Button>
                </CardActions>
                <Typography variant="h6" sx={{margin:"5px"}}>Creat account <NavLink to={"/login"}>Login</NavLink></Typography>
                <Typography variant="h6" sx={{margin:"5px"}}>Are you an admin? <NavLink to={"/admin/login"}>Login</NavLink></Typography>
            </CardContent>
         </Card>
       </Box>
    </div>
  )
}
export default Signup
