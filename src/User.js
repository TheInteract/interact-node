const Feature = require('./Feature')

class User {
  constructor (identity, hashedUserId, featureList = []) {
    this.identity = identity
    this.hashedUserId = hashedUserId
    this.featureList = featureList.map(feature => (
      new Feature(feature.name, feature.version)
    ))
  }

  getFeature (featureName) { return this.featureList[featureName] }
  getHashedUserId () { return this.hashedUserId }
}

module.exports = User
