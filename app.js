const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, FROM Gaurav!!!');
});

// Bind to 0.0.0.0 instead of localhost
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on http://0.0.0.0:${port}`);
});
