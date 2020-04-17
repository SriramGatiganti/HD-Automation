const { I } = inject();

class page {

    get close() { return '//div[contains(@class,"oneGlobalNav oneConsoleNav")]//ancestor::li[not(contains(@class,"slds-is-active active"))]//button[contains(@title,"Close")]'; }
    get closeAll() { return '//div[contains(@class,"oneGlobalNav oneConsoleNav")]//button[contains(@title,"Close")]'; }
    get searchBar() { return '//input[@id="159:0;p"]'; }
    get searchButton() { return '//*[contains(@class,"SEARCH_OPTION")]'; }
    get searchBox() { return '//span[@class="mruSearchLabel slds-text-body_regular slds-text-color_default slds-truncate slds-show slds-m-right_large slds-text-align_left slds-grow"]'; }
    get searchFailed() { return '//div[contains(text(),"give up yet!")]'; }
    get currentTab() { return '//section[@class="tabContent active oneConsoleTab"]'; }
    get xpathEnd() { return '")]'; }
    get settingsIcon() { return '//div[@class="profileTrigger branding-user-profile bgimg slds-avatar slds-avatar_profile-image-small circular forceEntityIcon"]/span/img[@title="User"]'; }
    get logoutButton() { return '//a[@class="profile-link-label logout uiOutputURL"]'; }
    get relatedTab() { return this.currentTab + '//a[contains(.,"Related")]'; }
    // OLD '//span[@class="title"][contains(.,"Related")]'; }
    get detailsTab() { return this.currentTab + '//span[@class="title"][contains(.,"Details")]'}

    get isProcessed() { return this.currentTab + '//span[text()="isProcessed"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'; }
    get status() { return this.currentTab + '//span[text()="Status"]//parent::div//following-sibling::div/span' }
    get firstBillDate() { return this.currentTab + '//span[text()="First Bill Date"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    // OLD'//span[text()="First Bill Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'}
    get companyName() { return this.currentTab + '//span[text()="Company"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap")]'; }
    get orderNumber() { return this.currentTab + '//span[text()="Order"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap")]'; }
    get currency() { return this.currentTab + '//span[text()="Currency"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    get startDate() { return this.currentTab + '//span[text()="Start Date"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    get endDate() { return this.currentTab + '//span[text()="End Date"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    get product() { return this.currentTab + '//span[text()="Product or Service"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap")]';}

    open(path) {
        I.amOnPage(path);
    }

    closeTabs() {
        I.executeScript(function (xpath) {
            let ele = document.evaluate(xpath,
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
            for (let i = 0; i < ele.snapshotLength; i++) {
                ele.snapshotItem(i).click();
            };
        }, this.closeAll);
    }

    // openRelated(xp) {
    //     I.waitForVisible(xp);
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, xp);
    //     I.wait(2);
    //     I.scrollPageToBottom();
    //     I.wait(2);
    //     I.scrollPageToBottom();
    // }

    async searchPersonAccount(email) {
        this.closeTabs();
        I.waitForEnabled(this.searchBar);
        I.click(this.searchBar);
        await I.fillField(this.searchBar, email);
        I.wait(2);
        I.waitForEnabled(this.searchBox);
        I.retry().click(this.searchBox);

        I.wait(5);
        let retry = await I.executeScript(function (xpath1) {

            //refactor to check for name found rather than search failed
            let ele1 = document.evaluate(xpath1,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (ele1) {
                return r = true;
            } else {
                return r = false;
            }
        }, this.searchFailed);
        if (retry) {
            I.click(this.searchBar);
            I.fillField(this.searchBar, email);
            I.waitForEnabled(this.searchButton);
            I.retry().click(this.searchButton);
        }
    }
    openPersonAccount(personName) {
        I.waitForText(personName);
        I.click(personName);
    }

    async submitSearch(email, name) {
        await this.searchPersonAccount(email);
        I.wait(5);
        this.openPersonAccount(name);
    }
    openPage(xp) {
        I.executeScript(function (xpath) {
            let ele = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (ele) {
                ele.click();
            }
        }, xp);
        I.wait(2);
        I.scrollPageToBottom();
        I.wait(2);
        I.scrollPageToBottom();
    }

    logout() {
        this.closeTabs();
        I.executeScript(function (xpath) {
            let ele = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (ele) {
                ele.click();
            }
        }, this.settingsIcon);
        I.executeScript(function (xpath) {
            let ele = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (ele) {
                ele.click();
            }
        }, this.logoutButton);
    }
}
module.exports = page;