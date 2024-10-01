import Joi from 'joi';

const OrderValidator = Joi.object({
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
  phone: Joi.string()
    .pattern(
      /^(?:\+?\d{1,3})?\s?-?\(?\d{1,3}\)?\s?-?\d{1,3}\s?-?\d{3,5}\s?-?\d{4}(?:\s?-?\d{3})?(?:\s?\w{1,10}\s?\d{1,6})?$/,
    )
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Invalid phone number format',
    }),
  age: Joi.number().min(16).max(99).allow(null, '').messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be at least 16',
    'number.max': 'Age must be less than 99',
  }),
  sum: Joi.number().positive().allow(null, '').messages({
    'number.base': 'Sum must be a number',
    'number.positive': 'Sum must be positive',
  }),
  already_paid: Joi.number().positive().allow(null, '').messages({
    'number.base': 'Already paid amount must be a number',
    'number.positive': 'Already paid amount must be positive',
  }),
  group: Joi.string().optional().allow(null, ''),
  status: Joi.string().optional().allow(null, ''),
  course: Joi.string().optional().allow(null, ''),
  course_format: Joi.string().optional().allow(null, ''),
  course_type: Joi.string().optional().allow(null, ''),
});

export { OrderValidator };
