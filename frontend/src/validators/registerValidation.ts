import Joi from 'joi';

const RegisterValidation = Joi.object({
  name: Joi.string().allow(null, '').messages({
    'string.base': 'Name must be a string',
  }),
  surname: Joi.string().allow(null, '').messages({
    'string.base': 'Surname must be a string',
  }),
  email: Joi.string()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Invalid email format',
    }),
});
export { RegisterValidation };
