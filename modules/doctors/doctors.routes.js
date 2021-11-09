const controllers = require('./doctors.controllers');
const validators = require('./doctors.validators');

const routes = {
  list: ['GET', '', 'List all Doctor', ],
  register: {
    method: 'POST',
    path: '/register',
    description: 'Update',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: ["ADMIN"],
  },
  update: {
    method: 'post',
    path: '/update/{id}',
    description: 'add doctor',
    uploadpayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: ["admin"],
  },
  archive: {
    method: 'DELETE',
    path: '/{id}',
    description: 'Archive the doctor',
    permissions: ["admin"],
  },
};

function register(app) {
  app.register({
    name: 'doctors',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
