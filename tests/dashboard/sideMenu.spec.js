import { test ,expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.js";
import { DashboardPage } from "../../pages/dashboard.js";
import { MaintenanceAccessForm } from "../../pages/maintenanceAccessForm.js"
import { MaintenancePage } from "../../pages/maintenance.js"
import { routes } from "../../constants/routes.js";
import { allowedList } from "../../constants/sidemenu.js";
import { loginCred } from "../../test-Data/loginCred.js";



 
    // Declare required page objects variables to intialize fresh instance before each test
    let loginPage;
    let dashboardPage;
    let maintenancePage;
    let maintenanceAccessForm;

    test.beforeEach(async({page})=>{

    //instantiate required objects using POM to intialize fresh instance before each test
    loginPage=new LoginPage(page)
    dashboardPage=new DashboardPage(page)
    maintenancePage=new MaintenancePage(page)
    maintenanceAccessForm=new MaintenanceAccessForm(page)

    //Navigate to the login page via LoginPage abstraction
    await loginPage.open();
      //Login to the application with valid Admin credentials
    await loginPage.login(loginCred.Admin)
   

    })





test('verify the permitted side menu modules for Admin user',async({page})=>{
    
    
        //wait until Dashboard page loads
        await page.waitForURL(routes.dashboard, { waitUntil: 'load' });

        //veify that the user is redirected successfully to the dashboard page
        await expect(dashboardPage.page).toHaveURL(routes.dashboard);

        //verify that the menu list is visible
        await expect(dashboardPage.menu).toBeVisible();

        //verify the permitted side menu modules matched with the expected list item
        await expect (dashboardPage.menuModule).toHaveText(allowedList.Admin);

})



test.describe('verify the list of links redirects to the corresponding pages',()=>{




test('Admin Link redirects to the Admin page',async()=>{

//click Admin module from the sideMenu
await dashboardPage.clickMenuModule('Admin');

//wait until the admin page url loads
await dashboardPage.page.waitForURL(routes.admin, { waitUntil: 'load' })

//ensure the user is redirected successfully to the admin page by verifying the current page url
await expect(dashboardPage.page).toHaveURL(routes.admin)

});


test('PIM Link redirects to the PIM page',async()=>{

//click Admin module from the PIM
await dashboardPage.clickMenuModule('PIM');

//wait until the Pim page url loads
await dashboardPage.page.waitForURL(routes.pim, { waitUntil: 'load' })

//ensure the user is redirected successfully to the Pim page by verifying the current page url
await expect(dashboardPage.page).toHaveURL(routes.pim)

});


test('Admin user can access the maintenance page by inserting valid Admin password',async()=>{

    //click Admin module from the Maintenance
    await dashboardPage.clickMenuModule('Maintenance')

    //wait until the maintenance page url loads
    await dashboardPage.page.waitForURL(routes.maintenance, { waitUntil: 'load' })

    //ensure the user is redirected successfully to the Maintenance page by verifying the current page url
    await expect(dashboardPage.page).toHaveURL(routes.maintenance)

    //inserting the Admin password to access the maintenance page
    await maintenanceAccessForm.accessMaintenance(loginCred.Admin.password)

   //verify that the validation msg of the password field doesn't show up 
    await expect(maintenanceAccessForm.validationMsg).not.toBeVisible();

   //verify that the user redirects successfully to the maintenance page by verifying the page title 
    await expect(maintenancePage.pageTitle).toBeVisible()


})

test("Admin user can't access the maintenance page with invalid password",async()=>{

    //creating a varible to store an invalid password
    const inValidPasswod=loginCred.invalidCred().password

    //click Admin module from the Maintenance
    await dashboardPage.clickMenuModule('Maintenance')

    //ensure the user is redirected successfully to the Maintenance page by verifying the current page url
    await dashboardPage.page.waitForURL(routes.maintenance, { waitUntil: 'load' })
   
    //ensure the user is redirected successfully to the Maintenance page by verifying the current page url
    await expect(dashboardPage.page).toHaveURL(routes.maintenance)

    //inserting an invalid password to access the maintenance page
    await maintenanceAccessForm.accessMaintenance(inValidPasswod)

    //verify that the validation msg of the password field shows up 
    await expect(maintenanceAccessForm.validationMsg).toBeVisible();

    //verify that the user is not redirected to the maintenance page by verifying the unexistence of the page title 
    await expect(maintenancePage.pageTitle).not.toBeVisible()
})




})