import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";



function getStatusColor(status) {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
}

function stringAvatar(name) {
  return {
    children: name ? name.charAt(0).toUpperCase() : "?",
  };
}

export default function Admissions() {

  const [students, setStudents] = useState([]);

  function getStatusColor(status) {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  }

  function stringAvatar(name) {
    return {
      children: name[0],
    };
  }

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch(
        "https://sachool-managemnt-backend.onrender.com/api/admissions"
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchClass =
      classFilter === "All Classes" || s.className === classFilter;

    const matchStatus =
      statusFilter === "All Status" || s.status === statusFilter;

    return matchSearch && matchClass && matchStatus;
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#f3f5f9", minHeight: "100vh" }}>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Admissions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track student admissions
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/admissions/new")}
        >
          + New Admission
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">

          <TextField
            size="small"
            label="Search students"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={classFilter}
              label="Class"
              onChange={(e) => setClassFilter(e.target.value)}
            >

              <MenuItem value="All Classes">All Classes</MenuItem>
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
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

      </Stack>
    </Paper>

      {/* Table */ }
  <TableContainer component={Paper}>
    <Table>

      <TableHead>
        <TableRow sx={{ bgcolor: "#1565c0" }}>
          {[
            "#",
            "Student",
            "Class",
            "DOB",
            "Gender",
            "Status",
            "Actions",
          ].map((h) => (
            <TableCell
              key={h}
              sx={{ color: "#fff", fontWeight: 600 }}
            >
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {filtered.map((s) => (
          <TableRow key={s.id} hover>

            <TableCell>{s.id}</TableCell>

            <TableCell>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar {...stringAvatar(s.fullName)} />
                <Box>
                  <Typography fontWeight={600}>
                    {s.fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {s.email}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>

            <TableCell>
              <Chip label={s.className} size="small" />
            </TableCell>

            <TableCell>{s.dob}</TableCell>
            <TableCell>{s.gender}</TableCell>

            <TableCell>
              <Chip
                label={s.status}
                color={getStatusColor(s.status)}
                size="small"
              />
            </TableCell>

            <TableCell>
              <IconButton
                color="primary"
                onClick={() =>
                  navigate(`/dashboard/admissions/view/${s._id}`)
                }
              >
                <VisibilityIcon />
              </IconButton>

              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>

    </Table>
  </TableContainer>

    </Box >
  );
}