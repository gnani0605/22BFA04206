import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const UrlStats = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
    setLogs(stored);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Shortened URL Stats</Typography>
      {logs.length === 0 ? (
        <Typography>No data available.</Typography>
      ) : (
        <List>
          {logs.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" divider>
              <ListItemText
                primary={
                  <>
                    <strong>Original:</strong> {item.originalUrl}
                    <br />
                    <strong>Short:</strong> <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">{item.shortUrl}</a>
                  </>
                }
                secondary={`Time: ${new Date(item.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UrlStats;
