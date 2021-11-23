const controllers = require("./appointment.controllers");
const validators = require("./appointment.validators");

const routes = {
  list: ["GET", "", "List all Appointment"],
  update: {
    method: "PUT",
    path: "/update/{id}",
    description: "Update appointment",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: ["admin"],
  },
  register: {
    method: "POST",
    path: "/register",
    description: "Register new appointment",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
  },
  archive: {
    method: "DELETE",
    path: "/{id}",
    description: "Archive the appointment",
    permissions: ["admin"],
  },
  approve: {
    method: "PUT",
    path: "/approve/{id}",
    description: "Approve a appointment",
    permissions: ["admin"],
  },
  complete: {
    method: "PUT",
    path: "/complete/{id}",
    description: "Approve a appointment",
    permissions: ["admin"],
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get appointment By id",
  },
  getByDoctorId: {
    method: "GET",
    path: "/getbydocid/{doctor_id}",
    description: "Get appointment By doctor id",
  },
  getProblemDoc: {
    method: "GET",
    path: "/problem/{id}",
    description: "get problem file",
  },
};

function register(app) {
  app.register({
    name: "appointment",
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
