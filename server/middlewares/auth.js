/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
import Jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const generateAccessToken = (user) => {
  Jwt.sign(user, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: '10m' });
};

const generateRefreshToken = (user) => {
  Jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: '1d' });
};

// verifying token
const verifyaccessToken = async (req, res, next) => {
  // check if token exist
  // console.log(req.headers);
  // console.log(req.cookies);
  // check if token exist
  console.log(req.headers);
  const authHeaders = req.headers['authorization'];
  console.log(`AUTH_HEADERS: ${authHeaders}`);
  // const authHeaders = req.headers['authorization'];

  const accesstoken = req.body.accessToken || req.headers.token || authHeaders.split(' ')[1];
  if (!accesstoken) {
    return res.status(403).end('A token is required for authentication');
  }

  return Jwt.verify(
    accesstoken,
    process.env.ACCESS_TOKEN_SECRETE,
    (err, user) => {
      if (err) {
        res.status(401).end(err.message);
      } else {
        // Passing data to the next middleware
        req.userDetails = user;
        next();
      }
    },
  );
};

// verifying token
const verifyrefreshToken = async (req, res, next) => {
  console.log(`COOKIES: ${req.cookies['refreshToken']}`);
  // check if token exist
  const refreshtoken = req.cookies['refreshToken'] || req.headers.refreshtoken;
  if (!refreshtoken) {
    return res
      .status(401)
      .json({ message: 'A refresh token is required for token refreshment' });
  }

  return Jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_SECRETE,
    (err, user) => {
      if (err) {
        res.status(401).end(err.message);
      } else {
        const accessToken = Jwt.sign(
          {
            user: user.email,
            id: user.id,
            role: user.role,
            spCompanyId: user.spCompanyId,
          },
          process.env.ACCESS_TOKEN_SECRETE,
          { expiresIn: '10m' },
        );

        res.status(201).json({ role: user.role, accessToken: accessToken });
      }
      next();
    },
  );
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyaccessToken,
  verifyrefreshToken,
};
