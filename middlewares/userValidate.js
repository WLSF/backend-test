const { body, validationResult } = require('express-validator');
const {
  NULL_EMAIL,
  NULL_PASSWORD,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
} = require('../services/errors');

const errMessage = (message) => ({
  message,
});

const loginValidationRules = [
  body('email', errMessage(NULL_EMAIL)).exists(),
  body('password', errMessage(NULL_PASSWORD)).exists(),
  body('email', errMessage(EMPTY_EMAIL)).custom((value) => value !== ''),
  body('password', errMessage(EMPTY_PASSWORD)).custom((value) => value !== ''),
];

const validate = (schemas, status) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  return res.status(status).json(errors[0].msg);
};

module.exports = {
  loginValidate: validate(loginValidationRules, 400),
};
