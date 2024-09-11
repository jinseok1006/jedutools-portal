import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function HeroHeader() {
  return (
    <Container
      sx={{
        py: { xs: 6, md: 9 },
        borderRadius: 4,
        textAlign: { xs: "center", md: "unset" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: "1" }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: "900" }}
          >
            함께 만드는 SW 교육 혁신
          </Typography>
          <Typography
            component="h2"
            mt={3}
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "text.secondary",
              lineHeight: 1.5,
            }}
          >
            JEduTools는 재학생들이 직접 참여하여 개발하는
            <br /> 전북대학교의 SW 교육을 위한 학습 플랫폼입니다.
          </Typography>
          <Typography
            component="h2"
            mt={2}
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "text.secondary",
              lineHeight: 1.5,
            }}
          >
            실제 사용하는 SW 도구 개발에 기여하며 실전적인 경험을 쌓고,
            <br />
            오픈소스 기여 문화를 통해 함께 성장합니다.
          </Typography>
        </Box>

        <Box
          component="img"
          src="img/hero.svg"
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "525px" },
          }}
        />
      </Box>
    </Container>
  );
}
