const express = require("express");
const router = express.Router();
// const db = require("../config/database");
const User = require("../models/user");
const Session = require("../models/session");
const bcrypt = require("bcryptjs-then");
const jwt = require("jsonwebtoken");

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

const getClientIp = (req) =>
  req.headers["x-forwarded-for"] || req.connection.remoteAddress;

// Get All users
router
  .get("/", (req, res) => {
    User.findAll()
      .then((user) => {
        res.json(user);
        res.sendStatus(200);
      })
      .catch((err) => console.log("err : ", err));
  })
  .post("/login", async (req, res, next) => {
    try {
      console.log(" ======> ", req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      // if (!user) return next(new Error("Email does not exist"));
      if (!user) {
        // res.status(204);
        res.status(200).json({
          status: 204,
          // error: "Email does not exist",
          error: "Couldn't find your account",
        });

        // return next(new Error("Email does not exist"));
      } else {
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) {
          res.status(203).json({
            status: 203,
            // error: "Password is not correct",
            error: "Wrong password. Try again or contact support to reset it.",
          });

          // return next(new Error("Password is not correct"));
        } else {
          const accessToken = jwt.sign(
            { userId: user.id },
            // process.env.JWT_SECRET,
            "jpH6wkETaVQAw8KL",
            {
              expiresIn: "30 days",
            }
          );

          await user
            .update({ accessToken: accessToken })
            .then((result) => {
              console.log("update succesfully");
              // res.status(201).json(user);
            })
            .catch((err) => {
              console.log("update falid");
              res.status(501);
            });

          // log user login
          await Session.create({
            userId: user.id,
            token: accessToken,
            device: req.device.type.toUpperCase(),
            clientIp: getClientIp(req),
          });

          await res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            // avatar: user.avatar,
            email: user.email,
            accessToken,
            validPassword,
          });
        }
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  })
  .post("/signup", async (req, res, next) => {
    try {
      const { fullName, email, password, role } = req.body;
      const hashedPassword = await hashPassword(password);

      const checkUser = await User.findOne({ where: { email } });

      if (checkUser) {
        res.status(200).json({
          status: 204,
          // error: "Email does not exist",
          error: "Email already exist. Please try another email.",
        });
      } else {
        let newUser = {
          fullName,
          email,
          password: hashedPassword,
          role,
        };

        const accessToken = jwt.sign(
          { userId: newUser.id },
          "jpH6wkETaVQAw8KL",
          {
            expiresIn: "1d",
          }
        );

        newUser = {
          ...newUser,
          accessToken,
        };

        User.create(newUser)
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({});
          });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

module.exports = router;
