'use strict'

class Feature {
  constructor (name, version) {
    this.name = name
    this.version = version.toUpperCase()
  }

  getName () { return this.name }
  isA () { return this.version === 'A' }
  isB () { return this.version === 'B' }
}

module.exports = Feature
