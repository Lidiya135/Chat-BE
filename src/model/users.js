const Pool = require("../config/db");

const create = (data) => {
    const {id,email,password,username,} = data;
    return new Promise ((resolve,reject)=>
    Pool.query(`INSERT INTO users(id,email,password,username) VALUES('${id}','${email}','${password}','${username}')`,(err,result)=>{
    if(!err){
         resolve(result)
    } else {
        reject(err)
    }
}))
}

const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
    Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
    if(!err){
        resolve(result)
    } else {
        reject(err)
    }
}))
}


const updateUserData = (id, data) =>{
    const {email, password, username, bio, photo} = data
    return Pool.query(`UPDATE users SET email='${email}',  password='${password}',username='${username}', bio='${bio}', photo='${photo}' WHERE id='${id}'`)
}

const getAll = () => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM users `, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };
  
  const getById = (id) => {
    return new Promise((resolve, reject) =>
      Pool.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  };
  

const deleteData = (id) =>{
    return Pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {
    create,
    findEmail,
    updateUserData,
    getAll,
    getById,
    deleteData
};