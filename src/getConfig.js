const _ = require('lodash')
const RequestAsync = require('./RequestAsync')
const config = require('config')

const getConfig = (customerCode, { deviceCode, hashedUserId } = {}) => {
  return RequestAsync.request({
    method: 'POST',
    url: config.server.url,
    body: {
      customerCode: customerCode,
      userIdentity: _.omitBy({ deviceCode, hashedUserId }, _.isUndefined)
    }
  })
}

module.exports = getConfig
