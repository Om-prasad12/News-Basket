import { Dialog ,Box, Typography, Button} from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const Content = (props) => {
    const {data,openPupup,setOpenPopup} =props;
    const {title,urlToImage,description,author,content}=data;

    const closeHandler=()=>{
      setOpenPopup(false);
    }
  return (
    
      <Dialog open={openPupup}>
        <Box sx={{overflowX:"hidden"}}>
        <Button sx={{color:"red",float:"right"}}
          onClick={()=>{closeHandler()}}
          ><CancelIcon fontSize='large'/></Button>
        <Typography variant='h5' sx={{padding:"5px"}}>Title:{title}</Typography>   
       <img component={'img'} height="450px" width="600px" sx={{margin:"auto"}}  src={urlToImage} alt=" "></img>
       <Typography variant='h4' sx={{padding:"8px 10px"}}>Author:{author}</Typography>
       
       <Typography variant='h5' sx={{padding:"5px"}}>Description:{description}</Typography>
       <Typography variant='h4' sx={{margin:"5px 200px"}}>Content</Typography>
       <Typography variant='h6'sx={{padding:"5px"}} >{content}</Typography>
       
       </Box>
     </Dialog>
  )
}

export default Content
