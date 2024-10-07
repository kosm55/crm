import Joi from 'joi';

const RegisterValidator = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.base': 'Name must be a string',
  }),
  surname: Joi.string().min(2).required().messages({
    'string.base': 'Surname must be a string',
  }),
  email: Joi.string()
    .required()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .messages({
      'string.pattern.base': 'Invalid email format',
    }),
});
export { RegisterValidator };
