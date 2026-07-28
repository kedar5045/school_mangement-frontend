
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";


export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
  fetchTeachers();
}, []);

const fetchTeachers = async () => {
  try {
    const response = await fetch("https://sachool-managemnt-backend.onrender.com/api/teachers");
    const data = await response.json();

    if (data.success) {
      setTeachers(data.teachers);
    }
  } catch (err) {
    console.log(err);
  }
};

  const navigate = useNavigate();
  const totalTeachers = teachers.length;

const activeTeachers = teachers.filter(
  (teacher) => teacher.status === "Active"
).length;

const onLeaveTeachers = teachers.filter(
  (teacher) => teacher.status === "On Leave"
).length;

const departments = [
  ...new Set(teachers.map((teacher) => teacher.department)),
].length;
  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Teachers
          </Typography>

          <Typography color="text.secondary">
            Manage and view all teachers
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ px: 3 }}
          onClick={() => navigate("/dashboard/teachers/add")}
        >
          Add Teacher
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Total Teachers
            </Typography>
            <Typography variant="h3">{totalTeachers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Active Teachers
            </Typography>
            <Typography variant="h3">{activeTeachers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              On Leave
            </Typography>
            <Typography variant="h3">{onLeaveTeachers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Departments
            </Typography>
            <Typography variant="h3">{departments}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search teacher..."
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField select fullWidth defaultValue="">
              <MenuItem value="">
                All Departments
              </MenuItem>
              <MenuItem value="Maths">Mathematics</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField select fullWidth defaultValue="">
              <MenuItem value="">
                All Status
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Leave">On Leave</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper sx={{ overflow: "hidden" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Teacher</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Qualification</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.employeeId}>
                <td style={tdStyle}>{teacher.employeeId}</td>

                <td style={tdStyle}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar />

                    <Box>
                      <Typography fontWeight="bold">
                        <Typography fontWeight="bold">
  {teacher.firstName} {teacher.lastName}
</Typography>
                      </Typography>

                      <Typography variant="body2">
                        {teacher.phone}
                      </Typography>
                    </Box>
                  </Box>
                </td>

                <td style={tdStyle}>{teacher.department}</td>

                <td style={tdStyle}>
                  {teacher.qualification}
                </td>

                <td style={tdStyle}>
                  {teacher.experience}
                </td>

                <td style={tdStyle}>
                  <Chip
                    label={teacher.status}
                    color={
                      teacher.status === "Active"
                        ? "success"
                        : "warning"
                    }
                  />
                </td>

                <td style={tdStyle}>
                  <IconButton>
                    <IconButton
  onClick={() =>
    navigate(`/dashboard/teachers/view/${teacher._id}`)
  }
>
  <VisibilityIcon />
</IconButton>
                  </IconButton>

                  <IconButton
  onClick={() =>
    navigate(`/dashboard/teachers/edit/${teacher._id}`)
  }
>
  <EditIcon />
</IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};