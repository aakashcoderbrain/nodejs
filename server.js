const express = require('express');
const app = express();
const routes = require('./routes/index');
const PORT = 3020;

app.use(express.json());

app.use('/', routes);
app.use('/login', routes);
app.use('/signup', routes);


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
