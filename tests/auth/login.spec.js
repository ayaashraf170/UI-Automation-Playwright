import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { routes } from "../../constants/routes.js";
import { loginCred } from "../../test-Data/loginCred.js";



//Declare loginPage variables to intialize fresh instance before each test
let loginPage;

test.beforeEach(async ({ page }) => {

    //instantiate LoginPage object using POM
    loginPage = new LoginPage(page);

    //Navigate the login page via abstraction
    await loginPage.open();


})

test('login using valid user name and valid password', async ({ page }) => {


    //Login to the application with valid Admin credentials
    await loginPage.login(loginCred.Admin);

    //ensure the user is redirected successfully to the dashboard by verifying the current page url
    await expect(page).toHaveURL(routes.dashboard);

})







test.describe('invalid cases of login functionality', () => {




    test('login using valid username and invalid password', async () => {

        //Attemp login to the App using invalid password
        await loginPage.login({ ...loginCred.Admin, password: loginCred.invalidCred().password });

        //ensure the user is redirected again to login page and the login failed
        await expect(loginPage.page).toHaveURL(loginPage.url);

        //one of the following asserion is enough to verify the existence of validation message 

        //ensure that the validation message "invalid credentails" shows up 
        await expect(loginPage.invalidCredMsg).toBeVisible({ timeout: 5000 });

        //verify that the validation message "invalid credentails" has count '1'
        await expect(loginPage.invalidCredMsg).toHaveCount(1);


    })





    test('login using invalid username and invalid password', async () => {

        //Attemp login to the App using invalid password and username
        await loginPage.login(loginCred.invalidCred())

        //ensure the user is redirected again to login page and the logins fails
        await expect(loginPage.page).toHaveURL(loginPage.url)

        //one of the following asserion is enough to verify the existence of validation message 

        //ensue that the validation message "invalid credentails" shows up
        await expect(loginPage.invalidCredMsg).toBeVisible({ timeout: 5000 });

        //verify that the validation message "invalid credentails" has count '1'
        await expect(loginPage.invalidCredMsg).toHaveCount(1);

    })





    test('login without inserting a password', async () => {

        //Atemp login to the app with username only
        await loginPage.login({ ...loginCred.Admin, password: ' ' });

        //ensure the user is redirected to the login page and login fails
        await expect(loginPage.page).toHaveURL(loginPage.url);

        //one of the following asserion is enough to verify the existence of validation Msg of the empty fields "Required" 

        //ensure the validation message"Required" shows up
        await expect(loginPage.requiredMsg).toBeVisible({ timeout: 5000 });

        //verify that only one validation messages appears 
        await expect(loginPage.requiredMsg).toHaveCount(1);

    })





    test('login without inserting credential details', async () => {

        //Attemp login to the app without username and password
        await loginPage.login({ username: ' ', password: ' ' });

        //ensure the user is redirected successfully to the login page and login fails
        await expect(loginPage.page).toHaveURL(loginPage.url);

        //verify that two validation messages appear (one for each empty field)
        await expect(loginPage.requiredMsg).toHaveCount(2);

    })

})