'use strict'

const find = require('lodash/find')
const User = require('./src/User')
const getConfig = require('./src/getConfig')
const config = require('config')

const interact = {}

interact.USERS = []

interact.express = (customerCode, hashedUserId = '') => {
  return (request, response, next) => {
    const currentDeviceCode = request.cookies[config.cookies.name]
    console.log(currentDeviceCode)
    getConfig(customerCode, { deviceCode: currentDeviceCode, hashedUserId })
      .then((result) => {
        const { featureList, deviceCode, initCode } = result
        interact.USERS.push(new User(deviceCode, hashedUserId, featureList))
        interact.INIT_CODE = initCode

        response.cookie(config.cookies.name, deviceCode)
      })
      .finally(() => {
        next()
      })
  }
}

interact.findUser = (hashedUserId) => {
  return find(interact.USERS, user => user.getHashedUserId() === hashedUserId)
}

module.exports = interact
