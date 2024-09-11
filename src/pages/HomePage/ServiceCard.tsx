import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import GitHubIcon from "@mui/icons-material/GitHub";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

interface ServiceCardProps {
  title: string; // 서비스의 제목
  description: string; // 서비스 설명
  imgSrc: string; // 이미지 경로
  link: string; // 서비스 링크
  github?: string | null; // GitHub 저장소 (optional)
  docs?: string | null; // 문서 링크 (optional)
}
export default function ServiceCard({
  title,
  description,
  imgSrc,
  link,
  github,
  docs,
}: ServiceCardProps) {
  return (
    <Card
      elevation={0}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Link href={link} underline="none" target="_blank" rel="noopener">
        <CardMedia
          component="img"
          height="160px"
          src={imgSrc}
          alt={title}
          sx={{
            border: "1px solid",
            borderRadius: 1.8,
            borderColor: "grey.300",
            objectFit: "contain",
          }}
        />
      </Link>
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          {description}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={3}
          mt={2}
          sx={{ flex: 1, alignItems: "flex-end" }}
        >
          <Button
            variant="contained"
            href={github ?? "#"}
            disabled={!github}
            target="_blank"
            rel="noopener"
            color="github"
            sx={{ flex: 1 }}
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
          <Button
            variant="contained"
            href={docs ?? "#"}
            disabled={!docs}
            target="_blank"
            rel="noopener"
            color="secondary"
            sx={{ flex: 1 }}
            startIcon={<LibraryBooksIcon />}
          >
            Docs
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
