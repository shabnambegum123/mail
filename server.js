const express = require("express");
let app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const dotenv = require("dotenv");
dotenv.config();

const router = require("./Router/router");
app.use(router);

require("./Database/modal/index");
let port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is looking for ${port}`);
});
