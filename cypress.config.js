const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    video: false
  }
})
