const Joi = require('joi-oid');


module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      name: Joi.string().description("Patients Name"),
      doctor_id: Joi.string().description("Doctor's id"),
      phone: Joi.number().optional().description("Patient's phone"),
      email: Joi.string().description("Patient's email"),
      gender: Joi.string().description("patient's gender"),
      medical_problem: Joi.string()
        .optional()
        .description("medicial problem edscription"),
      problem_doc: Joi.any().meta({ swaggerType: 'file' }).description('Issuer Documents'),
    }),
  },
  update: {
    payload: Joi.object({
      name: Joi.string().description("Patients Name"),
      phone: Joi.number().optional().description("Patient's phone"),
      email: Joi.string().description("Patient's email"),
      gender: Joi.string().description("patient's gender"),
      medical_problem: Joi.string()
        .optional()
        .description("medicial problem edscription"),
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
  approve: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  complete: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  getByDoctorId: {
    params: Joi.object({
      doctor_id: Joi.objectId(),
    }),
  },
  getProblemDoc: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
