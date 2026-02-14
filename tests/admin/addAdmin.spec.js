import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { AdminPage } from "../../pages/admin.js";
import {loginCred} from "../../test-Data/loginCred.js";
import { adminDetails ,roles ,status} from "../../test-Data/createAdminDetails.js";
import { searchKeys } from "../../utils/searchKey.js";
import { routes } from "../../constants/routes.js";

// Declare page object variables to intialize fresh instance before each test

let loginPage;
let dashboardPage;
let adminPage;
let adminForm;


test.beforeEach(async ({ page }) => {

    //instantiate used pages (loginPage ,dashboardPage ,adminPage )
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    //Navigate to the login page via LoginPage abstraction
    await loginPage.open();

    //Login to the application with valid Admin credentials
    await loginPage.login(loginCred.Admin)

    //wait until Dashboard page loads
    await page.waitForURL(routes.dashboard, { waitUntil: 'load' })

    //verify that the user redirects successfully to the dashboard page
    await expect(page).toHaveURL(routes.dashboard)

    //click Admin module from the sideMenu
    await dashboardPage.clickMenuModule("Admin")

    //wait until the admin page url loads
    await dashboardPage.page.waitForURL(routes.admin, { waitUntil: 'load' })

    //veify that the user redirects successfully to the Admin page
    await expect(page).toHaveURL(routes.admin)

    //click add button to redirect to the add admin page and instantiate AdminForm object
    adminForm = await adminPage.gotoCreateAdminPage();



})





test('create a new admin successfuly with full data ', async () => {

    //create a variable that stores the full Data object used to create an Admin
    const fullData=adminDetails();
    
    // Create an admin user through the Admin Form POM using the fullData object
    await adminForm.createAdmin(fullData)

    //verify that the success message 'successfully saved' shows up after successfull creation
    await expect(adminForm.successMsg).toBeVisible({ timeout:3000 })


})






test.describe('invalid creation an admin',()=>{


//create a variable that stores the empty Data object.
let missingData= adminDetails({ role:roles.empty , searchKeys:searchKeys.invalidSearchKey , userName:' ' , status:status.empty , password:' ' ,confirmedPassword:' ' })

// Create a variable that stores the full data object with an empty role
let missingRole=adminDetails({role:roles.empty})

// Create a variable that stores the full data object with an empty userName
let missingUsername=adminDetails({userName:' '})

// Create a variable that stores the full data object with an empty password
let missingPassword=adminDetails({password:' '})

// Create a variable that stores the full data object with an empty confirmPassword
let missingconfirmPassword=adminDetails({confirmPassword:' '})

// Create a variable that stores the full data object with unmatched confirmPassword
let unmatchedPassword=adminDetails({confirmPassword:'test'})




test('unsuccessfully create a new admin without required fields ', async () => {
 
    
    // Create an admin user through the Admin Form POM using the missingData object
    await adminForm.createAdmin(missingData)

    //verify that the validation message'Required' of missing fields has count '6'
    //(note:the count should have been '5' but unfortunately the page has a static 'required' text )
    await expect(adminForm.requiredFieldMsg).toHaveCount(6)

    //verify that the validation message of confrim password 'Passwords do not match' has count '1'
    await expect(adminForm.confirmPasswod_validationMsg).toHaveCount(1)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})





test('unsuccessfully create a new admin without role ', async () => {

    // Create an admin user through the Admin Form POM using the missingRole object
    await adminForm.createAdmin(missingRole)

    //verify that the validation message of Role field'Required' has count '2'
    //(note:the count should have been '1' but unfortunately the page has a static 'required' text )
    await expect(adminForm.requiredFieldMsg).toHaveCount(2)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})





test('unsuccessfully create a new admin without user name ', async () => {

    // Create an admin user through the Admin Form POM using the missingUsername object
    await adminForm.createAdmin(missingUsername)

    //verify that the validation message of Username field 'Required' has count '2'
    //(note:the count should have been '1' but unfortunately the page has a static 'required' text )
    await expect(adminForm.requiredFieldMsg).toHaveCount(2)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})




test('unsuccessfully create a new admin without password ', async () => {

    // Create an admin user through the Admin Form POM using the missingPassword object
    await adminForm.createAdmin(missingPassword)

    //verify that the validation message of password field 'Required' has count '2'
    //(note:the count should have been '1' but unfortunately the page has a static 'required' text )
    await expect(adminForm.requiredFieldMsg).toHaveCount(2)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})





test('unsuccessfully create a new admin without confirm password ', async () => {

    // Create an admin user through the Admin Form POM using the missingconfirmPassword object
    await adminForm.createAdmin(missingconfirmPassword)

    //verify that the validation message of confirm password field 'Passwords do not match' has count '1'
    await expect(adminForm.confirmPasswod_validationMsg).toHaveCount(1)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})





test('unsuccessfully create a new admin with unmatched confirm password ', async () => {

    // Create an admin user through the Admin Form POM using the unmatchedPassword object
    await adminForm.createAdmin(unmatchedPassword)

    //verify that the validation message of confirm password field 'Passwords do not match' has count '1'
    await expect(adminForm.confirmPasswod_validationMsg).toHaveCount(1)

    //ensure the user keeps in Add_Admin page by verifying the current page url
    await expect(adminForm.page).toHaveURL(routes.addAdmin)

    //verify that the success message 'successfully saved' doesn't show up after unuccessfull creation
    await expect(adminForm.successMsg).not.toBeVisible()

})



})
