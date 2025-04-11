import { Alert, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function MaintenanceBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", mt: "-1px" }}>
      <Alert
        icon={<ConstructionIcon />}
        severity="warning"
        sx={{
          borderRadius: 0,
          justifyContent: "center",
          py: 1.5,
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiAlert-icon": {
            fontSize: "1.5rem",
            marginRight: 1,
          },
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>
          <span style={{ fontWeight: "bold" }}>2025년 4월 12일(토) </span>
          교내 네트워크 공사로 인해 서비스 이용이 간헐적으로 중단될 수 있습니다.
        </Typography>
      </Alert>
    </Box>
  );
}
