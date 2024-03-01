import React, { useEffect } from 'react'
import { useState} from 'react'
import axios from 'axios'
import { Dialog,Card,CardContent,Typography,TextField,Button} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

const Popup = (props) => {
  const [user,setUser]=useState({})
    const {data,openPupup,setOpenPopup} =props;
      const {_id,urlToImage,title,description,url,category,author,content}=data
      useEffect(()=>{
        setUser(
          {urlToImage:`${urlToImage}`,title:`${title}`,description:`${description}`,url:`${url}`,category:`${category}`,author:`${author}`,content:`${content}`})
      },[data])
    
       let name,value;
    const handleInput=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
       }
       const submitNews = async (_id)=>{
        axios.patch(`/news/${_id}`,user)
            .then((responce) => {
              console.log(responce);
              alert("News Updated successfully");
              setOpenPopup(false);
            })
            .catch((error) => {
              console.log(error);
            });
       }
  return (
    
    <Dialog open={openPupup}>
       <Card sx={{maxWidth:"450px",margin:"0px auto"}}>
          <CardContent sx={{padding:"30px"}}>
          <Button type='submit' 
            onClick={()=>setOpenPopup(false)}
             sx={{margin:"5px",float:"right",color:"red"}} ><CancelIcon fontSize='large'/></Button>
            <Typography variant='h4' sx={{margin:"5px 25px"}}>Update News</Typography>
            <TextField  label="Update the image"  
            name="urlToImage" value={user.urlToImage}
            onChange={handleInput}
            variant='outlined' fullWidth sx={{margin:"10px"}}/>
             <TextField label='Update the author name' 
            name="title" value={user.author}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
            <TextField label='Update the title' 
            name="title" value={user.title}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
            <TextField label='Update the description'
            name="description" value={user.description}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
            <TextField label='Update the news url'
            name="url" value={user.url}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
             <TextField label='Update the content'   
            name="title" value={user.content}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
            <TextField label='Update the category'
            name="category" value={user.category}
            onChange={handleInput}
            variant='outlined' fullWidth  sx={{margin:"10px"}}/>
            <Button type='submit' variant='contained' color='primary'
            onClick={()=>submitNews(`${_id}`)}
            fullWidth sx={{margin:"5px"}} >Submit</Button>
            
            </CardContent>
         </Card>
    </Dialog>
    
  )
}

export default Popup
