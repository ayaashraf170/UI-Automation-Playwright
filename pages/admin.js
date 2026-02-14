import { expect } from "@playwright/test";
import { AdminForm } from "../pages/adminForm";
import { routes } from "../constants/routes";


class AdminPage {

   constructor(page) {

      this.page = page;

      this.addBtn = page.getByRole('button', { name: 'Add' });

      
      this.adminTable = page.getByRole('table');
      

   }

async gotoCreateAdminPage(){

   //verify that the add button is visible
   await expect(this.addBtn).toBeVisible()

   //add click button to redirect to the add admin page
   await this.addBtn.click()

   //wait until the admin page url loads
    await this.page.waitForURL(routes.addAdmin, { waitUntil: 'load' })

   //Return the AdminForm page object .
   return new AdminForm(this.page)
}


}

export { AdminPage }