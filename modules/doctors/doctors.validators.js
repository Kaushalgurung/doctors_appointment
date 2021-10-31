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
      phone: Joi.string().optional().description('doctor phone'),
      email: Joi.string().optional().description('doctor email'),
      address: Joi.string().optional().description('doctor physical address'),
      designation: Joi.string().optional().description('doctor designation'),
      description: Joi.string().optional().description('doctor description'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
