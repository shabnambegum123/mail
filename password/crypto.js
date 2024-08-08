 const crypto = require("crypto");
 const secretKey = process.env.SECRET_KEY;
 var secretiv = process.env.secretiv
 var encriptionmethod = 'AES-256-CBC'
 var key = crypto.createHash('sha512').update(secretKey,'utf-8').digest('hex').substring(0,32)
// const password = "test123"
// // let generatepassword = async (password) => {
// //   // const hash = await crypto.createHmac().update(password).toString("hex");
// //   // return hash;
 
//   const cipher =  crypto.createCipher('aes-256-cbc', secretKey);
//   const encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex')
// console.log(encryptedPassword) 
// };
// let decrypPassword = async() =>{
//   const decipher =  await crypto.createDecipher('aes-256-cbc', secretKey);
//   const decryptedPassword = decipher.update('22b676362fbc8932dcbb74ff77b5bf36', 'hex', 'utf8') + decipher.final('utf8')
//   console.log(decryptedPassword)
// }

// decrypPassword()

// module.exports = { generatepassword }
// module.exports = {decrypPassword}



  


