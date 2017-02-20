var interact = require('..')
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
app.use(interact.express('IC9-55938-5', 'hashed-1234'))

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

// mock
// app.post('/api/event/oninit', function (request, response) {
//   response.json({
//     featureList: [
//       { name: 'feature-1', version: 'A' },
//       { name: 'feature-2', version: 'B' },
//     ],
//     deviceCode: 'device-1234',
//     initCode: 'console.log(\'hello world\')'
//   })
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
