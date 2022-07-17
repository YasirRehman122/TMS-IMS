const env  = require('./env');
const express = require('express');
const app = express();
const indexRouter = require('./api/routes/index');

const port = process.env.PORT || 4000;


app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`IMS service listening at http://localhost:${port}`);
});


module.exports = app;