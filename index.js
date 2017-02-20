const find = require('lodash/find')
const User = require('./src/User')
const getConfig = require('./src/getConfig')
const config = require('config')

const interact = {}

interact.USERS = []

interact.express = (customerCode, hashedUserId = '') => {
  return (request, response, next) => {
    const currentDeviceCode = request.cookies[config.cookies.name]
    getConfig(customerCode, { currentDeviceCode, hashedUserId })
      .then(({ featureList, deviceCode, initCode }) => {
        interact.USERS.push(new User(deviceCode, hashedUserId, featureList))
        interact.INIT_CODE = initCode

        response.cookie(config.cookies.name, deviceCode)
        next()
      })
  }
}

interact.findUser = (hashedUserId) => {
  return find(interact.USERS, user => user.getHashedUserId() === hashedUserId)
}

module.exports = interact
