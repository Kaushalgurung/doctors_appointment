const DoctorModel = require('./doctors.model')
const DataUtils  = require('../../helpers/data');

const Doctor = {
    async add(data) {
        return await this.register(data);
    },
    async list(start, limit, from) {
        const $match = { is_archived: false };
        if (from) $match.from = { $regex: new RegExp(`${from}`), $options: 'gi' };
        const query = [{ $match }];

        return DataUtils.paging({
            start,
            limit,
            sort: { created_at: -1 },
            model: DoctorModel,
            query,
        });
    },
    async getById(_id) {
        return DoctorModel.findOne({ _id, is_archived: false });
    },

    async register(data) {
        return await DoctorModel.create(data);
    },

    async archive(id) {
        return DoctorModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Doctor,
    add: (req) => Doctor.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Doctor.list(start, limit, from);
    },
    getById: (req) => Doctor.getById(req.params.id),
    register: (req) => Doctor.register(req.payload),
    archive: (req) => Doctor.archive(req.params.id),
  };
