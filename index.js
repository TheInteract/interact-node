const find = require('lodash/find')
const User = require('./src/User')
const getConfig = require('./src/getConfig')
const config = require('config')

const interact = {}

interact.USERS = []

interact.express = (customerCode, hashedUserId = '') => {
  return (request, response, next) => {
    const currentDeviceCode = request.cookies[config.cookies.name]
    const { featureList, deviceCode, initCode } = getConfig(customerCode, {
      currentDeviceCode,
      hashedUserId
    })

    interact.USERS.push(new User(deviceCode, hashedUserId, featureList))
    interact.INIT_CODE = initCode

    if (!deviceCode) request.cookies = `${config.cookies.name}=${deviceCode}`
    next()
  }
}

interact.koa = (customerCode, hashedUserId = '') => {
  return (context, next) => {
    const currentDeviceCode = context.headers.cookies[config.cookies.name]
    const { featureList, deviceCode, initCode } = getConfig(customerCode, {
      currentDeviceCode,
      hashedUserId
    })

    interact.USERS.push(new User(deviceCode, hashedUserId, featureList))
    interact.INIT_CODE = initCode

    if (!deviceCode) context.setCookies = `${config.cookies.name}=${deviceCode}`
    next()
  }
}

interact.findUser = (hashedUserId) => {
  return find(interact.USERS, user => user.getHashedUserId() === hashedUserId)
}

module.exports = interact
