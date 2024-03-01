import React,{useState,useEffect} from "react";
import Layout from './Layout'
import { Button, Card, CardActions, CardContent, CardMedia, Typography,Box } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import {FacebookShareButton, LinkedinShareButton,WhatsappShareButton, TwitterShareButton} from "react-share";
import axios from 'axios'
// import { responsiveProperty } from '@mui/material/styles/cssUtils'
function Home() {
  const [data,setData]=useState([])
   useEffect(()=>{
    axios.get(" https://newsapi.org/v2/everything?q=bitcoin&apiKey=78ce22f8eb754a1d86c596a844733718").then((responce) => {
     setData(responce.data.articles)
     console.log(responce.data);
    }) 
   },[])
   const article=(value) =>{
      window.open(value.url,'_blank');
    }
  return (
    <Layout>
     <Box sx={{ display: 'flex',flexWrap: 'wrap',justifyContent: 'space-evenly' }}>
      { 
      data.map((value)=>{
       return(
        <Box  sx={{
          width: 400,
          height:650,margin:2
          }}>     
        <Card sx={{width: "400px",height:"640px"}}>
        <CardMedia component={'img'} height="300"  src={value.urlToImage} alt='Image'></CardMedia>
        <CardContent sx={{width: "380px",height:"250px"}}>
          <Typography sx={{margin:"auto"}}><h4 >{value.title}</h4></Typography>
          <Typography sx={{margin:"auto"}}><p >{value.description}</p></Typography>
        </CardContent>
        <CardActions >
        <div >
        <FacebookShareButton url={value.url}>
          <FacebookIcon/>
        </FacebookShareButton>
        </div>
        <div >
        <LinkedinShareButton url={value.url}>
        <LinkedInIcon/>
        </LinkedinShareButton>
        </div>
        <div >
        <WhatsappShareButton url={value.url}>
        <WhatsAppIcon/>
        </WhatsappShareButton>
        </div>
        <div >
        <TwitterShareButton url={value.url}>
        <TwitterIcon/>
        </TwitterShareButton>
        </div>
        <Button  sx={{margin:"auto"}} variant="contained"
        onClick={ ()=>article(value)}
        >Check Details</Button>
        </CardActions>
      </Card>
      </Box>
       );
      })
    }
  
  </Box> 
    </Layout>
    
  )
}

export default Home
