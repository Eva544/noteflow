import { Box, Typography } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";

function AppLogo() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        display: "flex",
        alignItems: "center",
        gap: 1,
        zIndex: 10,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Note Flow
      </Typography>
      <EditSquareIcon sx={{ fontSize: 30 }} />
    </Box>
  );
}

export default AppLogo;
