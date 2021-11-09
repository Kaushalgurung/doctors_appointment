const Joi = require("joi");
const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    description: "Patient's name",
  },
  doctor_id: { type: String, description: "Doctor's id", required: true },
  gender: {
    type: String,
    joi: Joi.string().email().optional().description("Doctor's email"),
    unique: true,
  },
  email: { type: String, description: "Patient's email" },
  phone: { type: String, description: "Patient's phone number" },
  medical_problem: {
    type: String,
    description: "Description of medical problem",
  },
  ...commonSchema,
};

const AppointmentSchema = mongoose.Schema(schema, {
  collection: "appointment",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

AppointmentSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("appointment", AppointmentSchema);
