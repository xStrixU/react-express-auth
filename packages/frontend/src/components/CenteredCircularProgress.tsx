import { Box, CircularProgress } from '@mui/material';

export const CenteredCircularProgress = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={70} />
  </Box>
);
