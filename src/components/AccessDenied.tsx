import { Box, Typography } from "@mui/material";

export default function AccessDenied() {
  return (
    <Box sx={{ textAlign: "center" }} mt={5}>
      <Typography variant="h4" fontWeight="bold">
        접근 제한
      </Typography>
      <Typography>이 페이지에 접근할 권한이 없습니다.</Typography>
      <Typography>자세한 사항은 관리자에게 문의하세요</Typography>
    </Box>
  );
}
