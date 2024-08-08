const {
  createUser,
  updateUser,
  getUser,
  listUser,
  deleteUser,
  insertUser,
  tokenUser,
  tokenUsers,
} = require("../controller/controller");

const router = require("express").Router();

router.post("/create/user", createUser);
router.post("/insert/user", insertUser);
router.post("/token/user", tokenUsers);
router.put("/update/user", updateUser);
router.get("/get,user", getUser);
router.get("/getlist/user", listUser);
router.delete("/delete/user", deleteUser);

module.exports = router;
