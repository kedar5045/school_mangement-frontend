import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useState, useEffect ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useLocation } from "react-router-dom";




export default function AddAdmission() {
  const { id } = useParams();
const location = useLocation();

const isViewMode = location.pathname.includes("/view/");
const isEditMode = location.pathname.includes("/edit/");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    dob: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = id
      ? `https://sachool-managemnt-backend.onrender.com/api/admissions/${id}`
      : "https://sachool-managemnt-backend.onrender.com/api/admissions";

    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        className: form.class,
        gender: form.gender,
        address: form.address,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    alert(
      id
        ? "Admission Updated Successfully!"
        : "Admission Submitted Successfully!"
    );

    navigate("/dashboard/admissions");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
useEffect(() => {
  if (id) {
    fetchAdmission();
  }
}, [id, fetchAdmission]);

const fetchAdmission = useCallback(async () => {
  try {
    const response = await fetch(
      `https://sachool-managemnt-backend.onrender.com/api/admissions/${id}`
    );

    const data = await response.json();

    if (data.success) {
      setForm({
        name: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        class: data.data.className || "",
        dob: data.data.dob ? data.data.dob.split("T")[0] : "",
        gender: data.data.gender || "",
        address: data.data.address || "",
      });
    }
  } catch (err) {
    console.log(err);
  }
}, [id]);

  return (
    <Box sx={{ p: 3, background: "#f3f5f9", minHeight: "100vh" }}>
      
      {/* Header */}
    <Box sx={{ mb: 3 }}>
  <Button
    startIcon={<ArrowBackIcon />}
    variant="text"
    onClick={() => navigate("/dashboard/admissions")}
    sx={{
      mb: 2,
      textTransform: "none",
      fontWeight: 600,
    }}
  >
    Back to Admissions
  </Button>

 <Typography variant="h5" fontWeight={700}>
  {isViewMode
    ? "Admission Details"
    : isEditMode
    ? "Edit Admission"
    : "New Admission Form"}
</Typography>

  <Typography color="text.secondary" mt={1}>
    Register a new student admission.
  </Typography>
</Box>

      {/* Form Card */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="dob"
                InputLabelProps={{ shrink: true }}
                value={form.dob}
                onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Class"
                name="class"
                value={form.class}
                onChange={handleChange}
                 disabled={isViewMode}
              >
                <MenuItem value="8th">8th</MenuItem>
                <MenuItem value="9th">9th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
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
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={form.address}
                onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                >
                  Submit Admission
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
}