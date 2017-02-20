var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.post('/api/event/oninit', function (request, response) {
  response.json({
    featureList: [
      { name: 'feature-1', version: 'A' },
      { name: 'feature-2', version: 'B' },
    ],
    deviceCode: 'device-1234',
    initCode: 'console.log(\'hello world\')'
  })
})

app.listen(9000, function () {
  console.log('Mock server listening on port 9000!')
})
