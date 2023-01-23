/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import db from '../database.js';

const { User } = db.user;

// User registration
const register = async (req, res) => {
  // check for empty value
  const obj = req.body;
  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }
  const emptyObj = isEmpty(obj);
  if (emptyObj === true || req.body.user_name === '') {
    res.status(400).json({ message: 'enter data to register' });
  } else {
    // check if user exist
    const checkUser = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    if (checkUser !== null) {
      res
        .status(400)
        .json({ message: 'user already exist' });
    }

    if (checkUser === null) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        const regInfo = {
          first_name: req.body.fname,
          last_name: req.body.lname,
          user_name: req.body.user_name,
          roleId: 1,
          password: hash,
        };

        // Save user in the User table
        await User.create(regInfo);
        res.status(200).json({
          message: 'registered successifully',
        });
      });
    }
  }
};

// handle user login
const userLogin = async (req, res) => {
  // check for the empty object
  const obj = req.body;
  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  const emptyObj = isEmpty(obj);
  if (emptyObj === true || req.body.user_name === '') {
    res.status(400).json({ message: 'enter data to login' });
  } else {
    // find user in database
    const userExist = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    if (userExist !== null) {
      // compare password with hash
      bcrypt.compare(req.body.password, userExist.password, async (err, result) => {
        if (result === true) {
          const accessToken = Jwt.sign(
            {
              user_name: userExist.dataValues.user_name,
              id: userExist.dataValues.userId,
              role: userExist.dataValues.roleId,
            },
            process.env.ACCESS_TOKEN_SECRETE,
            { expiresIn: '10m' },
          );

          const refreshToken = Jwt.sign(
            {
              user_name: userExist.dataValues.user_name,
              id: userExist.dataValues.userId,
              role: userExist.dataValues.roleId,
            },
            process.env.REFRESH_TOKEN_SECRETE,
            { expiresIn: '1d' },
          );

          const expiration = 3600000;
          // eslint-disable-next-line quotes
          res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + expiration),
          });
          res.status(200).json({
            mesage: 'successifully login',
            user: {
              first_name: userExist.dataValues.first_name,
              last_name: userExist.dataValues.last_name,
              role: userExist.dataValues.roleId,
              accessToken,
            },
          });
        } else {
          res.status(400).json({ message: 'invalid password' });
        }
      });
    } else {
      res.status(404).json({ mesage: 'user not exist' });
    }
  }
};

const logout = async (req, res) => {
  res.clearCookie(
    'refreshToken',
    {
      httpOnly: true,
      secure: true,
    },
  );
  res.sendStatus(204);
};

export {
  userLogin,
  register,
  logout,
};
