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
import {
  Person,
  Phone,
  School,
  ArrowBack,
  Save,
  Close,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate,useParams,useLocation } from "react-router-dom";

import { useEffect } from "react";
 import EditIcon from "@mui/icons-material/Edit";


export default function AddStudent() {

    const navigate=useNavigate();
    const { id } = useParams(); 
    const location = useLocation();
  const isViewMode = location.pathname.includes("/view/");
  const isEditMode = location.pathname.includes("/edit/");

    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    class: "",
    admissionNumber: "",
    admissionDate: "",
    status: "Active",
  });

   const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,      // keep every other field as-is
      [name]: value, // overwrite just the one that changed
    }));
  };
  useEffect(() => {
  if (id) {
    fetch(`https://sachool-managemnt-backend.onrender.com/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          class: data.class || "",
          admissionNumber: data.admissionNumber || "",
          admissionDate: data.admissionDate ? data.admissionDate.split("T")[0] : "",
          status: data.status || "Active",
        });
      })
      .catch((err) => setError("Failed to load student: " + err.message));
  }
}, [id]);

  const handleSubmit = async () => {
    setError("");
    setSaving(true);
    try {
      const url = id
        ? `https://sachool-managemnt-backend.onrender.com/api/students/${id}`   // editing existing
        : "https://sachool-managemnt-backend.onrender.com/api/students";         // adding new
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend sends { message: "..." } on errors (e.g. duplicate admission number)
        throw new Error(data.message || "Failed to save student");
      }

      navigate("/dashboard/students/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
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
            sx={{ mb: 2 }}
            onClick={() => navigate("/dashboard/students/")}

          >
            Back To Students
          </Button>

          <Typography variant="h3" fontWeight="500">
  {isViewMode ? "Student Details" : isEditMode ? "Edit Student" : "Add New Student"}
</Typography>

          <Typography color="text.secondary">
            Fill in the details below to add a new student
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Close />}
            size="large"
          >
            Cancel
          </Button>

{isViewMode ? (
  <Button
    variant="contained"
    startIcon={<EditIcon />}
    size="large"
    onClick={() => navigate(`/dashboard/students/edit/${id}`)}
  >
    Edit
  </Button>
) : (
  <Button
    variant="contained"
    startIcon={<Save />}
    size="large"
    onClick={handleSubmit}
    disabled={saving}
  >
    {saving ? "Saving..." : "Save Student"}
  </Button>
)}
        </Box>
      </Box>

      {/* Main Card */}

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>

          {/* Personal Information */}

          <Box display="flex" alignItems="center" mb={2}>
            <Person color="primary" />
            <Typography
              ml={1}
              fontWeight="bold"
              color="primary"
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
                name="firstName"
                value={formData.firstName} onChange={handleChange} 
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName} onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender} onChange={handleChange}
                disabled={isViewMode}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth} onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>
          </Grid>

          {/* Contact */}

          <Box display="flex" alignItems="center" mt={5} mb={2}>
            <Phone color="primary" />
            <Typography
              ml={1}
              fontWeight="bold"
              color="primary"
              variant="h6"
            >
              Contact Information
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email} onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                disabled={isViewMode}

              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Address"
                name="address" value={formData.address} onChange={handleChange}
                disabled={isViewMode}
              />
            </Grid>
          </Grid>

          {/* Academic */}

          <Box display="flex" alignItems="center" mt={5} mb={2}>
            <School color="primary" />
            <Typography
              ml={1}
              fontWeight="bold"
              color="primary"
              variant="h6"
            >
              Academic Information
            </Typography>
          </Box>e

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Class / Grade"
                name="class" value={formData.class} onChange={handleChange}
                disabled={isViewMode}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </TextField>
            </Grid>

            

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Admission Date"
                 name="admissionDate" value={formData.admissionDate} onChange={handleChange}
                 disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Status"
                 name="status" value={formData.status} onChange={handleChange}
                 disabled={isViewMode}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Bottom Buttons */}

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
{isViewMode ? (
  <Button
    variant="contained"
    startIcon={<EditIcon />}
    size="large"
    onClick={() => navigate(`/dashboard/students/edit/${id}`)}
  >
    Edit
  </Button>
) : (
  <Button
    variant="contained"
    startIcon={<Save />}
    size="large"
    onClick={handleSubmit}
    disabled={saving}
  >
    {saving ? "Saving..." : "Save Student"}
  </Button>
)}
          </Box>
<Typography>DEBUG: gender = "{formData.gender}"</Typography>
        </CardContent>
      </Card>

    </Box>
  );
}