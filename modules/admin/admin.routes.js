const controllers = require('./admin.controllers');
const validators = require('./admin.validators');

const routes = {
  list: ['GET', '', 'get admin info', ],
  register: {
    method: 'POST',
    path: '/register',
    description: 'Add Admin',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: ["ADMIN"],
  },
  login: {
    method: 'POST',
    path: '/login',
    description: 'Add Admin',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  changePassword: {
    method: 'PUT',
    path: '/changepassword',
    description: 'Change Admin password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  archive: ['DELETE', '/{id}', 'Archive the Admin'],
  verifyToken: ['GET', '/validate/{token}', 'Verify Token'],
};

function register(app) {
  app.register({
    name: 'admin',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
