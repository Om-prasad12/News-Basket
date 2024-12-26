import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Dialog, Typography, Button, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = ({ openPopup, setOpenPopup }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut()
      .then(() => {
        setOpenPopup(false); // Close the dialog
        navigate("/"); // Navigate to home page after logout
        localStorage.setItem("role", ""); // Clear role from local storage
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Dialog open={openPopup}>
      <Box sx={{ height: "220px", width: "350px" }}>
        <Button sx={{ marginLeft: "285px" }} onClick={() => setOpenPopup(false)}>
          <CancelIcon fontSize="large" />
        </Button>
        <Typography variant="h5" sx={{ margin: "10px 40px" }}>
          Are you sure you want to logout?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "20px 115px", padding: "10px" }}
          endIcon={<LogoutIcon />}
          onClick={logoutHandler} // Call logoutHandler here
        >
          Logout
        </Button>
      </Box>
    </Dialog>
  );
};

export default Logout;
