import { Button } from "@mui/material";

export default function SlideButton() {
  return (
    <Button
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "white",
        bgcolor: "#1976d2",
        px: 4,
        py: 1.5,

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          bgcolor: "#1565c0",
          transition: "0.4s",
        },

        "&:hover::before": {
          left: 0,
        },

        "& span": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      <span>Sign In</span>
    </Button>
  );
}