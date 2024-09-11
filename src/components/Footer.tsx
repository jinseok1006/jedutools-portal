import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        py: 3,
        mt: 5,
      }}
    >
      <Container>
        {/* 로고 영역 */}
        <Box display="flex" justifyContent="center" gap={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <img src="img/jedutools.png" alt="Logo" width="32px" />
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="primary.main"
            >
              JEduTools
            </Typography>
          </Box>

          <Link
            href="https://swuniv.jbnu.ac.kr/"
            target="_blank"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="img/swuniv.png" // 로고 이미지 경로
              alt="Related Organization"
              style={{ height: "40px" }} // 로고 크기 조정
            />
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" gap={2} alignItems="center">
          {/* <Link href="#" color="inherit" underline="hover">
              GitHub
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Docs
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link> */}
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" align="center" color="text.secondary">
          본 서비스는 2024 SW 교육 플랫폼 JEduTools 운영 프로젝트로써,
          전북대학교 SW중심대학사업단의 지원으로 제작되었습니다.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          ⓒ 2024 JEduTools. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
