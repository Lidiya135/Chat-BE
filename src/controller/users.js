const {response} = require('../helper/common');
const {create, findEmail, updateUserData, getAll, getById} = require('../model/users');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const ModelUsers = require('../model/users')
const {generateToken, genRefreshToken} = require('../helper/auth');

const UsersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)

        if(users){
            return response(res, 404, false, "email already use"," register fail") 
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            username : req.body.username,
        
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },

    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        let payload = {
            id: users.id,
            email: users.email,
            username: users.username
        }
        users.token = generateToken(payload)
        users.refreshToken = genRefreshToken(payload)
        response(res, 200, false, users,"login success")
    },

    getAll: async (req, res) => {
        try {
          const result = await getAll();
          if (result) {
            response(res, 200, true, result.rows, 'get all users success');
          }
        } catch (err) {
          console.log(err);
          response(res, 404, false, err, ' get all users failed');
        }
    },

    getById: async (req, res) => {
        try {
          const id = req.params.id;
          const result = await getById(id);
          if (result) {
            response(res, 200, true, result.rows, 'get user by id success');
          }
          console.log(result.rows)
        } catch (err) {
          console.log(err);
          response(res, 404, false, err, ' get user by id failed');
        }
    },

    update:(req,res,next) => {
        const Port = process.env.PORT;
        const Host = process.env.HOST;
            // console.log(req.body)
        const photo = req.file.filename;
        console.log(photo,"filename photo")
            const id = req.payload.id;
            console.log(id, "id payload")
        const uri = `http://${Host}:${Port}/img/${photo}`
        req.body.photo = uri
            // console.log(uri, "photooo uri")
            console.log(req.body)
        ModelUsers.updateUserData(id,req.body)
        .then((result)=> response(res, 200, true, result.rows, "update data success"))
        .catch((err)=> response(res, 404, false, err, "update data fail"))
      },


    
}


exports.UsersController = UsersController;