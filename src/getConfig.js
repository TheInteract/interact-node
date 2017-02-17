const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const RequestAsync = require('./RequestAsync')
const config = require('config')

const getConfig = (customerCode, { deviceCode, hashedUserId } = {}) => {
  return RequestAsync.request({
    method: 'POST',
    url: config.server.url,
    body: {
      customerCode: customerCode,
      userIdentity: omitBy({ deviceCode, hashedUserId }, isUndefined)
    }
  })
}

module.exports = getConfig
