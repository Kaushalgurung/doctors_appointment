const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    description: 'Name of the Doctor',
  },
  phone: { type: String, description: "Doctor's phone" },
  email: { type: String, joi: Joi.string().email().optional().description("Doctor's email") },
  address: { type: String, description: "Doctor's hpermanent address" },
  designation: { type: String, description: "Doctor's designation" },
  description: { type: String, description: "Doctor's description" },
  ...commonSchema,
};

const DoctorSchema = mongoose.Schema(schema, {
  collection: 'doctor',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

DoctorSchema.index({ email : 1 }, { unique: true });

module.exports = mongoose.model('doctor', DoctorSchema);
