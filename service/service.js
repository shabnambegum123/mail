const user = require("../Database/modal/userindex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginService = async (params) => {
  if (!params.EmailId && !params.mobileNumber) {
    let emptyValue = [];
    let value = ["EmailId", "mobileNumber"];
    for (i = 0; i < value.length; i++) {
      if (!params[value[i]]) {
        emptyValue.push(value[i]);
      }
    }
    if (emptyValue.length > 0) {
      return {
        statusCode: 400,
        status: false,
        message: `${emptyValue.join(" or ")} is required`,
        data: {},
      };
    }
  } else if (!params.mobileNumber) {
    let emptyValue = [];
    let value = ["password"];
    for (i = 0; i < value.length; i++) {
      if (!params[value[i]]) {
        emptyValue.push(value[i]);
      }
    }
    if (emptyValue.length > 0) {
      return {
        statusCode: 400,
        status: false,
        message: `${emptyValue.join(" or ")} is required`,
        data: {},
      };
    } else {
      EmailId = params.EmailId;
      password = params.password;
      function validateEmail(EmailId) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(EmailId);
      }
      if (validateEmail(EmailId) == true) {
        let result = await user.findOne({
          where: { EmailId: params.EmailId },
          raw: true,
        });
        if (result) {
          let comparePass = await bcrypt.compare(password, result.password);
          if (comparePass) {
            let generateToken = await jwt.sign(result, process.env.SECRET_KEY);
            result.generateToken = generateToken;
            return {
              statusCode: 200,
              status: true,

              message: "login successfull",
              data: result,
            };
          } else {
            return {
              statusCode: 400,
              status: false,
              message: "Password incorrect",
              data: {},
            };
          }
        } else {
          return {
            statusCode: 400,
            status: false,
            message: "user not found",
            data: {},
          };
        }
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "Enter the valid EmailId",
          data: {},
        };
      }
    }
  } else {
    let emptyValue = [];
    let value = ["password"];
    for (i = 0; i < value.length; i++) {
      if (!params[value[i]]) {
        emptyValue.push(value[i]);
      }
    }
    if (emptyValue.length > 0) {
      return {
        statusCode: 400,
        status: false,
        message: `${emptyValue.join("")} is required`,
        data: {},
      };
    } else {
      mobileNumber = params.mobileNumber;
      var password = params.password;
      function validatePhoneNumber(mobileNumber) {
        const pattern = /^\d{10}$/;
        return pattern.test(mobileNumber);
      }

      if (validatePhoneNumber(mobileNumber) == true) {
        let result = await user.findOne({
          where: { mobileNumber: params.mobileNumber },
          raw: true,
        });
        if (result) {
          let comparePass = await bcrypt.compare(password, result.password);
          if (comparePass) {
            let generateToken = await jwt.sign(result, process.env.SECRET_KEY);
            result.generateToken = generateToken;
            return {
              statusCode: 200,
              status: true,
              message: "login successfull",
              data: result,
            };
          } else {
            return {
              statusCode: 400,
              status: false,
              message: "Password incorrect",
              data: {},
            };
          }
        } else {
          return {
            statusCode: 404,
            status: false,
            message: "user not found",
            data: {},
          };
        }
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "Enter 10 digit valid  Mobile Number",
          data: {},
        };
      }
    }
  }
};

module.exports = {
  loginService,
};
