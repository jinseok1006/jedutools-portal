import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LaunchIcon from '@mui/icons-material/Launch';
import EngineeringIcon from '@mui/icons-material/Engineering';

// Project 인터페이스를 재사용
import { Project } from "./Projects";

type ServiceCard2Props = Project & {
  onActionClick?: () => void;
  actionButtonColor?: string;
};

export default function ServiceCard2({
  title,
  description,
  imgSrc,
  github,
  docs,
  action,
  link,
  onActionClick,
  actionButtonColor
}: ServiceCard2Props) {
  
  const handleServiceClick = () => {
    if (action) {
      action();
    } else if (onActionClick) {
      onActionClick();
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  const isJflow = title === "Jflow";

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        mb: 5, 
        boxShadow: 0,
        borderRadius: 2, 
        overflow: 'hidden',
        height: '210px',
        backgroundColor: '#FFFAFB',
        border: 'none'
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 300, objectFit: 'contain', pl: 2 }}
        image={imgSrc}
        alt={`${title} Workflow`}
      />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        p: 3,
        justifyContent: 'space-between'
      }}>
        {/* 텍스트 영역 */}
        <Box>
          <Typography component="div" variant="h5" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
        
        {/* 버튼 영역 - 가로로 배치 */}
        <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleServiceClick}
            disabled={!link && !action && !onActionClick || isJflow}
            startIcon={<EngineeringIcon />}
            sx={{
                flex: 3,
                ...(actionButtonColor ? {
                  backgroundColor: actionButtonColor,
                  '&:hover': {
                    backgroundColor: actionButtonColor,
                    opacity: 0.9
                  }
                } : {})
              }}
          >
            준비중
          </Button>
          
          <Button
            variant="contained"
            href={github ?? "#"}
            disabled={!github || isJflow}
            target="_blank"
            rel="noopener"
            color="github"
            startIcon={<GitHubIcon />}
            sx={{ flex: 1 }}
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
            startIcon={<LibraryBooksIcon />}
            sx={{ flex: 1 }}
          >
            Docs
          </Button>
        </Box>
      </Box>
    </Card>
  );
}