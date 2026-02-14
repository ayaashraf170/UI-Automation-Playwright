
import {fakeData} from '../utils/fakedata';
  

//storing the valid credential to login and generating random invlaid credentialls
export const loginCred={
        
    Admin:{username:"Admin",password:"admin123"},


    invalidCred:()=>{
     return {username:fakeData.randomUsername(),password:fakeData.randomPassword()}
     
        }

};









            



    

