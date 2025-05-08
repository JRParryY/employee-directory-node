/**
 * Minimal server for deployment testing
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5202;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 