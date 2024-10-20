// server.js
const express = require('express');
const path = require('path');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// API route handler
app.use('/api', require('./api'));

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../socnet/dist')));

// Serve index.html for all other routes (Vue SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../socnet/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
