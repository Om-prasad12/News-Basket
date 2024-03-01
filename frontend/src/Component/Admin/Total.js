import React, { useState, useEffect } from "react";
import Admin from "../admin";
import Popup from "./Popup";
import { Button, Paper, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const Total = (props) => {
  const [user,setUser]=useState(
    {_id:"",urlToImage:"",title:"",description:"",url:"",category:"",author:"",content:""})
  const [data, setData] = useState([]);
  // const [dataUpdate,setDataUpdate]=useState();
  // const [update,setUpdate]=useState();
  const [del,setDel]=useState(false);
  useEffect(() => {
    axios
      .get(`${props.api}`)
      .then((responce) => {
        setData(responce.data);
        //  console.log(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.api,del]);

  const updateHandler =(value)=>{
  //  const res1= await axios.get(`/news/${id}`)
    const { _id,urlToImage,url,title,description,author,content,category}=value
      //  console.log(responce.data); 
      setUser({_id:_id,urlToImage:urlToImage,title:title,description:description,url:url,
      author:author,content:content,category:category})
      
  }
 useEffect(()=>{
  // console.log(user)
  if (user._id) {
    setOpenPopup(true); }
 },[user])

  const deleteHandler =(id)=>{
    alert(`${id} deteled successfully`);
    axios.delete(`/news/${id}`).then((responce)=>{
      console.log(responce.data);
      setDel(!del);
   }).catch((error)=>{
     console.log(error);
   })
  }
  

  const [openPupup,setOpenPopup] =useState(false);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Admin />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {
           data.map((value) => {
            const {urlToImage,title,_id} =value;
            return (
              <>
              <Paper elevation={4} sx={{ margin: "10px" }}>
                <Box display="flex" >
                  <img
                    src={urlToImage}
                    alt="Image"
                    width="150px"
                    height="150px"
                  ></img>
                  <Typography
                    variant="h5"
                    sx={{ width: "750px", margin: "auto 20px" }}
                  >
                    {title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ height: "50px", margin: "auto" }}
                    startIcon={<EditIcon />}
                    onClick={()=>updateHandler(value) }
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ height: "50px", margin: "auto" }}
                    startIcon={<DeleteIcon />}
                    onClick={ ()=>deleteHandler(_id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
              </>
            );
          })}
        </Box>
        <Popup openPupup={openPupup}
          setOpenPopup={setOpenPopup}
          data={user}
          />
      </Box>
    </>
  );
};

export default Total;
