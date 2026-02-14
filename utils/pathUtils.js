import path from 'path';
import { fileURLToPath } from 'url';

//locate the current file Path
const __filename=fileURLToPath(import.meta.url)
//locate the current diectory Path
const __dirname=path.dirname(__filename)

export function resolveRoot (...segments){
    //return the images folder path and the image name should be passed as a parameter=> '...segments'
return path.resolve(__dirname , '..','fixtures',...segments)
}


    
