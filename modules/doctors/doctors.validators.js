const Joi = require('joi-oid');

module.exports = {
  add: {
    payload: Joi.object({
      name: Joi.string().description('doctor Name'),
      phone: Joi.string().optional().description('doctor phone'),
      email: Joi.string().optional().description('doctor email'),
      address: Joi.string().optional().description('doctor physical address'),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      name: Joi.string().description('Doctor Name'),
      phone: Joi.string().optional().description('doctor phone'),
      email: Joi.string().optional().description('doctor email'),
      address: Joi.string().optional().description('doctor physical address'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
