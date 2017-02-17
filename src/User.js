const Feature = require('./Feature')

class User {
  constructor (deviceCode, hashedUserId, featureList = []) {
    this.deviceCode = deviceCode
    this.hashedUserId = hashedUserId
    this.featureList = featureList.reduce((list, feature) => {
      list[feature.name] = new Feature(feature.name, feature.version)
      return list
    }, {})
  }

  getDeviceCode () { return this.deviceCode }
  getHashedUserId () { return this.hashedUserId }
  getFeature (featureName) { return this.featureList[featureName] }
}

module.exports = User
