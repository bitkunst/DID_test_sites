require("dotenv").config();
const User = require("../../models");
const bcrypt = require("bcrypt");

const idOverlapChk = async (req, res) => {
  const { inputId } = req.body;

  try {
    const result = await User.findOne({ userId: inputId });
    if (result === null) res.json({ idCheck: true });
    else res.json({ idCheck: false });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const regist = (req, res) => {
  const { userId, userPw } = req.body;
  try {
    bcrypt.hash(userPw, 10, async (err, hash) => {
      const user = new User({ userId, userPw: hash });
      const result = await User.create(user);
      if (result) res.json({ error: 0 });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 1 });
  }
};

const login = async (req, res) => {
  const { userId, userPw } = req.body;
  try {
    const user = await User.findOne({ userId }).exec();
    bcrypt.compare(userPw, user.userPw, (err, result) => {
      if (err) throw new Error("Internal Server Error");
      if (result) {
        res.json({ error: 0 });
      } else {
        res.json({ error: 1 });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 1 });
  }
};

module.exports = {
  idOverlapChk,
  regist,
  login,
};
