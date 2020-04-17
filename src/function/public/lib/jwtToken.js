const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const env = process.profile.split(':')[0];

function generate(oauthInformation) {
  const header = {
    algorithm: "RS256"
  };
  const payload = generateClaim(oauthInformation);
  const keyPath = path.resolve(__dirname, "../config/" + env + "/key.pem");
  const cert = fs.readFileSync(keyPath);
  return jwt.sign(payload, cert, header);
}

function generateClaim(oauthInformation) {
  const expirationTimestamp = Math.floor(Date.now() / 1000) + 300;

  return {
    iss: oauthInformation.clientKey,
    sub: oauthInformation.sfdcUser,
    aud: oauthInformation.sfdcInstance,
    exp: expirationTimestamp
  };
}

module.exports = {
  generate
};
