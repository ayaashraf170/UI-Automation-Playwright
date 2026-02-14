import { expect } from "@playwright/test";

class MaintenanceAccessForm {
    constructor(page) {
        this.page = page,
        this.passwordInput = page.locator("input[name='password']")
        this.confirmBtn = page.getByRole('button', { name: ' Confirm ' })
        this.validationMsg = page.getByText(/Invalid credentials/i)
    }


    async accessMaintenance(password) {

        //veify that the passwod input is visible
        await expect(this.passwordInput).toBeVisible()

        //insert the password
        await this.passwordInput.fill(password)

        //click confirm button to submit the form 
        await this.confirmBtn.click();
    }
}

export { MaintenanceAccessForm }