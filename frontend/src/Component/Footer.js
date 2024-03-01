import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Body.css";
const Footer = () => {
  return (
    <>
      <div class="footerBody">
        <div class="subFooterBody">
          <Grid container spcing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ margin: "15px" }}>
                Contact Us
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                NewsBasket
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                +91 716461466
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                newsbasket@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ margin: "15px" }}>
                Quick reaches
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                Our latest blogs
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                Our products & services
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                Our visions & missions
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                career
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ margin: "15px" }}>
                Our social media handels
              </Typography>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                <div class="socialmedia">
                  <div class="subSocialmedia">
                    <FacebookIcon />
                  </div>
                  <div class="subSocialmedia">
                    <InstagramIcon />
                  </div>
                  <div class="subSocialmedia">
                    <TwitterIcon />
                  </div>
                  <div class="subSocialmedia">
                    <YouTubeIcon />
                  </div>
                </div>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" sx={{ margin: "15px" }}>
                {" "}
                <div class="socialmedia">
                  <div class="subSocialmedia">
                    Copyright@2023 NewsBasket
                  </div>
                </div>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Footer;
