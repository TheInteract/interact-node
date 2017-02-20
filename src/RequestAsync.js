'use strict'

const request = require('request')
const Promise = require('bluebird')

module.exports.request = Promise.promisify(request)
