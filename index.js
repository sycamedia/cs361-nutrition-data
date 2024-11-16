/*
Express setup based on example from "Express: Hello World Example,"
accessed 16 November from https://expressjs.com/en/starter/hello-world.html
*/

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());    // Parses JSON request bodies

app.post('/search', (req, res) => {
  const {searchQuery} = req.body;

  res.status(201).json({
    message: `Received query: ${searchQuery}`
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
