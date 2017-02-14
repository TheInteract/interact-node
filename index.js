class User {
  constructor (identity, hashedUserId, featureList = []) {
    this.identity = identity
    this.hashedUserId = hashedUserId
    this.featureList = featureList.map(feature => (
      new Feature(feature.name, feature.version)
    ))
  }

  getHashedUserId = () => this.hashedUserId
  getFeature = (featureName) => featureList[featureName]
}

class Feature {
  constructor (version) { this.version = version }
  isA = () => this.version === 'A'
  isB = () => this.version === 'B'
}

const interact = {}

getConfig = (customerCode, { identity, hashedUserId } = {}) => {
  // request.js
}

interact.USERS = []

interact.express = (customerCode, hashedUserId = '') => {
  return (request, response, next) => {
    const identity = request.cookies['interact-unique-identity']
    const { featureList, identity, initCode } = getConfig(customerCode, {
      identity,
      hashedUserId
    })

    interact.USERS.push(new User(identity, hashedUserId, featureList))

    if (!identity) request.cookies = `interact-unique-identity=${identity}`
    next()
  }
}

interact.koa = (customerCode, hashedUserId = '') => {
  return (context, next) => {
    const identity = context.headers.cookies['interact-unique-identity']
    const { featureList, identity, initCode } = getConfig(customerCode, {
      identity,
      hashedUserId
    })

    interact.USERS.push(new User(identity, hashedUserId, featureList))
    if (!identity) context.setCookies = `interact-unique-identity=${identity}`
    next()
  }
}

interact.findUser = (hashedUserId) => {
  return _.find(interact.USERS, user => user.getHashedUserId() === hashedUserId)
}

module.exports interact
