const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Mahnke Motorsports backend is live!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
