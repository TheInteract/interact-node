class Feature {
  constructor (version) { this.version = version }
  isA () { return this.version === 'A' }
  isB () { return this.version === 'B' }
}

module.exports = Feature
