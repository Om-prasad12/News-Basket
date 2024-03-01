import React from "react";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import { Dialog, Typography, Button, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
const Logout = (props) => {
  const navigate=useNavigate();
  const { openPupup, setOpenPopup } = props;
   const logoutHandler=()=>{
    auth.signOut();
    setOpenPopup(false);
    navigate("/");
    localStorage.setItem('role',"")
   }
  return (
    <Dialog open={openPupup}>
      <Box sx={{ height: "220px", width: "350px" }}>
        <Button
          sx={{ marginLeft: "285px" }}
          onClick={() => setOpenPopup(false)}
        >
          <CancelIcon fontSize="large" />
        </Button>
        <Typography variant="h5" sx={{ margin: "10px 40px" }}>
          Are you want to logout?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "20px 115px", padding: "10px" }}
          endIcon={<LogoutIcon />}
          onClick={()=>{
            logoutHandler()
          }}
        >
          Logout
        </Button>
      </Box>
    </Dialog>
  );
};

export default Logout;
