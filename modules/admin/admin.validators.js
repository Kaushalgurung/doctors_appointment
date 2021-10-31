const Joi = require('joi-oid');

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      email: Joi.string().optional().description('admin email'),
      password: Joi.string().optional().description('admin password'),
    }),
  },
  login: {
    payload: Joi.object({
      email: Joi.string().optional().description('admin email'),
      password: Joi.string().optional().description('admin password'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
