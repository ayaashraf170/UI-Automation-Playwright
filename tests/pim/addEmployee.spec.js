import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { loginCred } from "../../test-Data/loginCred.js"
import { routes } from "../../constants/routes.js";
import { PimPage } from "../../pages/pim.js";
import { employeeDetails, checkboxSatus } from "../../test-Data/createEmployeeDetails.js";


// Declare page object variables to intialize fresh instance before each test

let loginPage;
let pimPage;
let dashboardPage;
let createEmployeePage;

test.beforeEach('login & navigate to PIM module', async ({ page }) => {

        //instantiate LoginPage using POM    
        loginPage = new LoginPage(page);
        //instantiate DashboardPage using POM
        dashboardPage = new DashboardPage(page)
        //instantiate PimPage using POM
        pimPage = new PimPage(page);


        //Navigate to the login page via LoginPage abstraction
        await loginPage.open();

        //Login to the application with valid Admin credentials
        await loginPage.login(loginCred.Admin);
        
        //wait until the page url load
        await page.waitForURL(routes.dashboard,'load')
        
        //verify the user is redirected to the dashboard by verifying the currecnt page url
        await expect(page).toHaveURL(routes.dashboard);

        //navigate to the PIM page module 
        await dashboardPage.clickMenuModule("PIM")

        //verify the user is redirected to the pim page by verifying the currecnt page url
        await expect(page).toHaveURL(routes.pim)

       //click add button to redirect to the add employee page and instantiate createEmployeePage object
        createEmployeePage = await pimPage.gotoCreateEmployeePage()


})


test.describe('valid creation of an employee', () => {

//create a variable that stores the fullData object.
 const fullData = employeeDetails();

//create a variable that stores the missingLoginDetails object.
let missingLoginDetails = employeeDetails({ checkboxStatus: checkboxSatus.unchecked });


        test("ceate an employee successfully with creating login details", async () => {

                //create a new employee with valid data  
                await createEmployeePage.addEmployee(fullData)

                //verify that the employee created successfully
                await expect(createEmployeePage.successMsg).toBeVisible({ timeout: 5000 })


        });




        test("ceate an employee successfully without creating login details", async () => {

                //create a new employee with valid data  
                await createEmployeePage.addEmployee(missingLoginDetails)

                //verify that the employee created successfully
                await expect(createEmployeePage.successMsg).toBeVisible({ timeout: 5000 })


        });


});




test.describe('invalid creation of an employee', () => {


//create a variable that stores the emptyData object.

let emptyData = employeeDetails({
                        firstName: ' ',
                        middleName: ' ',
                        lastName: '  ',
                        employeeId: ' ',
                        uploadedimg: '',
                        password: ' ',
                        confirmPassword: ' ',
                        checkboxStatus: checkboxSatus.unchecked,
                        radioBtnStatus: ' '
                });

   



        test("unsuccessfully ceate an employee without required data", async () => {

                
                //create a new employee with missing Details
                await createEmployeePage.addEmployee(emptyData)
                //verify the number of the validation messages for the required fields
                await expect(createEmployeePage.firstNameValidationMSg).toHaveCount(3)
                //verify that that success message doesn't appear 
                await expect(createEmployeePage.successMsg).not.toBeVisible({ timeout: 5000 })
                //verify that the user keeps in the add employee page and doesn't redirect to the profile page
                await expect(createEmployeePage.page).toHaveURL(routes.addEmployee)

        })



})

