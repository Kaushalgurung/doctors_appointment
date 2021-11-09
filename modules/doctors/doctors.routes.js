const controllers = require('./doctors.controllers');
const validators = require('./doctors.validators');

const routes = {
  list: ['GET', '', 'List all Doctor', ],
  update: {
    method: 'PUT',
    path: '/update/{id}',
    description: 'Update Doctor',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: ["admin"],
  },
  register: {
    method: 'POST',
    path: '/register',
    description: 'Register new doctor',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: ["ADMIN"],
  },
  archive: {
    method: 'DELETE',
    path: '/{id}',
    description: 'Archive the doctor',
    permissions: ["admin"],
  },
  getById: {
    method: 'GET',
    path: '/{id}',
    description: 'Get Doctor By id',
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
