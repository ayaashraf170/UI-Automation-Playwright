import{searchKeys} from "../utils/searchKey"
import {fakeData} from '../utils/fakedata';

 
export const status={enabled:'Enabled',disabled:'Disabled',empty:'-- Select --'}


export const roles={admin:'Admin',ess:'Ess',empty:'-- Select --'}

//generating dynamic data for creating an admin
export const adminDetails=
         (overrides={})=>{
            const password=fakeData.randomPassword();
            
            const defaultData={
                role:roles.admin, 
                searchKeys:searchKeys.validSearchKey,
                userName:fakeData.randomUsername(),
                status:status.enabled,
                password:password ,
                confirmPassword:password
        
        
        };

        return{

            ...defaultData , ...overrides
        };
        };
