import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function AddClassDialog({ open, handleClose, onClassAdded }) {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNumber: "",
    maximumStudents: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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

      // reset form for next time the dialog opens
      setFormData({ className: "", section: "", classTeacher: "", roomNumber: "", maximumStudents: "" });

      if (onClassAdded) onClassAdded(); // tells parent page to refresh its class list
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", width: "100%" }}>Add New Class</DialogTitle>

      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          fullWidth
          label="Class Name"
          name="className"
          value={formData.className}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Class Teacher"
          name="classTeacher"
          value={formData.classTeacher}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Room Number"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Maximum Students"
          name="maximumStudents"
          type="number"
          value={formData.maximumStudents}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save Class"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}