import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization']; //pull jwt token from header and store in auth
  if (!auth) {
    return res
      .status(403)
      .json({ msg: 'Unautherized Access JWT token required' });
  }
  try {
    //if jwt token received verify with jwt_secret
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ msg: 'Unautherized Access JWT token required' });
  }
};

export default ensureAuthenticated;
