const bcrypt = require("bcrypt");
let generatepassword = async (password) => {
  let Password = await bcrypt.hashSync(password,10);
  return Password;
};

module.exports = {generatepassword};


