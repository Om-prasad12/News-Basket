import React,{useState,useEffect} from "react";
import Layout from './Layout'
import { Button, Card, CardActions, CardContent, CardMedia, Typography,Box } from '@mui/material'
// import FacebookIcon from '@mui/icons-material/Facebook';`
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import {FacebookShareButton, LinkedinShareButton,WhatsappShareButton, TwitterShareButton} from "react-share";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios'
import {auth} from '../firebase'
import Content from "./Content";
function Test(props) {
  const [data,setData]=useState([])
  const [likes,setLikes]=useState();
  const [views,setViews]=useState(false);
  const [userId,setUserId]=useState()
  const [openPupup,setOpenPopup]=useState(false)
  const [userArt,setUserArt]=useState(false)
  const [content,setContent]=useState(
    {urlToImage:"",title:"",description:"",url:"",author:"",content:""})
  const objectToCheck = { userId:`${userId}`};

   useEffect(()=>{
    // console.log("useEffect is running");
    axios.get(`${props.api}`).then((responce) => {
     setData(responce.data)
    }).catch((error)=>{
      console.log(error);}
    )
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserId(user.uid);
      }else{
        setUserId();
      }
    })
   },[props.api,likes,views,userArt])

   const article=(value) =>{
      window.open(value.url,'_blank');
      setViews(!views);
      axios.patch(`/news/view/${value._id}`).then((responce)=>{
       console.log(responce.data);
    }).catch((error)=>{
      console.log(error);
    })
    }

    // For like button
   const updateLike=(_id,like)=>{
    if(userId){
    const foundObject =like.find(obj => obj.userId === objectToCheck.userId);
    // console.log(foundObject)
    if(foundObject){
      axios.patch(`/news/dellike/${_id}`,{
        userId
      }).then((responce)=>{
         console.log(responce.data);
      }).catch((error)=>{
        console.log(error);
      })
      setLikes(false);
    }
    else{
      axios.patch(`/news/addlike/${_id}`,{
        userId
      }).then((responce)=>{
         console.log(responce.data);
      }).catch((error)=>{
        console.log(error);
      })
      setLikes(true);
    }
  }
    else{
      alert("Please login!")
    }
   }

  //  For content page
   const contentHandler=(value)=>{
    const {urlToImage,url,title,description,author,content}=value;
    setContent({urlToImage:urlToImage,title:title,description:description,url:url,
      author:author,content:content})
    setOpenPopup(true);
    setViews(!views);
    axios.patch(`/news/view/${value._id}`).then((responce)=>{
     console.log(responce.data);
  }).catch((error)=>{
    console.log(error);
  })
   }
   

   //For saved article
const addAtricle =(_id,art)=>{
  if(userId){
    const foundArt =art.find(obj => obj.userId === objectToCheck.userId);
    if(foundArt){
      axios.patch(`/news/delart/${_id}`,{
        userId
      }).then((responce)=>{
         console.log(responce.data);
      }).catch((error)=>{
        console.log(error);
      })
      setUserArt(false);
    }
    else{
      axios.patch(`/news/addart/${_id}`,{
        userId
      }).then((responce)=>{
         console.log(responce.data);
      }).catch((error)=>{
        console.log(error);
      })
      setUserArt(true);
    }
  }
    else{
      alert("Please login!")
    }
}
   
  return (
    <Layout>
     <Box sx={{ display: 'flex',flexWrap: 'wrap',justifyContent: 'space-evenly' }}>
      { 
      data.map((value)=>{
        const {urlToImage,title,description,like,view,_id,art} =value;
        const likeCount=like.length;
        const foundObject =like.find(obj => obj.userId === objectToCheck.userId);
        const foundArt = art.find(obj=> obj.userId === objectToCheck.userId);
       return(
        <>
        <Box  sx={{
          width: 400,
          height:650,margin:2
          }}>     
        <Card sx={{width: "400px",height:"640px"}}>
        <CardMedia component={'img'} height="300"  src={urlToImage} alt='Image'  onClick={()=>contentHandler(value)}></CardMedia>
        <CardContent sx={{width: "380px",height:"250px"}}>
          <Typography sx={{margin:"auto"}}><h4 >{title}</h4></Typography>
          <Typography sx={{margin:"auto"}}><p >{description}</p></Typography>
        </CardContent>
        <CardActions >
          <Button onClick={ ()=>updateLike(_id,like)} sx={{mx:"15px"}}>{foundObject ?(<FavoriteIcon sx={{color:"red"}}/>):(<FavoriteBorderIcon sx={{color:"black"}}/>)}
          <Typography sx={{color:"black",margin:"3px"}}>{likeCount}</Typography>
          </Button>
          <VisibilityIcon/><Typography  sx={{ml:"3px",mr:"8px"}}>{view}</Typography>
        <Button  sx={{ml:"20px",mr:"25px"}} variant="contained"
        onClick={ ()=>article(value)}
        >Check Details</Button>
        <Button onClick={()=>addAtricle(_id,art)}>{foundArt ?(<BookmarkIcon fontSize='large' sx={{color:"black"}}/>):(<BookmarkBorderIcon fontSize='large' sx={{color:"black"}}/>)}</Button>
        </CardActions>
      </Card>
      </Box>
      </>
       );
      })
    }
    <Content openPupup={openPupup}
          setOpenPopup={setOpenPopup}
          data={content}
          />
  </Box> 
    </Layout>
    
  )
}

export default Test
