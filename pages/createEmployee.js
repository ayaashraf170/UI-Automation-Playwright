
import { resolveRoot } from '../utils/pathUtils';
import{expect}from'@playwright/test'
  
  class CreateEmployeePage {
    
    constructor(page) {

      this.page=page;

      this.addBtn=page.getByText(" Add ",{exact:true})

      this.firstNameInput=page.getByPlaceholder('First Name')

      this.firstNameValidationMSg=page.getByText('Required')

      this.middleNameInput=page.getByPlaceholder('Middle Name')

      this.lastNameInput=page.getByPlaceholder('Last Name')

      this.emIDInput=page.locator('(//div[contains(@class,"field-bottom-space")]//input[contains(@class,"oxd-input oxd-input")])[4]')

      this.emIDValidationMsg=page.getByText(/Employee Id already exists/i)

      this.imgInput=page.locator("//input[@type='file']")

      this.LargeAttachmentMsg=page.getByText('Attachment Size Exceeded')

      this.invalidImgMsg=page.getByText(/File type not allowed/i)

      this.createLoginDetails = page.locator("//span[contains(@class,'oxd-switch-input')]")

      this.userNameInput=page.locator("(//div[contains(@class,'oxd-form-row')])[3]//input[contains(@class,'oxd-input')]")

      this.passwordInput=page.locator("(//input[@type='password'])[1]")

      this.confirmpasswordInput=page.locator("(//input[@type='password'])[2]")

      this.enabledRadioBtn=page.getByRole('radio' ,{name:"Enabled"})

      this.disabledRadioBtn=page.getByRole('radio' ,{name:"Disabled"})

      this.submitBtn=page.getByRole('button', { name: 'Save' })

      this.successMsg=page.getByText(/Successfully Saved/i)

      this.cancelBtn=page.getByRole('Cancel')
      
    
    }



    async uploadImage(uploadedimg){

      // Upload an image only when a non-empty path is provided.
      if (uploadedimg !== '') {

        await this.imgInput.setInputFiles(resolveRoot(uploadedimg))
        
      } 

}


    async addEmployee({firstName,middleName,lastName,employeeId,uploadedimg,password,confirmPassword,checkboxStatus,radioBtnStatus}){

    //insert first name 
    await this.firstNameInput.fill(firstName);

    //insert Middle name 
    await this.middleNameInput.fill(middleName)

    //insert last name 
    await this.lastNameInput.fill(lastName)

    //insert employee ID .
    await this.emIDInput.fill(employeeId)

    //upload image using the uploadImage method
    await this. uploadImage(uploadedimg)

    //interact on the 'create login Details ' check box
    await this.createLoginDetails.setChecked(checkboxStatus)

    //fill the form of 'create login details' when checked.
      if(checkboxStatus===true){

         //insert username 
         await this.userNameInput.fill(firstName+lastName)

         //insert password 
         await this.passwordInput.fill(password)

         //fill confirm password field
         await this.confirmpasswordInput.fill(confirmPassword)
         
         //verify that 'Enabled' radio button is pre-checked 
        await expect(this.enabledRadioBtn).toBeChecked();

         //interact on the 'Disabled' radio button  
         await this.disabledRadioBtn.setChecked(radioBtnStatus) 

      }

   //click save button to create the employee
    await this.submitBtn.click()
    
    
};


  
}

  
  export {CreateEmployeePage}