let path = './src/function/public/config/' + process.profile.split(':')[0] + '/.env';
require("dotenv").config({
  path: path
});
const fetch = require("node-fetch");
const base64url = require("base64-url");
const jwtToken = require("./lib/jwtToken");

const oauthInformation = {
  clientKey: process.env.CLIENT_KEY,
  sfdcUser: process.env.SFDC_USER,
  sfdcInstance: process.env.SFDC_INSTANCE
};
const sfdctokenEndpoint = `${
  oauthInformation.sfdcInstance
}/services/oauth2/token`;
const token = jwtToken.generate(oauthInformation);

const paramBody =
  "grant_type=" +
  base64url.escape("urn:ietf:params:oauth:grant-type:jwt-bearer") +
  "&assertion=" +
  token;
const req_sfdcOpts = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: paramBody
};

async function getSfdcAccestToken() {
  const responseBuffer = await fetch(sfdctokenEndpoint, req_sfdcOpts);
  const res = await responseBuffer.json();
  return res;
}

async function getIdByAttrAndInfo(attr, value, instanceUrl, accessToken, info = '', table = 'Account') {
  value = encodeURIComponent(value);
  const requestEndpoint = `${instanceUrl}/services/data/v44.0/query?q=select+Id+from+${table}+where+${attr}%3D%27${value}%27`;
  const req_sfdcOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  const result = await fetch(requestEndpoint, req_sfdcOpts);
  return await result.json();
}

async function getObjectByTypeAndId(objectType, id, instanceUrl, accessToken, info = '') {
  const requestEndpoint = `${instanceUrl}/services/data/v44.0/sobjects/${objectType}/${id}`;
  const req_sfdcOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  const result = await fetch(requestEndpoint, req_sfdcOpts);
  return await result.json();
}

function getInfo(per, est, att = '') {
  const result = {
    "establishment": {
      "name": est.Name,
      "street": est.ShippingStreet,
      "zipCode": est.ShippingPostalCode,
      "city": est.ShippingCity,
      "country": est.ShippingCountry,
      "phone": est.Phone,
      "email": est.Establishment_Email__c
    },
    "company": {
      "name": est.CompanyName__c,
      "street": est.BillingStreet,
      "zipCode": est.BillingPostalCode,
      "city": est.BillingCity,
      "country": est.BillingCountry,
      "phone": est.CompanyPhone__c
    },
    "person": {
      "salutation": per.Salutation,
      "firstName": per.FirstName,
      "lastName": per.LastName,
      "phone": per.PersonMobilePhone,
      "email": per.PersonEmail,
      "salesChannel": per.ChannelV2__c,
      "sfdc_deleted": per.IsDeleted__c
    }
  }
  return result;
}

let jsonDiff = require('json-diff');

async function compareJson(a, b) {
  let result = await jsonDiff.diff(a, b);
  if (result == null) {
    result = {
      "result": "No difference."
    };
  }
  return result;
}

async function getResult(steps, result) {
  let thisStep = '';
  let preStep = '';
  let r = '';
  for (var i = 0; i < result.split('#').length; i++) {
    thisStep = JSON.parse(result.split('#')[i]);
    r = r + steps[i] + '\n' + JSON.stringify(thisStep, null, 2) + '\n';
    if (i >= 1) {
      preStep = JSON.parse(result.split('#')[i - 1]);
      //I.say('preStep:\n' + JSON.stringify(preStep, null, 2))
      r = r + 'Difference:\n' + JSON.stringify(await this.compareJson(preStep, thisStep), null, 2) + '\n'
    }
  }
  return r;
}

async function getPassword(text) {
  let buff = await new Buffer.from(text, 'base64');
  let password = await buff.toString('ascii');
  return password
}

module.exports = {
  getSfdcAccestToken,
  getIdByAttrAndInfo,
  getObjectByTypeAndId,
  getInfo,
  compareJson,
  getResult,
  getPassword
};
