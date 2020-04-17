const random = require('../public/random');
let env = require('../newHydra/wizard_data_provider_new').env;
/*
const wizardDataProvider = require('../wizard/wizard_data_provider');
let wizard = wizardDataProvider.getWizardTestData();
let u = wizard.registration.username;
let p = wizard.registration.password;
let subdomain = wizard.subdomain;
let user;
*/
let postfix;
let test_flag = process.profile.split(':')[7];

if (env == "prd") {
  postfix = "";
} else {
  postfix = env;
}

//test_flag=0;
if (test_flag == 0) {
  user = {
    username: 'testreser0+autnew180416135049@gmail.com', //testreser0@gmail.com
    password: 'Test1234!',
    domain: "",
    url: 'https://x8eenautnew180416135049.eatbu.com/' + postfix, //krefeldbbqtest
    r_url: 'https://reservation.horeca.digital' + postfix,
    c_url: 'https://cockpit.app.hd.digital/login',
    //c_url: 'http://cockpit-stg.b6w5sd39xy.eu-central-1.elasticbeanstalk.com/',
    email: 'testreser0@gmail.com',
    phone: '+491633735500',
    maxwaittime: 40,
    p: ".eatbu.com" + postfix
  };
} else {
  user = {
    username: "",
    password: "Test1234!",
    domain: "",
    url: "",
    r_url: 'https://reservation.' + postfix + '.dish.co',
    c_url: 'https://acc.cockpit.app.hd.digital/login',
    //c_url: 'http://cockpit-stg.b6w5sd39xy.eu-central-1.elasticbeanstalk.com/',
    email: 'testreser0@gmail.com',
    phone: '+491633735500',
    maxwaittime: 40,
    p: ".eatbu.com" + postfix,
    c_url: 'https://dev.cockpit.app.hd.digital/pages/login',
    c_email: 'testreser0+autnew200122160908@gmail.com',
    c_password: "Test1234!",
    c_branchoffice: "Test123",
    c_branchofficeNew:"NewBranchOfcForAutomation",
    c_street: "Metro-Straße",
    c_houseno: "1",
    c_postcode: "40235",
    c_city: "Düsseldorf",
    c_pos:"Storyous",
  };
}

module.exports = {
  user
};
