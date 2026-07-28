import {
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Dashboard() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
   const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    admissions: 0,
  });
const [overview, setOverview] = useState({
    enquiries: 0,
    pendingAdmissions: 0,
    approvedAdmissions: 0,
    classrooms: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  


const fetchDashboardData = async () => {
  try {
    const [
      studentsRes,
      teachersRes,
      classesRes,
      admissionsRes,
      enquiriesRes,
    ] = await Promise.all([
      fetch("https://sachool-managemnt-backend.onrender.com/api/students"),
      fetch("https://sachool-managemnt-backend.onrender.com/api/teachers"),
      fetch("https://sachool-managemnt-backend.onrender.com/api/classes"),
      fetch("https://sachool-managemnt-backend.onrender.com/api/admissions"),
      fetch("https://sachool-managemnt-backend.onrender.com/api/enquiries"),
    ]);

    const students = await studentsRes.json();
    const teachers = await teachersRes.json();
    const classes = await classesRes.json();
    const admissions = await admissionsRes.json();
    const enquiries = await enquiriesRes.json();

    setStats({
      students: students.data?.length || 0,
      teachers: teachers.data?.length || teachers.teachers?.length || 0,
      classes: classes.data?.length || classes.length || 0,
      admissions: admissions.data?.length || 0,
    });

    setOverview({
      enquiries: enquiries.data?.length || 0,
      pendingAdmissions:
        admissions.data?.filter((a) => a.status === "Pending").length || 0,
      approvedAdmissions:
        admissions.data?.filter((a) => a.status === "Approved").length || 0,
      classrooms: classes.data?.length || classes.length || 0,
    });
  } catch (err) {
    console.log(err);
  }
};



  return (
    <Box>

      {/* Welcome Section */}

      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#1976d2,#42a5f5)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          👋 Welcome Back, Admin
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          Here's what's happening at Saint Mary Thomas School today.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
              }}
            >
              <Typography variant="body2">
                Today's Date
              </Typography>

              <Typography variant="h6">
                {today}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
              }}
            >
              <Typography variant="body2">
                Academic Year
              </Typography>

              <Typography variant="h6">
                2026 - 2027
              </Typography>
            </Paper>
          </Grid>

        </Grid>
        <Grid container spacing={3}  sx={{
    mt: 2, // Adds space above the statistics cards
  }}>
  {[
    {
      title: "Students",
      value: stats.students,
      icon: <SchoolIcon color="primary" fontSize="large" />,
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: <PeopleIcon color="success" fontSize="large" />,
    },
    {
      title: "Classes",
      value: stats.classes,
      icon: <ClassIcon color="warning" fontSize="large" />,
    },
    {
      title: "Admissions",
      value: stats.admissions,
      icon: <HowToRegIcon color="error" fontSize="large" />,
    },
  ].map((card) => (
    <Grid item xs={12} sm={6} md={3} key={card.title}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </Box>

            {card.icon}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      </Paper>
      <Box sx={{ mt: 4 }}>
  <Typography
    variant="h5"
    fontWeight="bold"
    mb={3}
  >
    School Overview
  </Typography>

  <Grid container spacing={3}>

    {[
      {
        title: "Total Enquiries",
        value: overview.enquiries,
        icon: <QuestionAnswerIcon color="primary" fontSize="large" />,
      },

      {
        title: "Pending Admissions",
        value: overview.pendingAdmissions,
        icon: <PendingActionsIcon color="warning" fontSize="large" />,
      },

      {
        title: "Approved Admissions",
        value: overview.approvedAdmissions,
        icon: <VerifiedUserIcon color="success" fontSize="large" />,
      },

      {
        title: "Running Classes",
        value: overview.classrooms,
        icon: <MeetingRoomIcon color="secondary" fontSize="large" />,
      },

    ].map((item) => (

      <Grid item xs={12} sm={6} md={3} key={item.title}>

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 2,
            transition: ".3s",

            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
            },
          }}
        >
          <CardContent>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >

              <Box>

                <Typography color="text.secondary">
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {item.value}
                </Typography>

              </Box>

              {item.icon}

            </Box>

          </CardContent>
        </Card>

      </Grid>

    ))}

  </Grid>
</Box>

    </Box>
  );
}