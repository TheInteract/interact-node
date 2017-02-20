'use strict'

const chai = require('chai')
const User = require('./User')
const Feature = require('./Feature')

describe('User', () => {
  const mockDeviceCode = 'device-code-1'
  const mockHashedUserId = 'hashed-user-id-1'
  const mockFeatureList = [
    { name: 'feature-1', version: 'A' },
    { name: 'feature-2', version: 'A' },
    { name: 'feature-3', version: 'B' },
  ]
  const user = new User(mockDeviceCode, mockHashedUserId, mockFeatureList)

  describe('getDeviceCode', () => {
    it('should return \'string\'', () => {
      chai.assert.equal(typeof user.getDeviceCode(), 'string')
    })

    it('should return correct data as the one passing through constructor', () => {
      chai.assert.equal(user.getDeviceCode(), mockDeviceCode)
    })
  })

  describe('getHashedUserId', () => {
    it('should return \'string\'', () => {
      chai.assert.equal(typeof user.getHashedUserId(), 'string')
    })

    it('should return correct data as the one passing through constructor', () => {
      chai.assert.equal(user.getHashedUserId(), mockHashedUserId)
    })
  })

  describe('getFeature', () => {
    it('should return \'Feature\'', () => {
      chai.assert.isTrue(user.getFeature('feature-2') instanceof Feature)
    })

    it('should return correct data as the one passing through constructor', () => {
      const feature = mockFeatureList[2]
      chai.assert.deepEqual(
        user.getFeature(feature.name),
        new Feature(feature.name, feature.version)
      )
    })

    it('should return undefined if feature name is not exist', () => {
      chai.assert.isUndefined(user.getFeature('feature-99'))
    })
  })
})
