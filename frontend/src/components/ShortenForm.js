import React, { useState } from 'react';
import { TextField, Button, Paper, Stack, Typography } from '@mui/material';
import { Log } from './logging'; // assuming it's in the same folder

const ShortenForm = () => {
  const [url, setUrl] = useState('');
  const [expiry, setExpiry] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();

    const payload = {
      originalUrl: url,
      expiry: expiry || 10,
      customCode: customCode || undefined,
    };

    try {
      const response = await fetch('http://20.244.56.144/url-shortener/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <YOUR_TOKEN_HERE>',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const shortUrl = `https://yourfrontend.com/r/${data.shortCode}`;
        setShortenedUrl(shortUrl);
        await Log("frontend", "info", "shortener", "Short URL created", { shortCode: data.shortCode });

        const logs = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
        logs.push({ originalUrl: url, shortUrl, timestamp: new Date().toISOString() });
        localStorage.setItem("shortenedUrls", JSON.stringify(logs));
      } else {
        alert(data.message || "Shortening failed.");
        await Log("frontend", "error", "shortener", "Failed to shorten URL", { error: data.message });
      }
    } catch (err) {
      await Log("frontend", "fatal", "shortener", "Unexpected error", { error: err.message });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Shorten Your URL</Typography>
      <form onSubmit={handleShorten}>
        <Stack spacing={2}>
          <TextField
            label="Original URL"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
          <TextField
            label="Expiry in Minutes (default 10)"
            type="number"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            fullWidth
          />
          <TextField
            label="Custom Short Code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">Shorten</Button>
        </Stack>
      </form>

      {shortenedUrl && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Short URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
        </Typography>
      )}
    </Paper>
  );
};

export default ShortenForm;
