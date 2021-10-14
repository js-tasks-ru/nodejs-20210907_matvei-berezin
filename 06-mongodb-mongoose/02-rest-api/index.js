const app = require('./app');

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
  console.log('process.env.NODE_ENV : ', process.env.NODE_ENV);
});
