const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Hello from Jenkins Docker Pipeline! ENVIRONMENT=${process.env.ENVIRONMENT}, NODE_ENV=${process.env.NODE_ENV}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
