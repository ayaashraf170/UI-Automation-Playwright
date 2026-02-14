import { expect } from "@playwright/test";
import { CreateEmployeePage } from "../pages/createEmployee";
import { routes } from "../constants/routes.js";


class PimPage {

  //Page Object for the Dashboard page.
  constructor(page) {

    //Playwright page instance used to drive browser actions.
    this.page = page;

    //"menu module" element that contains the name of each module
    this.addBtn = page.getByText("Add", { exact: true })

  }


  async gotoCreateEmployeePage() {

    //verify that the add button is visible
    await expect(this.addBtn).toBeVisible()

    //click a add button to redirect to the add employee page
    await this.addBtn.click();

    //wait until the add employee page url loads
    await this.page.waitForURL(routes.addEmployee, { waitUntil: 'load' });

    //verify that the user is redirected to the add employee page
    await expect(this.page).toHaveURL(routes.addEmployee)

    //Return the add employee page object .
    return new CreateEmployeePage(this.page)

  }


}

export { PimPage }
