
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const enquiries = [

];

export default function Enquiry() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);



  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("https://sachool-managemnt-backend.onrender.com/api/enquiries");

      const data = await response.json();

      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "New"
  ).length;

  const inProgressEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.status === "In Progress" ||
      enquiry.status === "Progress"
  ).length;

  const convertedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "Converted"
  ).length;
  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h3" fontWeight={600}>
            Enquiry Management
          </Typography>

          <Typography color="text.secondary">
            Manage and track all admission enquiries
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
          onClick={() => navigate("/dashboard/enquiry/new")}
        >
          Add Enquiry
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { title: "Total Enquiries", value: totalEnquiries },
          { title: "New Enquiries", value: newEnquiries },
          { title: "In Progress", value: inProgressEnquiries },
          { title: "Converted", value: convertedEnquiries },
        ].map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography color="text.secondary">
                {item.title}
              </Typography>

              <Typography variant="h4" color="primary">
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search enquiry..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField select fullWidth defaultValue="">
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Progress">In Progress</MenuItem>
              <MenuItem value="Converted">Converted</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField select fullWidth defaultValue="">
              <MenuItem value="">All Classes</MenuItem>
              <MenuItem value="8">8th</MenuItem>
              <MenuItem value="9">9th</MenuItem>
              <MenuItem value="10">10th</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth type="date" />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Class Interested</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Source</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {enquiries.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {row.studentName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.name}
                      </Typography>
                    </TableCell>

                    <TableCell>{row.classInterested}</TableCell>
                    <TableCell>{row.source}</TableCell>

                    <TableCell>
                      <Chip
                        label={row.status}
                        color={
                          row.status === "New"
                            ? "primary"
                            : row.status === "Converted"
                              ? "success"
                              : "warning"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <VisibilityIcon
  sx={{ cursor: "pointer", mr: 2 }}
  onClick={() =>
    navigate(`/dashboard/enquiry/view/${row._id}`)
  }
/>
                      <EditIcon
  sx={{ cursor: "pointer" }}
  onClick={() =>
    navigate(`/dashboard/enquiry/edit/${row._id}`)
  }
/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Details Panel */}
       
      </Grid>
    </Box>
  );
}