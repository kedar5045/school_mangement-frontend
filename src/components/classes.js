import { useState, useEffect, useCallback } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, TextField, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolIcon from "@mui/icons-material/School";

export default function Classes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  // Real data from the backend, replaces the hardcoded `rows` array
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Dialog form state
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNumber: "",
    maximumStudents: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchClasses = useCallback(async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const res = await fetch(
      `https://sachool-managemnt-backend.onrender.com/api/classes?${params.toString()}`
    );
    const data = await res.json();
    setRows(data);
  } catch (err) {
    console.error("Failed to fetch classes:", err);
  } finally {
    setLoading(false);
  }
}, [search]);

  // Runs once when the page loads
 useEffect(() => {
  fetchClasses();
}, [fetchClasses]);

  const totalClasses = rows.length;
  const totalStudents = rows.reduce(
    (total, row) => total + (Number(row.maximumStudents) || 0),
    0
  );
  const totalSections = new Set(rows.map((row) => `${row.className}-${row.section}`)).size;
  const totalTeachers = new Set(rows.map((row) => row.classTeacher).filter(Boolean)).size;

  const stats = [
    { title: "Total Classes", value: totalClasses, icon: <MenuBookIcon color="primary" /> },
    { title: "Total Sections", value: totalSections, icon: <ApartmentIcon color="primary" /> },
    { title: "Total Students (capacity)", value: totalStudents, icon: <GroupsIcon color="primary" /> },
    { title: "Total Teachers", value: totalTeachers, icon: <PersonIcon color="primary" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("https://sachool-managemnt-backend.onrender.com/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save class");

      setFormData({ className: "", section: "", classTeacher: "", roomNumber: "", maximumStudents: "" });
      setOpen(false);
      fetchClasses(); // refresh the table/cards with the newly added class
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="300"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, fontFamily: "sans-serif" }}
        >
          Class Management
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2 }} onClick={() => setOpen(true)}>
          Add Class
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, borderLeft: "5px solid #1976d2" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {item.icon}
                  <Box>
                    <Typography color="text.secondary">{item.title}</Typography>
                    <Typography variant="h4" color="primary">{item.value}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search */}
      <Paper sx={{ p: 2, mt: 4, mb: 3, borderRadius: 3 }}>
        <TextField
          fullWidth
          placeholder="Search Class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchClasses()}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
        />
      </Paper>

      {loading ? (
        <Typography sx={{ mt: 2 }}>Loading classes...</Typography>
      ) : rows.length === 0 ? (
        <Typography sx={{ mt: 2 }} color="text.secondary">No classes found.</Typography>
      ) : isMobile ? (
        <Box>
          {rows.map((row) => (
            <Card key={row._id} sx={{ mb: 2, borderRadius: 3, boxShadow: 2, borderLeft: "5px solid #1976d2" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Class {row.className} - {row.section}
                </Typography>
                <Typography>Teacher: {row.classTeacher || "-"}</Typography>
                <Typography>Max Students: {row.maximumStudents || "-"}</Typography>
                <Typography>Room: {row.roomNumber || "-"}</Typography>
                <Box mt={2}>
                  <IconButton color="primary"><VisibilityIcon /></IconButton>
                  <IconButton color="primary"><EditIcon /></IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(90deg, #1976d2, #42a5f5)" }}>
                {[
                  { icon: <SchoolIcon fontSize="small" />, text: "CLASS" },
                  { icon: <ApartmentIcon fontSize="small" />, text: "SECTION" },
                  { icon: <PersonIcon fontSize="small" />, text: "TEACHER" },
                  { icon: <GroupsIcon fontSize="small" />, text: "STUDENTS PRESENT" },
                  { icon: <ApartmentIcon fontSize="small" />, text: "ROOM NO." },
                  { icon: <EditIcon fontSize="small" />, text: "ACTIONS" },
                ].map((item) => (
                  <TableCell key={item.text} sx={{ color: "white", fontWeight: 700, fontSize: "0.95rem", borderBottom: "none", fontFamily: "Inter, sans-serif" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {item.icon}
                      {item.text}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  hover
                  sx={{
                    "&:nth-of-type(even)": { backgroundColor: "#f8fafc" },
                    "&:hover": { backgroundColor: "#e3f2fd", transition: "0.2s" },
                  }}
                >
                  <TableCell>{row.className}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.classTeacher || "-"}</TableCell>
                  <TableCell>{row.maximumStudents || "-"}</TableCell>
                  <TableCell>{row.roomNumber || "-"}</TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ bgcolor: "#e3f2fd", mr: 1 }}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: "#fff3e0" }}>
                      <EditIcon color="warning" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#1976d2", color: "white", py: 2 }}>
          <SchoolIcon />
          Add New Class
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, padding: 3 }}>
            {error && <Typography color="error">{error}</Typography>}

            <TextField
              label="Class Name" placeholder="10th" fullWidth
              name="className" value={formData.className} onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Section" placeholder="A" fullWidth
              name="section" value={formData.section} onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Class Teacher" placeholder="John Smith" fullWidth
              name="classTeacher" value={formData.classTeacher} onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Room Number" placeholder="205" fullWidth
              name="roomNumber" value={formData.roomNumber} onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              label="Maximum Students" placeholder="40" fullWidth type="number"
              name="maximumStudents" value={formData.maximumStudents} onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save Class"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}