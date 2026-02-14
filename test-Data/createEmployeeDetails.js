import {fakeData} from "../utils/fakedata"

import { filesData } from "../test-Data/uploadedfilesData";

export const checkboxSatus={checked:true , unchecked:false}

//generating dynamic data for creating an employee
export const employeeDetails=
         (overrides={})=>{
            
            const password=fakeData.randomPassword();
            const defaultData={

                firstName:fakeData.randomFirstname(), 
                middleName:fakeData.randomMiddlename(),
                lastName:fakeData.randomLastname(),
                employeeId:fakeData.randomValidId(),
                uploadedimg:filesData[1].name ,
                password:password,
                confirmPassword:password,
                checkboxStatus:checkboxSatus.checked,
                radioBtnStatus:checkboxSatus.unchecked
    
        };

        return{

            ...defaultData , ...overrides
        };

        };

