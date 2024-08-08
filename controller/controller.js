const user = require("../Database/modal/userindex");
const bcrypt = require("bcrypt");
const { generatepassword } = require("../password/bcrypt");
const jwt = require("jsonwebtoken");
const { loginService } = require("../service/service");
//const { generatepassword } = require("../password/crypto");

const createUser = async (req, res) => {
  let data = user.create();
  res.status(200).json({
    status: 200,
    message: "created",
    data: data,
  });
};

const updateUser = async (req, res) => {};

const getUser = async (req, res) => {};

const listUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  let input = req.headers.generatetoken;

  let result = await jwt.verify(input, process.env.SECRET_KEY);

  if (result) {
    let data = await user.update(
      { isDeleted: true },
      { where: { id: result.ID } }
    );
    res.status(200).json({
      status: 200,
      message: "deleted",
      data: data,
    });
  } else {
    res.send("incorrect token");
  }
};

const insertUser = async (req, res) => {
  // let info = {
  //   Name: req.body.Name,
  //   age: req.body.age,
  //   EmailId: req.body.EmailId,
  //   password: req.body.password,
  // };
  try {
    let name = {
      Name: req.body.Name,
      age: req.body.age,
      EmailId: req.body.EmailId,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
    };

    let emptyValue = [];

    let value = ["Name", "age", "password", "EmailId", "mobileNumber"];
    for (let i = 0; i < value.length; i++) {
      if (!req.body[value[i]]) {
        emptyValue.push(value[i]);
      }
    }

    if (emptyValue.length > 0) {
      return res.send(`${emptyValue.join(",")} is required`);
    }

    name.password = await generatepassword(req.body.password);
    let result = await user.findOne({ where: { EmailId: req.body.EmailId } });
    let results = await user.findOne({
      where: { mobileNumber: req.body.mobileNumber },
    });
    if (result && result.EmailId) {
      return res.status(404).json({
        status: 404,
        message: "EmailId already exist",
        data: {},
      });
    }
    if (results && results.mobileNumber) {
      return res.status(404).json({
        status: 404,
        message: "mobileNumber already exist",
        data: {},
      });
    }

    let data = await user.create(name);
    res.status(200).json({
      status: 200,
      message: "sended",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 404,
      message: error.message,
      data: {},
    });
  }
};

const tokenUser = async (req, res) => {
  var datas = req.body;

 };

const tokenUsers = async (req, res) => {
  let datas = req.body;
  let result = await loginService(datas);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  tokenUsers,
  getUser,
  listUser,
  deleteUser,
  insertUser,
  tokenUser,
};
