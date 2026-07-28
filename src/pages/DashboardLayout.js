import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PeopleIcon from "@mui/icons-material/People";
import Schoollogo from '../assests/school-logo.jpg';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";




export default function DashboardLayout() {


  const [logoutDialog, setLogoutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("User Logged Out");

    // Clear token if using authentication
    localStorage.removeItem("token");

    // Navigate to login page
    // navigate("/signin");

    setLogoutDialog(false);
  };
  const drawerWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);



  return (
    <Box sx={{ display: "flex" }}>

      {/* TOP BAR */}
      <AppBar position="fixed" sx={{ zIndex: 1101 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" 
           sx={{
    ml: isMobile ? 0 : 30,
    fontWeight: 600,
  }}>
           CampusFlow
          </Typography>

          {/* Push profile to right */}
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar
              alt="Admin"
              src="https://i.pravatar.cc/150?img=12"
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setLogoutDialog(true);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>


      {/* SIDEBAR */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >


        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
          }}
        >
          <img
            src={Schoollogo}
            alt="School Logo"
            style={{
              width: 80,
              height: 60,
              borderRadius: "50%",

            }}
          />
        </Box>

        <List>

          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard/students">
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard/classes">
            <ListItemIcon><ClassIcon /></ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard/admissions">
            <ListItemIcon><HowToRegIcon /></ListItemIcon>
            <ListItemText primary="Admissions" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard/enquiry">
            <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
            <ListItemText primary="Enquiry" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard/teachers">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Teachers" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      <Dialog
        open={logoutDialog}
        onClose={() => setLogoutDialog(false)}
      >
        <DialogTitle>
          Confirm Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setLogoutDialog(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}