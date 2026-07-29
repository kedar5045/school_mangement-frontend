import {
  Box, Grid, Paper, Typography, Button, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material"
import { useState, useEffect, useCallback } from "react";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  // Holds the 4 stat card numbers
  const [stats, setStats] = useState({ totalStudents: 0, boys: 0, girls: 0, newThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Fetches the list, optionally filtered
const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (classFilter) params.append("class", classFilter);

      const res = await fetch(`https://sachool-managemnt-backend.onrender.com/api/students?${params.toString()}`);
      const data = await res.json();
      setStudents(data.students);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
}, [search, classFilter]);
  const fetchStats = async () => {
    try {
      const res = await fetch("https://sachool-managemnt-backend.onrender.com/api/students/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  // Runs ONCE when the page first loads (empty [] dependency array)
  useEffect(() => {
    fetchStudents();
    fetchStats();
  },  [fetchStudents]);

 
  return (



    <Box sx={{ p: 4, bgcolor: "#f5f7fb", minHeight: "100%" }}>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight={500}>
            Student Management
          </Typography>

          <Typography color="text.secondary">
            Manage and view all student information
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          
          

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/dashboard/students/add")}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      {/* Statistics */}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}><StatCard title="Total Students" value={stats.totalStudents} /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Boys" value={stats.boys} /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Girls" value={stats.girls} /></Grid>
        <Grid item xs={12} md={3}><StatCard title="New This Month" value={stats.newThisMonth} /></Grid>
      </Grid>

      {/* Search Filters */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField select fullWidth value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <MenuItem value="">All Classes</MenuItem>
              <MenuItem value="8">8th</MenuItem>
              <MenuItem value="9">9th</MenuItem>
              <MenuItem value="10">10th</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button fullWidth variant="contained" sx={{ height: 56 }} onClick={fetchStudents}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Real table */}
      <Paper sx={{ mt: 4, borderRadius: 3, overflow: "hidden" }}>
       

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <PersonIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Name
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <WcIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Gender
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <SchoolIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Class
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <BadgeIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Admission No.
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <EmailIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Email
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <PhoneIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Phone
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                  <VerifiedUserIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Status
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: 15 }}
                >
                  <SettingsIcon sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} align="center">Loading...</TableCell></TableRow>
              ) : students.length === 0 ? (
                <TableRow><TableCell colSpan={7} align="center">No students found</TableCell></TableRow>
              ) : (
                students.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>{s.firstName} {s.lastName}</TableCell>
                    <TableCell>{s.gender}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.admissionNumber}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phoneNumber}</TableCell>
                    <TableCell>{s.status}</TableCell>

                    <TableCell align="center">
                      <IconButton onClick={() => navigate(`/dashboard/students/view/${s._id}`)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => navigate(`/dashboard/students/edit/${s._id}`)}>
                        <EditIcon color="action" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
function StatCard({ title, value }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        borderLeft: "5px solid #1976d2",
      }}
    >
      <Typography color="text.secondary">
        {title}
      </Typography>

      <Typography
        variant="h4"
        color="primary"
        fontWeight={600}
      >
        {value}
      </Typography>
    </Paper>
  );
}