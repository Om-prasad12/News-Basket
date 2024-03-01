import {React,useState}from 'react'
import {Box, Button, Card, CardContent, TextField, Typography,CardActions} from "@mui/material"
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth} from '../../firebase';
import { NavLink,useNavigate } from "react-router-dom";

const Log=()=>{
  const [value,setValue]=useState({
    email:"",
    pass:""
   });
   const navigate=useNavigate();
   const submitHandel=()=>{
    if(!value.email||!value.pass){
      alert("Fill all required fields");
    }else{
    signInWithEmailAndPassword(auth,value.email,value.pass)
    .then((res)=>{
    navigate("/")
    }).catch((err)=>
      console.log("Error:",err)
    )
   }}
    

    return(
       <> 
       <Box >
         <Card sx={{height:"450px",width:"450px",margin:"80px auto"}}>
            <CardContent>
                <Typography variant="h3" sx={{margin:"15px "}}>Login</Typography>
                <TextField label="Email"  placeholder='Enter your email'
                variant='outlined' fullWidth required sx={{margin:"15px auto"}}
                onChange={(event)=>{
                  setValue((prev)=>({...prev,email:event.target.value}))
                }}
                />
                <TextField  label="Password" type="password" placeholder='Enter your password'
                variant='outlined' fullWidth required sx={{margin:"15px auto"}}
                onChange={(event)=>{
                  setValue((prev)=>({...prev,pass:event.target.value}))
                }}
                />
                <CardActions>
                <Button type='submit' variant='contained' color='primary'
                fullWidth sx={{margin:"10px auto",padding:"10px"}}
                onClick={()=>submitHandel()}
                >Login</Button>
                </CardActions>
                <Typography variant="h6" sx={{margin:"5px"}}>Creat account <NavLink to={"/signup"}>SignUp</NavLink></Typography>
                <Typography variant="h6" sx={{margin:"5px"}}>Are you an admin? <NavLink to={"/admin/login"}>Login</NavLink></Typography>
            </CardContent>
         </Card>
       </Box>
       </>
    )
}

export default Log