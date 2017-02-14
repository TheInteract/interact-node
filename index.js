module.exports = (customerCode, hashedUserId = '') => {
  return {
    featureList: [
      { name: 'card-1', version: 'A' },
      { name: 'card-2', version: 'B' },
    ],
    initCode: `ic(${customerCode}, ${hashedUserId})`
  }
}
