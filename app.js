const express = require('express')
const { auth } = require('express-openid-connect');
const app = express()
const port = 3000

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'IGnFnKVJGWMCBsw9qj4TuhY7CROa0LZX',
  issuerBaseURL: 'https://ichiraku.us.auth0.com'
};
app.use(auth(config));




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))