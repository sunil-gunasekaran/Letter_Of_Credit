var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": ["javascripts/app.js"],
    "app.css": ["stylesheets/app.css"],
    "images/": "images/",
    "node/server.js":["node/prepare.js"]
  }),
  networks: {
        development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    staging: {
      host: "192.168.100.5",
      port: 8001,   // Different than the default below
      network_id: 1407,
      gas:79999999999
     }
   }
};