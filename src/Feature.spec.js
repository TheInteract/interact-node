const chai = require('chai')
const Feature = require('./Feature')

describe('Feature', () => {
  describe('getName', () => {
    const feature = new Feature('feature-1', 'A')

    it('should return \'string\'', () => {
      chai.assert.equal(typeof feature.getName(), 'string')
    })

    it('should return correct data as the one passing through constructor', () => {
      chai.assert.equal(feature.getName(), 'feature-1')
    })
  })

  describe('isA', () => {
    it('should return \'string\'', () => {
      const feature = new Feature('feature-1', 'A')
      chai.assert.equal(typeof feature.isA(), 'boolean')
    })

    it('should consider \'A\' as true', () => {
      const feature = new Feature('feature-1', 'A')
      chai.assert.isTrue(feature.isA())
    })

    it('should consider \'a\' as true', () => {
      const feature = new Feature('feature-1', 'a')
      chai.assert.isTrue(feature.isA())
    })

    it('should consider \'B\' as false', () => {
      const feature = new Feature('feature-1', 'B')
      chai.assert.isFalse(feature.isA())
    })

    it('should consider \'D\' as false', () => {
      const feature = new Feature('feature-1', 'D')
      chai.assert.isFalse(feature.isA())
    })
  })

  describe('isB', () => {
    it('should return \'string\'', () => {
      const feature = new Feature('feature-1', 'B')
      chai.assert.equal(typeof feature.isB(), 'boolean')
    })

    it('should consider \'B\' as true', () => {
      const feature = new Feature('feature-1', 'B')
      chai.assert.isTrue(feature.isB())
    })

    it('should consider \'b\' as true', () => {
      const feature = new Feature('feature-1', 'b')
      chai.assert.isTrue(feature.isB())
    })

    it('should consider \'A\' as false', () => {
      const feature = new Feature('feature-1', 'A')
      chai.assert.isFalse(feature.isB())
    })

    it('should consider \'D\' as false', () => {
      const feature = new Feature('feature-1', 'D')
      chai.assert.isFalse(feature.isB())
    })
  })
})
