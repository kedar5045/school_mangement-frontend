import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Signin() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* LEFT SIDE - FORM */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >
        <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Sign In
            </Typography>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />

            <Button fullWidth variant="contained" onClick={() => navigate("/DashboardLayout")} sx={{ mt: 2 }}>
              Sign In
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? Sign Up
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* RIGHT SIDE - IMAGE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" }, // hide on mobile
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="signin"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
}