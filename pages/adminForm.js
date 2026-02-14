import { routes } from "../constants/routes";
import { expect } from "@playwright/test";

class AdminForm {
   
   constructor(page) {

      this.page = page;

      this.userRoleInput = page.getByText('-- Select --', { exact: true }).first();

      this.userRoleList = page.getByRole('listbox');

      this.roleOpts = this.userRoleList.getByRole('option');

      this.employeeName = page.getByPlaceholder('Type for hints...');

      this.selectedEmployee = page.locator(".oxd-autocomplete-wrapper")

      this.employeeOpt = page.getByRole('listbox').getByRole('option');

      this.status = page.getByText('-- Select --', { exact: true }).last();

      this.statusList = page.getByRole('listbox');

      this.statusOpts = page.getByRole('option');

      this.userName = page.locator("//div[@class='oxd-form-row']//input[@class='oxd-input oxd-input--active']");

      this.passwordField = page.locator("(//input[@type='password'])[1]");

      this.confirmPasswordField = page.locator("(//input[@type='password'])[2]");

      this.saveBtn = page.locator("//button[@type='submit']")

      this.successMsg = page.getByText(/successfully saved/i)

      this.requiredFieldMsg = page.getByText(/Required/i)

      this.confirmPasswod_validationMsg = page.getByText(/Passwords do not match/i)

   }



   async createAdmin({ role, searchKeys, userName, status, password, confirmPassword }) {

      //verify the user is redirected successfully to the Add_Admin page by verifying the current page url
      await expect(this.page).toHaveURL(routes.addAdmin)

      //click the user role input 
      await this.userRoleInput.click();

      //wait until the selector show up
      await this.page.waitForSelector('//div[@role="option"]')

      //click the Admin role
      await this.userRoleList.getByRole('option', { name: role }).click();

      //count the length of the array
      let searchKeysCount = searchKeys.length;

      //declare the variables that will be used in the loop
      let employee;

      //loop the alphabets array "searchKeysCount" to select an option of the autocomplete list 'Employee Name'
      for (let i = 0; i < searchKeysCount; i++) {

         const emSearchText = searchKeys[i]
         //clear the employee name value 
         //note this step is used to clear the inserted search key if there is no result before inserting new one.
         await this.employeeName.clear();

         //insert the search key to get search results
         await this.employeeName.fill(emSearchText);

         //wait for the list to load and verify that there is at least one option
         await this.page.waitForTimeout(3000)

         //get the count the of the options
         const numberOfOpt = await this.employeeOpt.count();

         //verify that at least the first option in the list is visible
         await expect(this.employeeOpt.first()).toBeVisible();

         //click a random option of the results if there is at least one visible option
         if (numberOfOpt > 0 && this.employeeOpt.first().isVisible()) {

            //select a random option from the employee automcomplete list
            employee = await this.employeeOpt.nth(Math.floor(Math.random() * numberOfOpt))

            //click the random option
            await employee.click();

            break;
         }
      }


      //insert username
      await this.userName.fill(userName);

      //click the status input to open the list of the options
      await this.status.click();

      //verify that the status dropdown is visible
      await expect(this.statusList).toBeVisible({timeout:3000});
      
      //click an option of the status list
      await this.statusOpts.filter({ hasText: status }).click();

      //insert password
      await this.passwordField.fill(password);

      //fill confirm password
      await this.confirmPasswordField.fill(confirmPassword);

      //click the save button
      await this.saveBtn.click();

      //wait until html is fully parsed and the event 'domcontentloaded' fires
      await this.page.waitForLoadState("domcontentloaded")

   }
}

export { AdminForm }