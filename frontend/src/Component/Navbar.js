import React, { useState,useEffect } from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";

import axios from 'axios'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Body.css";



const Navbar = (props) => {
  const {name,userId}=props;
  const [data,setData]=useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileHandler = async() => {
    console.log(userId);
    const res= await axios.get(`/user/${userId}`);
    setData(res.data.role);
  };

 

  useEffect(()=>{
    if(data){
      localStorage.setItem("role",data)
      if(data === "admin"){
        navigate("/admin")
      }else{
        navigate("/profile")
      } 
    }
  },[data]);

  //Handel menu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  //Menu Drawer
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography color={"goldenrod"} varient="h3" component="div">
        <NewspaperIcon sx={{ margin: "auto" }} />
        NewsBasket
      </Typography>
      <Divider />
      <ul class="navigation-mobile">
        <li>
          <NavLink to={"/headlines"}>Headlines</NavLink>
        </li>
        <li>
          <NavLink to={"/general"}> General</NavLink>
        </li>
        <li>
          <NavLink to={"/health"}>Health</NavLink>
        </li>
        <li>
          <NavLink to={"/sports"}>Sports</NavLink>
        </li>
        <li>
          <NavLink to={"/business"}>Business</NavLink>
        </li>
        <li>
          <NavLink to={"/technology"}>Technology</NavLink>
        </li>
        <li>
          <NavLink to={"/entertainment"}>Entertainment</NavLink>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box class="nav">
        <AppBar component={"nav"} sx={{ background: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box class="flex">
              <Typography color={"goldenrod"} varient="h1" component="div">
                {<NewspaperIcon sx={{ margin: "auto" }} color={"goldenrod"} />}
                NewsBasket
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <ul class="navigation-menu">
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/headlines"}>Headlines</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/general"}> General</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/health"}>Health</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/sports"}>Sports</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/business"}>Business</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/technology"}>Technology</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/entertainment"}>Entertainment</NavLink>
                  </li>
                </ul>
              </Box>
              <Box class="button">
                {name ? (
                  <Box>
                    <Button onClick={() => profileHandler()}>
                      <AccountCircleIcon fontSize="large" />
                    </Button>
                    {props.name}
                  </Box>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<LoginIcon />}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Toolbar />
      </Box>
      
    </>
  );
};

export default Navbar;
