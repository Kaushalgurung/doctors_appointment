const Joi = require('joi-oid');

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      name: Joi.string().description('Doctor Name'),
      phone: Joi.number().optional().description('doctor phone'),
      email: Joi.string().description('doctor email'),
      address: Joi.string().optional().description('doctor physical address'),
      designation: Joi.string().optional().description('doctor designation'),
      description: Joi.string().optional().description('doctor description'),
    }),
  },
  update: {
    payload: Joi.object({
      name: Joi.string().description('Doctor Name'),
      phone: Joi.number().optional().description('doctor phone'),
      email: Joi.string().description('doctor email'),
      address: Joi.string().optional().description('doctor physical address'),
      designation: Joi.string().optional().description('doctor designation'),
      description: Joi.string().optional().description('doctor description'),
    }),
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
