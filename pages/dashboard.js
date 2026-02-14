
class DashboardPage {

   // Page Object for the Dashboard page.
    constructor(page) {

       // Playwright page instance used to drive browser actions.
        this.page = page;

       // "side menu"that contains list of multiple links .
        this.menu = page.getByRole('Navigation', { name: "Sidepanel" }).getByRole("list")

      // "menu module" element that contains the name of each module
        this.menuModule = this.menu.getByRole("link").locator("//span")


    }

   

    async clickMenuModule(name) {
        //wait for the menu modules to be visible
        await this.menu.waitFor({ state: "visible" });
        
        //click a module of the sideMenu modules
       await this.menu.getByRole('link', {name}).click();
       
      //wait until html is fully parsed and the event 'domcontentloaded' fires
       await this.page.waitForLoadState("domcontentloaded");

    };

}


export { DashboardPage };

