// const env = require('./environment');
// const path=require('path');
// const fs = require('fs');
// module.exports =(app) =>{
//     app.locals.assetPath = function(filePath){
//         if(env.name=='develpment'){
//             return filePath;
//         }
//         return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../assets')))(filePath);
//     }
// }