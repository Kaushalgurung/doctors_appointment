const AppointmentModel = require("./appointment.model");
const DataUtils = require("../../helpers/data");

const Appointment = {
  async add(data) {
    return await this.register(data);
  },
  async list(start, limit, from) {
    const $match = { is_archived: false };
    if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    const query = [{ $match }];

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: AppointmentModel,
      query,
    });
  },
  async getByDoctorId(id, start, limit, from) {
    const $match = { is_archived: false, doctor_id: id };
    if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    const query = [{ $match }];

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: AppointmentModel,
      query,
    });
  },
  async getById(_id) {
    return AppointmentModel.findOne({ _id, is_archived: false });
  },

  async register(data) {
    const user = await AppointmentModel.findOne({ email: data.email });
    const user1 = await AppointmentModel.findOne({ phone: data.phone });
    if (user) {
      throw { message: "Email already registered", code: 400 };
    }
    if (user1) {
      throw { message: "Phone already registered", code: 400 };
    }
    return await AppointmentModel.create(data);
  },
  async update(id, data) {
    const user = await AppointmentModel.findById(id);
    const user2 = await AppointmentModel.findOne({ email: data.email });
    if (!user) {
      throw { message: "Appointment not found", code: 4000 };
    } else if (data.email == user.email) {
      return await AppointmentModel.findByIdAndUpdate(id, data);
    } else if (user2) {
      throw { message: "Dublicate email", code: 4000 };
    } else {
      return await AppointmentModel.findByIdAndUpdate(id, data);
    }
  },

  async approve(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { approved: true }
    );
  },
  async archive(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async complete(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { completed: true }
    );
  },
};

module.exports = {
  Appointment,
  add: (req) => Appointment.add(req.payload),
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    return Appointment.list(start, limit, from);
  },
  getByDoctorId: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    const id = req.payload.doctor_id;
    return Appointment.getByDoctorId(id, start, limit, from);
  },
  update: (req) => {
    return Appointment.update(req.params.id, req.payload);
  },
  getById: (req) => Appointment.getById(req.params.id),
  register: (req) => Appointment.register(req.payload),
  archive: (req) => Appointment.archive(req.params.id),
  approve: (req) => Appointment.approve(req.params.id),
  complete: (req) => Appointment.complete(req.params.id),
};
