import Joi from 'joi';

export const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: 'Bad request', error });
  }
  next();
};
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: 'Bad request', error });
  }
  next();
};
