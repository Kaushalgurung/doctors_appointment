const Doctor = require('./doctors/doctors.routes')
const Admin = require('./admin/admin.routes')
const Appointment = require('./appointment/appointment.routes')

module.exports={
    Doctor,
    Admin,
    Appointment
}