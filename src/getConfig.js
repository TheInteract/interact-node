const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const RequestAsync = require('./RequestAsync')
const config = require('config')

const getConfig = (customerCode, { deviceCode, hashedUserId } = {}) => {
  // return RequestAsync.request({
  //   method: 'POST',
  //   url: config.server.url,
  //   body: {
  //     customerCode: customerCode,
  //     userIdentity: omitBy({ deviceCode, hashedUserId }, isUndefined)
  //   },
  //   json: true,
  //   timeout: 10000
  // })

  return Promise.resolve({
    featureList: [
      { name: 'feature-1', version: 'A' },
      { name: 'feature-2', version: 'B' },
    ],
    deviceCode: 'device-1234',
    initCode: 'console.log(\'hello world\')'
  })
}

module.exports = getConfig
