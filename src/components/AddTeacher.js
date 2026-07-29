import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";


import {
  ArrowBack,
  Save,
  Close,
  Person,
  School,
  LocationOn,
} from "@mui/icons-material";


export default function AddTeacher() {
  const { id } = useParams();
  const location = useLocation();

  const isViewMode = location.pathname.includes("/view/");
  const isEditMode = location.pathname.includes("/edit/");

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    alternateNumber: "",
    department: "",
    qualification: "",
    experience: "",
    designation: "",
    employeeId: "",
    joiningDate: "",
    salary: "",
    status: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isEditMode) {
      await axios.put(
        `https://sachool-managemnt-backend.onrender.com/api/teachers/${id}`,
        form
      );

      alert("Teacher Updated Successfully");
    } else {
      await axios.post(
        "https://sachool-managemnt-backend.onrender.com/api/teachers",
        form
      );

      alert("Teacher Added Successfully");
    }

    navigate("/dashboard/teachers");
  } catch (error) {
    console.error(error);
    alert("Failed to save teacher");
  }
};
useEffect(() => {
  const fetchTeacher = async () => {
  try {
    const response = await fetch(
      `https://sachool-managemnt-backend.onrender.com/api/teachers/${id}`
    );

    const data = await response.json();

    if (data.success) {
      setForm(data.teacher);
    }
  } catch (err) {
    console.log(err);
  }
};
  if (id) {
    fetchTeacher();
  }
}, [id]);



  return (
    <Box sx={{ p: 4, background: "#f5f7fb", minHeight: "100vh" }}>

      {/* Header */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>

          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard/teachers")}
            sx={{ mb: 2 }}
          >
            Back To Teachers
          </Button>

          <Typography variant="h3" fontWeight="bold">
  {isViewMode
    ? "Teacher Details"
    : isEditMode
    ? "Edit Teacher"
    : "Add New Teacher"}
</Typography>

          <Typography color="text.secondary">
  {isViewMode
    ? "View teacher information"
    : isEditMode
    ? "Update teacher information"
    : "Fill in the details below to add a new teacher"}
</Typography>
        </Box>
      </Box>


      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>

            {/* PERSONAL */}

            <Box display="flex" alignItems="center" mb={2}>
              <Person color="primary" />
              <Typography
                ml={1}
                color="primary"
                fontWeight="bold"
                variant="h6"
              >
                Personal Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  name="firstName"
                   disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Last Name"
                 name="lastName"
                  value={form.lastName}
  onChange={handleChange}
   disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                   disabled={isViewMode}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  type="date"
                  name="dob"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Date of Birth"
                  value={form.dob}
                  onChange={handleChange}
                   disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                   onChange={handleChange}
                   disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Alternate Number"
                  name="alternateNumber"
  value={form.alternateNumber}
  onChange={handleChange}
  disabled={isViewMode}
                />
              </Grid>

            </Grid>

            {/* PROFESSIONAL */}

            <Box display="flex" alignItems="center" mt={5} mb={2}>
              <School color="primary" />
              <Typography
                ml={1}
                color="primary"
                fontWeight="bold"
                variant="h6"
              >
                Professional Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>

              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <MenuItem value="Mathemactics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  name="experience"
                  label="Experience (Years)"
                  value={form.experience}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Designation"
                  onChange={handleChange}
                  value={form.designation}
                  name="designation"
                  disabled={isViewMode}

                />
              </Grid>

              

              <Grid item xs={12} md={3}>
                <TextField
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  name="Joining Date"
                  label="Joining Date"
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Salary"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

            </Grid>

            {/* ADDRESS */}

            <Box display="flex" alignItems="center" mt={5} mb={2}>
              <LocationOn color="primary" />
              <Typography
                ml={1}
                color="primary"
                fontWeight="bold"
                variant="h6"
                onChange={handleChange}
              >
                Address Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={form.address}
                  name="address"
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                   disabled={isViewMode}

                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="State"
                  value={form.state}
                  name="state"
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  name="country"
                  label="Country"
                  value={form.country}
                  onChange={handleChange}
                  disabled={isViewMode}
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </TextField>
              </Grid>

            </Grid>

            {/* Buttons */}

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mt={5}
            >

              <Button
                variant="outlined"
                startIcon={<Close />}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
              >
                Save Teacher
              </Button>

            </Box>
          </form>

        </CardContent>
      </Card>

    </Box>
  );
}