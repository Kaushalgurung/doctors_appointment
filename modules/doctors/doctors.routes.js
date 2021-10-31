const controllers = require('./doctors.controllers');
const validators = require('./doctors.validators');

const routes = {
  list: ['GET', '', 'List all Doctor', ],
  register: {
    method: 'POST',
    path: '/register',
    description: 'Add Doctor',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  archive: ['DELETE', '/{id}', 'Archive the Doctor'],
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
