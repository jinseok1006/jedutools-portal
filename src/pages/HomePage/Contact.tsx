import Chat from "@mui/icons-material/Chat";
import Email from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export default function Contact() {
  return (
    <Container sx={{ my: 5, py: 5 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        gap={3}
      >
        <Typography variant="h5" fontWeight="bold">
          문의 및 안내
        </Typography>
        <Typography variant="body1">
          궁금한 점이 있거나 더 많은 정보를 원하시면 아래 방법으로 연락하세요.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Chat />}
            href="https://open.kakao.com/o/gXXXXX" // 카카오톡 오픈채팅 링크
            target="_blank"
            disabled
          >
            카카오톡 오픈채팅방
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Email />}
            href={`mailto:${ADMIN_EMAIL}`}
          >
            문의 메일 보내기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
