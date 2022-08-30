require("dotenv").config();
const User = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const idOverlapChk = async (req, res) => {
  const { inputId } = req.body;

  try {
    const result = await User.findOne({ userId: inputId });
    if (result === null) res.json({ idCheck: true });
    else res.json({ idCheck: false });
  } catch (err) {
    console.log(err);
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
      if (err) throw new Error("Internal Server Error");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { userId, userPw } = req.body;
  try {
    const user = await User.findOne({ userId }).exec();
    if (user) {
      bcrypt.compare(userPw, user.userPw, (err, result) => {
        if (err) throw new Error("Internal Server Error");
        if (result) {
          console.log(user);
          const { userCode, userId, point } = user;
          // 타 사이트 포인트 조회 코드 추가
          const userInfo = { userCode, userId, point };
          const secretKey = process.env.SALT;
          const options = { expiresIn: "7d" };

          jwt.sign(userInfo, secretKey, options, (err, token) => {
            if (err) throw new Error("Internal Server Error");
            else res.json({ error: 0, loginCheck: true, token });
          });
        } else {
          res.json({ error: 1, loginCheck: false });
        }
      });
    } else {
      res.json({ error: 1, loginCheck: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const sendToken = (req, res) => {
  const { userToken: token } = req.body;
  const secretKey = process.env.SALT;

  // 타 사이트 포인트 조회 코드 추가

  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) throw new Error("Internal Server Error");
      else {
        const { userCode, userId, point } = decoded;
        const result = { userCode, userId, point };
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getPoint = async (req, res) => {
  const { userData } = req.body;
  try {
    const user = await User.findOne({ userId: userData.userId }).exec();
    const updatedUser = await User.findOneAndUpdate(
      { userId: user.userId },
      { point: user.point + 100 },
      { new: true }
    );
    const { userCode, userId, point } = updatedUser;

    // 타 사이트 포인트 조회 코드 추가

    const updatedUserInfo = { userCode, userId, point };
    // console.log(point);
    const secretKey = process.env.SALT;
    const options = { expiresIn: "7d" };

    jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
      if (err) throw new Error("Internal Server Error");
      else res.json({ error: 0, updateCheck: true, token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const buyItem = async (req, res) => {
  const { userData, itemPrice } = req.body;

  try {
    if (userData.point < itemPrice) res.json({ error: 1, result: false });
    else {
      const user = await User.findOne({ userId: userData.userId }).exec();
      console.log(user);
      const updatedUser = await User.findOneAndUpdate(
        { userId: user.userId },
        { point: user.point - itemPrice },
        { new: true }
      );

      const { userCode, userId, point } = updatedUser;

      // 타 사이트 포인트 조회 코드 추가

      const updatedUserInfo = { userCode, userId, point };
      // console.log(point);
      const secretKey = process.env.SALT;
      const options = { expiresIn: "7d" };
      jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
        if (err) throw new Error("Internal Server Error");
        else res.json({ error: 0, result: true, token });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  idOverlapChk,
  regist,
  login,
  sendToken,
  getPoint,
  buyItem,
};
