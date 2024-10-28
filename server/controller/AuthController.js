import UserModel from '../model/UserRegSchema.js';
import DemoSchema from '../model/SecondSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//POST - REGISTER USER
export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate that email is exist or not
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: 'User is already exist', success: false });
    }
    //now create constant in which all value assigned
    const userData = new UserModel(req.body);
    //incrypt password
    userData.password = await bcrypt.hash(password, 10);
    const savedData = await userData.save();
    res.status(201).json({ msg: 'Signup successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error', success: false });
  }
};

//POST CHECK PASSWORD VALIDATION DURING LOGIN

export const logIn = async (req, res) => {
  const errmsg = 'Authentication failed Wrong email or password';
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ msg: errmsg, success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ msg: errmsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '6hr' }
    );
    res.status(201).json({
      msg: 'Login success',
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(403).json({ msg: errmsg, success: false });
    console.log(error);
  }
};
//POST REQUEST TO SECOND SCHEMA

export const create = async (req, res) => {
  try {
    const demoData = new DemoSchema(req.body);
    console.log(demoData);
    if (!demoData) {
      return res.status(404).json({ msg: 'Data not found', success: false });
    }
    const savedData = await demoData.save();
    res
      .status(201)
      .json({ msg: 'Data saved successfully', data: savedData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
