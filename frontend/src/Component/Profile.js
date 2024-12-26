import React, { useState, useEffect } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { auth } from '../firebase';
import Content from "./Content";
import Logout from "./logout";



const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState();
  const [views, setViews] = useState(false);
  const [userId, setUserId] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [userArt, setUserArt] = useState(false);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState({
    urlToImage: "",
    title: "",
    description: "",
    url: "",
    author: "",
    content: ""
  });
  const objectToCheck = { userId: `${userId}` };

  const serverUrl = "https://news-basket-wof1.vercel.app";

  useEffect(() => {
    axios.get(`${serverUrl}/news`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId();
        setUserName("");
      }
    });
  }, [userArt, likes, views]);

  const article = (value) => {
    window.open(value.url, '_blank');
    setViews(!views);
    axios.patch(`${serverUrl}/news/view/${value._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateLike = (_id, like) => {
    if (userId) {
      const foundObject = like.find(obj => obj.userId === objectToCheck.userId);
      if (foundObject) {
        axios.patch(`${serverUrl}/news/dellike/${_id}`, { userId })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setLikes(false);
      } else {
        axios.patch(`${serverUrl}/news/addlike/${_id}`, { userId })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setLikes(true);
      }
    } else {
      alert("Please login!");
    }
  };

  const contentHandler = (value) => {
    const { urlToImage, url, title, description, author, content } = value;
    setContent({ urlToImage, title, description, url, author, content });
    setOpenPopup(true);
    setViews(!views);
    axios.patch(`${serverUrl}/news/view/${value._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addArticle = (_id, art) => {
    if (userId) {
      const foundArt = art.find(obj => obj.userId === objectToCheck.userId);
      if (foundArt) {
        axios.patch(`${serverUrl}/news/delart/${_id}`, { userId })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setUserArt(false);
      } else {
        axios.patch(`${serverUrl}/news/addart/${_id}`, { userId })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setUserArt(true);
      }
    } else {
      alert("Please login!");
    }
  };

  const logoutHandler = () => {
    setOpenLog(true);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Typography variant="h3">
          <Button variant="contained" onClick={() => { navigate("/") }} sx={{ mr: "350px" }}>Go Home</Button>
          Welcome Mr. {userName}
          <Button onClick={() => logoutHandler()} variant="contained" sx={{ float: "right", mr: "20px" }}>Logout</Button>
        </Typography>
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {
          data.map((value) => {
            const { urlToImage, title, description, like, view, _id, art } = value;
            const likeCount = like.length;
            const foundObject = like.find(obj => obj.userId === objectToCheck.userId);
            const foundArt = art.find(obj => obj.userId === objectToCheck.userId);
            if (foundArt) {
              return (
                <Box sx={{ width: 400, height: 650, margin: 2 }} key={_id}>
                  <Card sx={{ width: "400px", height: "640px" }}>
                    <CardMedia component={'img'} height="300" src={urlToImage} alt='Image' onClick={() => contentHandler(value)} />
                    <CardContent sx={{ width: "380px", height: "250px" }}>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="body2">{description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button startIcon={foundObject ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={() => updateLike(_id, like)}>
                        {likeCount} Likes
                      </Button>
                      <Button startIcon={<VisibilityIcon />} onClick={() => article(value)}>
                        {view} Views
                      </Button>
                      <Button startIcon={foundArt ? <BookmarkIcon /> : <BookmarkBorderIcon />} onClick={() => addArticle(_id, art)}>
                        {foundArt ? "Remove from Articles" : "Add to Articles"}
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            } else {
              return null;
            }
          })
        }
      </Box>
      {openPopup && <Content content={content} setOpenPopup={setOpenPopup} />}
      {openLog && <Logout openPopup={openLog} setOpenPopup={setOpenLog} />}
    </>
  );
};

export default Profile;
