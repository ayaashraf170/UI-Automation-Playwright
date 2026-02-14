//login page locators and methods
import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {

    this.page = page;
    //the url is saved in the "playwright.config.js" in "base url"
    this.url = "/web/index.php/auth/login";
    this.usernameField = page.getByPlaceholder("Username");
    this.passwordField = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { type: 'submit' });
    this.invalidCredMsg = page.getByText(/Invalid credentials/i);
    this.requiredMsg = page.getByText(/Required/i)
    //this.requiredUserMsg=page.locator("(//div[@class='oxd-form-row'])[1]//span[text()='Required']")
    //this.requiredPasswordMsg=page.locator("(//div[@class='oxd-form-row'])[2]//span[text()='Required']")

  }

  async open() {
    //Navigate the login page
    await this.page.goto(this.url,{waitUntil:"domcontentloaded"});
  
    await expect(this.page).toHaveURL(this.url)

  }


  async login({username,password}) {
    //login

    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();

    

  }



}

export { LoginPage };

