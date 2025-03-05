import { Alert, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function MaintenanceBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', mt: '-1px' }}>
      <Alert 
        icon={<ConstructionIcon />}
        severity="warning"
        sx={{
          borderRadius: 0,
          justifyContent: 'center',
          py: 1.5,
          '& .MuiAlert-message': {
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 1
          },
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
            marginRight: 1,
            mt: isMobile ? 0.5 : 0
          }
        }}
      >
        <Typography 
          component="span" 
          sx={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 1,
            fontWeight: 500,
            textAlign: isMobile ? 'left' : 'center'
          }}
        >
          현재 JEduTools 서비스가 공사 중입니다. 일부 기능이 정상적으로 동작하지 않을 수 있습니다.
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 0.5, 
              color: 'primary.main', 
              fontWeight: 600,
              mt: isMobile ? 0.5 : 0
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
            3월 12일 이후 오픈 예정입니다
          </Box>
        </Typography>
      </Alert>
    </Box>
  );
} 