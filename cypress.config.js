const { defineConfig } = require("cypress");
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:4200/", 
    excludeSpecPattern: ['**/1-getting-started','**/2-advanced-examples',"**/__snapshots__/*",
  "**/__image_snapshots__/*"], 
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      return config;
    },
    retries :{
      runMode : 0,
      openMode : 0
    },
    projectId : "iu63us",
    "env": {
  "cypress-plugin-snapshots": {
    "imageConfig" : {
      "threshold" : 0.01
    }
    
  }
}
  },
});
