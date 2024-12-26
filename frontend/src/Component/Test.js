import React, { useState, useEffect } from "react";
import Layout from './Layout';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import { auth } from '../firebase';
import Content from "./Content";

function Test(props) {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(null);
  const [views, setViews] = useState(null);
  const [userId, setUserId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [userArt, setUserArt] = useState(null);
  const [content, setContent] = useState({
    urlToImage: "",
    title: "",
    description: "",
    url: "",
    author: "",
    content: ""
  });

  const serverUrl = "https://news-basket-wof1.vercel.app";

  // Fetch data when props.api or other dependencies change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}${props.api}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.api, likes, views, userArt]);

  // Track authentication changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const article = async (value) => {
    window.open(value.url, '_blank');
    setViews(value._id); // Set a unique ID for tracking
    try {
      await axios.patch(`${serverUrl}/news/view/${value._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLike = async (_id, like) => {
    if (userId) {
      const foundObject = like.find(obj => obj.userId === userId);
      try {
        if (foundObject) {
          await axios.patch(`${serverUrl}/news/dellike/${_id}`, { userId });
        } else {
          await axios.patch(`${serverUrl}/news/addlike/${_id}`, { userId });
        }
        // Fetch the updated data explicitly after the action
        const response = await axios.get(`${serverUrl}${props.api}`);
        setData(response.data);
        setLikes(_id);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login!");
    }
  };
  

  const contentHandler = async (value) => {
    const { urlToImage, url, title, description, author, content } = value;
    setContent({ urlToImage, title, description, url, author, content });
    setOpenPopup(true);
    setViews(value._id); // Set unique ID
    try {
      await axios.patch(`${serverUrl}/news/view/${value._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const addArticle = async (_id, art) => {
    if (userId) {
      const foundArt = art.find(obj => obj.userId === userId);
      try {
        if (foundArt) {
          await axios.patch(`${serverUrl}/news/delart/${_id}`, { userId });
        } else {
          await axios.patch(`${serverUrl}/news/addart/${_id}`, { userId });
        }
        setUserArt(_id); // Track changes with unique ID
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login!");
    }
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {
          data.map((value) => {
            const { urlToImage, title, description, like, view, _id, art } = value;
            const likeCount = like.length;
            const foundObject = like.find(obj => obj.userId === userId);
            const foundArt = art.find(obj => obj.userId === userId);
            return (
              <Box sx={{ width: 400, height: 650, margin: 2 }} key={_id}>
                <Card sx={{ width: "400px", height: "640px" }}>
                  <CardMedia 
                    component={'img'} 
                    height="300" 
                    src={urlToImage} 
                    alt='Image' 
                    onClick={() => contentHandler(value)} 
                  />
                  <CardContent sx={{ width: "380px", height: "250px" }}>
                    <Typography sx={{ margin: "auto" }}>
                      <h4>{title}</h4>
                    </Typography>
                    <Typography sx={{ margin: "auto" }}>
                      <p>{description}</p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => updateLike(_id, like)} sx={{ mx: "15px" }}>
                      {foundObject ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "black" }} />
                      )}
                      <Typography sx={{ color: "black", margin: "3px" }}>{likeCount}</Typography>
                    </Button>
                    <VisibilityIcon />
                    <Typography sx={{ ml: "3px", mr: "8px" }}>{view}</Typography>
                    <Button 
                      sx={{ ml: "20px", mr: "25px" }} 
                      variant="contained"
                      onClick={() => article(value)}
                    >
                      Check Details
                    </Button>
                    <Button onClick={() => addArticle(_id, art)}>
                      {foundArt ? (
                        <BookmarkIcon fontSize='large' sx={{ color: "black" }} />
                      ) : (
                        <BookmarkBorderIcon fontSize='large' sx={{ color: "black" }} />
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })
        }
        <Content 
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          data={content}
        />
      </Box>
    </Layout>
  );
}

export default Test;
