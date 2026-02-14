import { test, expect } from "@playwright/test";
import { filesData } from "../../test-Data/uploadedfilesData";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { loginCred } from "../../test-Data/loginCred.js"
import { routes } from "../../constants/routes.js";
import { PimPage } from "../../pages/pim.js";


// Declare page object variables to intialize fresh instance before each test

let loginPage;
let dashboardPage;
let pimPage;
let createEmployeePage

test.beforeEach(async ({ page}) => {
  
    //instantiate LoginPage using POM
    loginPage = new LoginPage(page);

    //instantiate DashboardPage using POM
    dashboardPage = new DashboardPage(page);

    //instantiate PimPage using POM
    pimPage = new PimPage(page);

    //Navigate to the login page via LoginPage abstraction
    await loginPage.open();
    
    //Login to the application with valid Admin credentials
    await loginPage.login(loginCred.Admin);

    //wait until Dashboard page loads
    await page.waitForURL(routes.dashboard, { waitUntil: 'load' })

    //varify that the user redirects to the dashboard page by verifying the current url of the page
    await expect(page).toHaveURL(routes.dashboard);

    //navigate to the PIM page module 
    await dashboardPage.clickMenuModule("PIM")

    //ensure the user is redirected to the pim page by verifying the currecnt page url
    await page.waitForURL(routes.pim, { waitUntil: 'load' })

    //varify that the user redirects to the pim page
    await expect(page).toHaveURL(routes.pim)

    //click add button to redirect to the add employee page and instantiate createEmployeePage object
    createEmployeePage= await pimPage.gotoCreateEmployeePage()

    //wait until add employee page loads
    await page.waitForURL(routes.addEmployee, { waitUntil: 'load' })

    //varify that the user redirects to the add employee page   
    await expect(page).toHaveURL(routes.addEmployee)


})

//using (DDT) Approach to automate the upload files feature
//looping the test files to execute the same test case multiple times with different test files (DDT)
for (const fileData of filesData) {

    test(' upload ' + fileData.name, async () => {

        //upload the selected file from uploadedfilesData.js
        await createEmployeePage.uploadImage(fileData.name)


        //wait until the validation message appears
        await createEmployeePage.page.waitForTimeout(1000);


     //run the assertions based on the expected result of each file 
        if (fileData.expectedResult === 'Valid') {

            //verify that the validation message doesn't appear
            await expect(createEmployeePage.invalidImgMsg).not.toBeVisible({ timeout: 3000 })

        } else if (fileData.expectedResult === 'Invalid') {

            //note: one of the following assertions is enough to verify the existence of the validation msg
            
            //1-verify that the validation message appears 
            await expect(createEmployeePage.invalidImgMsg).toHaveCount(1)

           //2-verify that the validation message has count (1)
            await expect(createEmployeePage.invalidImgMsg).toBeVisible({ timeout: 3000 })

           //verify that the url of the page doesn't break and the user keeps in the same page
            await expect(createEmployeePage.page).toHaveURL(routes.addEmployee)


        } else {


            //note: one of the following assertions is enough to verify the existence of the validation msg
    
            //1-verify that the validation message appears
            await expect(createEmployeePage.LargeAttachmentMsg).toBeVisible({ timeout: 3000 })

           //2-verify that the validation message has count (1)
            await expect(createEmployeePage.LargeAttachmentMsg).toHaveCount(1)

            //verify that the url of the page doesn't break and the user keeps in the same page
            await expect(createEmployeePage.page).toHaveURL(routes.addEmployee)
        }


    });
}
