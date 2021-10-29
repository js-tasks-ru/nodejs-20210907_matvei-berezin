const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../../myConfig/secret.env')});

const app = require('./app');

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
