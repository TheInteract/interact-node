var interact = require('..')
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
app.use(interact.express('IC9-55938-6', 'hashed-1234'))

app.get('/', function (request, response) {
  // Cookies that have not been signed
  console.log('Cookies: ', request.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', request.signedCookies)

  // Access USERS
  console.log('USERS', interact.USERS)
  console.log('initCode', interact.INIT_CODE)

  response.send(`
    <h1>Hello World</h1>
    <script>${interact.INIT_CODE}</script>
  `)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
