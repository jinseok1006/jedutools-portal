import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import GitHubIcon from "@mui/icons-material/GitHub";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LaunchIcon from '@mui/icons-material/Launch';
import LockIcon from '@mui/icons-material/Lock';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from '@mui/icons-material/Home';

import type { Project } from "./Projects";

interface ServiceCardProps extends Project {
  actionButtonColor?: string; // 추가: 버튼 색상 커스터마이징을 위한 prop
}

export default function ServiceCard({
  title,
  description,
  imgSrc,
  link,
  github,
  docs,
  action,
  actionButtonColor,
}: ServiceCardProps) {
  const handleServiceClick = () => {
    if (action && !["JIGSSO", "SLOT", "JEduTools Portal", "JCODE"].includes(title)) {
      action();
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <Card
      elevation={0}
      sx={{ 
        height: 430,
        display: "flex", 
        flexDirection: "column"
      }}
    >
      <Box 
        sx={{ 
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1.5,
          bgcolor: 'background.paper'
        }}
      >
        <ServiceCardImage
          title={title}
          imgSrc={imgSrc}
          link={link}
          action={["JIGSSO", "SLOT", "JEduTools Portal", "JCODE", "Grafana"].includes(title) ? undefined : action}
        />
      </Box>
      <CardContent 
        sx={{ 
          flex: 1,
          display: "flex", 
          flexDirection: "column",
          gap: 1.5,
          p: 2,
          pb: 1.5
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="div"
            textAlign="center"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{
              mt: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              height: '4.5em',
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.5
        }}>
          <Button
            variant="contained"
            onClick={handleServiceClick}
            disabled={!link && !action || ["JIGSSO", "SLOT", "JEduTools Portal", "JCODE", "Grafana"].includes(title)}
            color="primary"
            fullWidth
            startIcon={
              title === "JIGSSO" ? <LockIcon /> 
              : title === "SLOT" || title === "JCODE" ? <EngineeringIcon />
              : title === "JEduTools Portal" ? <HomeIcon />
              : null
            }
            endIcon={["JIGSSO", "SLOT", "JEduTools Portal", "JCODE", "Grafana"].includes(title) ? null : <LaunchIcon />}
            sx={actionButtonColor ? {
              backgroundColor: actionButtonColor,
              '&:hover': {
                backgroundColor: actionButtonColor,
                opacity: 0.9
              }
            } : {}}
          >
            {title === "JIGSSO" 
              ? "JEduTools 로그인 서비스" 
              : title === "SLOT" || title === "JCODE"
                ? "서비스 준비중" 
              : title === "Grafana"
                ? "서비스 점검중"
              : title === "JEduTools Portal"
                ? "현재 페이지입니다"
              : "서비스 바로가기"}
          </Button>
          
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
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
        </Box>
      </CardContent>
    </Card>
  );
}

type ServiceCardImageProps = Pick<
  Project,
  "imgSrc" | "link" | "title" | "action"
>;

function ServiceCardImage({
  title,
  imgSrc,
  link,
  action,
}: ServiceCardImageProps) {
  const imageContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '12px',
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: 1.8,
  };

  const imageStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain' as const,
  };

  if (link) {
    return (
      <Link 
        href={link} 
        underline="none" 
        target="_blank" 
        rel="noopener"
        sx={{ 
          ...imageContainerStyles,
          '&:hover': {
            borderColor: 'primary.main',
          }
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={imageStyles}
        />
      </Link>
    );
  }

  return (
    <Box
      sx={{
        ...imageContainerStyles,
        cursor: action ? 'pointer' : 'default',
        '&:hover': action ? {
          borderColor: 'primary.main',
        } : {}
      }}
      onClick={action}
    >
      <img
        src={imgSrc}
        alt={title}
        style={imageStyles}
      />
    </Box>
  );
}