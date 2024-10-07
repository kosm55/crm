import Joi from 'joi';

const PasswordValidator = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'min 1 digit, min 1 uppercase, min 1 lowercase, min 1 special character, 8-20 characters',
    }),
  confirm_password: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'passwords does not match',
  }),
});

export { PasswordValidator };
