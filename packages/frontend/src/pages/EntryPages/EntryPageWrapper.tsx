import { Box, Container, Typography } from '@mui/material';

import type { FormEventHandler, ReactNode } from 'react';

type EntryPageWrapperProps = Readonly<{
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}>;

export const EntryPageWrapper = ({
  title,
  onSubmit,
  children,
}: EntryPageWrapperProps) => (
  <Container maxWidth="xs">
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ position: 'relative', mt: 2 }}
      >
        {children}
      </Box>
    </Box>
  </Container>
);
