const chai = require('chai')
const getConfig = require('./getConfig')
const RequestAsync = require('./RequestAsync')
const Promise = require('bluebird')
const sinon = require('sinon')
const config = require('config')
const cloneDeep = require('lodash/cloneDeep')

describe('getConfig', () => {
  const customerCode = '1234'
  const deviceCode = '1234'
  const hashedUserId = '1234'

  const mockFeature = [
    { name: 'card-1', version: 'A' },
    { name: 'card-2', version: 'B' },
  ]
  const mockIdentity = 'AE1R12EO1324PRE44KFD'
  const mockInitCode = 'ic(1234, 1234)'

  beforeEach(() => {
    sinon.stub(RequestAsync, 'request')
      .returns(Promise.resolve({
        featureList: cloneDeep(mockFeature),
        identity: mockIdentity,
        initCode: mockInitCode,
      }))
  })

  afterEach(() => {
    RequestAsync.request.restore()
  })

  it('should call request async with proper options ', (done) => {
    getConfig(customerCode, { deviceCode, hashedUserId })
      .then(result => {
        sinon.assert.calledWith(RequestAsync.request, {
          method: 'POST',
          url: config.server.url,
          body: {
            customerCode: customerCode,
            userIdentity: {
              deviceCode: deviceCode,
              hashedUserId: hashedUserId,
            }
          }
        })
        sinon.assert.calledOnce(RequestAsync.request)
      })
      .then(() => { done() })
      .catch(err => { done(err) })
  })

  it('should call request async with proper options ', (done) => {
    getConfig(customerCode)
      .then(result => {
        sinon.assert.calledWith(RequestAsync.request, {
          method: 'POST',
          url: config.server.url,
          body: {
            customerCode: customerCode,
            userIdentity: {}
          }
        })
        sinon.assert.calledOnce(RequestAsync.request)
      })
      .then(() => { done() })
      .catch(err => { done(err) })
  })

  it('should return featureList, identity and initCode', (done) => {
    getConfig(customerCode, { deviceCode, hashedUserId })
      .then(result => {
        chai.assert.deepEqual({
          featureList: cloneDeep(mockFeature),
          identity: mockIdentity,
          initCode: mockInitCode,
        }, result)
        sinon.assert.calledOnce(RequestAsync.request)
      })
      .then(() => { done() })
      .catch(err => { done(err) })
  })
})
