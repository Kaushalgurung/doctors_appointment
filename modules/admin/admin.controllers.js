const AdminModel = require('./admin.model')
require('dotenv').config('/.env');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DataUtils  = require('../../helpers/data');

const Admin= {
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
            model: AdminModel,
            query,
        });
    },
    async getById(_id) {
        return AdminModel.findOne({ _id, is_archived: false });
    },

    async register(data) {
        const {email, password } =  data;

        if(!(email && password)){
            return "All input is required";
        }
        const oldUser = await AdminModel.findOne({email});
        if(oldUser){
            return "admin already exist, please login";
        }
        const salt = parseInt(process.env.TOKEN_KEY);
        encrypted_password = await bcrypt.hash(password, salt);

        const user = await AdminModel.create({
            email: email.toLowerCase(),
            password: encrypted_password
        });
        const token = jwt.sign(
            {user_id : user._id, email, is_admin: user.is_admin},
            salt,
            {
                expiresIn: "2h",
            }
        );
        user.token  = token;
        return user;
    },
    async login(data){
        try{
            const {email, password} = data;
            if (!(email && password)) {
                return "All input is required";
            }
            const user = await AdminModel.findOne({ email });
            if (user) {
                if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign(
                        {user_id : user._id, email, is_admin: user.is_admin},
                        process.env.TOKEN_KEY,
                        {
                            expiresIn:"2h",
                        }
                    );
                    user.token = token;
                    return user;
                }
                else{
                    throw "Invalid status";
                }
            }

        } catch (err) {
            console.log(err)
            return err;
        }
    },

    async archive(id) {
        return AdminModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Admin,
    add: (req) => Admin.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Admin.list(start, limit, from);
    },
    getById: (req) => Admin.getById(req.params.id),
    register: (req) =>Admin.register(req.payload),
    login: (req) =>Admin.login(req.payload),
    archive: (req) => Admin.archive(req.params.id),
  };
