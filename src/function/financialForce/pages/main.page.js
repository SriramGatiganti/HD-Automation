let page = require('./page.js');
const { I } = inject();
const { SFDC } = inject();

let env = process.profile.split(':')[0];
let sfdc_url;
let username;
let password;

async function getLoginDetails() {
    if (env == 'acc') {
        sfdc_url = 'https://horecadigital--full.lightning.force.com';
        username = 'k.dasugari@reply.de.full';
        password = await SFDC.getPassword('VGVzdEAxMjM=')
    }
    if (env == 'prd') {
        sfdc_url = 'https://horecadigital.my.salesforce.com';
        username = 'k.dasugari@reply.de';
        password = await SFDC.getPassword('VGVzdDEyMzQh');
    }
    if (env == 'dev') {
        sfdc_url = 'https://horecadigital--develop.lightning.force.com';
        username = 'g.zhou@reply.de.develop';
        password = await SFDC.getPassword('VGVzdDEyMzQh');
    }
    return {
        username: username,
        password: password
    };
};

class mainPage extends page {
    get usernameLoc() { return '#username'; }
    get passwordLoc() { return '#password'; }
    get loginLoc() { return '#Login'; }


    async login() {
        let details = await getLoginDetails();
        super.open(sfdc_url);
        let header = await I.grabTitle();
        if (header.includes("Login") || header.includes("Anmelden")) {
            I.waitForVisible(this.usernameLoc);
            I.fillField(this.usernameLoc, details.username);
            I.fillField(this.passwordLoc, details.password);
            I.click(this.loginLoc);
        }
    }

    openLeads() {
        super.open(sfdc_url + '/lightning/n/Add_Leads');
        // I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
    }

}

module.exports = new mainPage();
