import React from 'react';
import ShortenForm from './components/ShortenForm';
import UrlStats from './components/UrlStats';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        AffordMed URL Shortener
      </Typography>
      <ShortenForm />
      <UrlStats />
    </Container>
  );
}

export default App;
