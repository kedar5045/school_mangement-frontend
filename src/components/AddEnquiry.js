import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useLocation } from "react-router-dom";


export default function AddEnquiry() {

  const { id } = useParams();
const location = useLocation();

const isViewMode = location.pathname.includes("/view/");
const isEditMode = location.pathname.includes("/edit/");

useEffect(() => {
  if (id) {
    fetchEnquiry();
  }
}, [id]);

const fetchEnquiry = async () => {
  try {
    const response = await fetch(
      `https://sachool-managemnt-backend.onrender.com/api/enquiries/${id}`
    );

    const data = await response.json();

    if (data.success) {
      setForm(data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
  const navigate=useNavigate();
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    classInterested: "",
    source: "",
    status: "New",
      date: new Date().toISOString().split("T")[0], 
    remarks: "",
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
    const response = await fetch("hhttps://sachool-managemnt-backend.onrender.com/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      alert("Enquiry Saved Successfully");
      navigate("/dashboard/enquiry");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f6f9", minHeight: "100vh" }}>

      <Box sx={{ mb: 4 }}>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate("/dashboard/enquiry")}
    sx={{
      mb: 2,
      textTransform: "none",
      fontWeight: 600,
    }}
  >
    Back to Enquiry
  </Button>

  <Typography variant="h4" fontWeight="bold">
  {isViewMode
    ? "View Enquiry"
    : isEditMode
    ? "Edit Enquiry"
    : "Add New Enquiry"}
</Typography>

<Typography color="text.secondary" mt={1}>
  {isViewMode
    ? "View enquiry details."
    : isEditMode
    ? "Update enquiry details."
    : "Record a new admission enquiry."}
</Typography>

  
</Box>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Student Name"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Parent Name"
                name="parentName"
                value={form.parentName}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={form.phone}
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
                select
                fullWidth
                required
                label="Class Interested"
                name="classInterested"
                value={form.classInterested}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <MenuItem value="Nursery">Nursery</MenuItem>
                <MenuItem value="LKG">LKG</MenuItem>
                <MenuItem value="UKG">UKG</MenuItem>
                <MenuItem value="1st">1st</MenuItem>
                <MenuItem value="2nd">2nd</MenuItem>
                <MenuItem value="3rd">3rd</MenuItem>
                <MenuItem value="4th">4th</MenuItem>
                <MenuItem value="5th">5th</MenuItem>
                <MenuItem value="6th">6th</MenuItem>
                <MenuItem value="7th">7th</MenuItem>
                <MenuItem value="8th">8th</MenuItem>
                <MenuItem value="9th">9th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Source"
                name="source"
                value={form.source}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <MenuItem value="Walk-in">Walk-in</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Website">Website</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Referral">Referral</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Converted">Converted</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    type="date"
    label="Enquiry Date"
    name="date"
    value={form.date}
    onChange={handleChange}
    InputLabelProps={{ shrink: true }}
    disabled={isViewMode}
  />
</Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Remarks"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Button
      variant="outlined"
      onClick={() => navigate("/dashboard/enquiry")}
    >
      ← Back to Enquiry
    </Button>

    <Box display="flex" gap={2}>
      <Button
        variant="outlined"
        onClick={() => navigate("/dashboard/enquiry")}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
      >
        Save Enquiry
      </Button>
    </Box>
  </Box>
</Grid>

          </Grid>

        </form>
      </Paper>

    </Box>
  );
}