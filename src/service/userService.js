import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const createNewUser =  async(email, password, username) => 
{
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    }
    catch(errol) {
        console.log("check errol:  ", errol);
    }
   

}


const getUserList = async () =>
{
    //test reletionships
    let newUser = await  db.User.findOne({
        where: {id: 1 },
        attributes: ["id", "username", "email"],
        include: {model: db.Group,  attributes: ["name", "description"],},
        raw: true,
        nest: true
     })

    // let roles = await db.Group.findOne({
    //     where: {id: 1 },
    //     include: { model: db.Role},
    //     raw: true,
    //     nest: true
    // })

    let r = await db.Role.findAll({
        include: {model: db.Group, where: { id: 1}},
        raw: true,
        nest: true
    })
    
    console.log(">>>>>> check new user:  ", newUser)
    console.log(">>>>>> check new role:  ", r)




    let users = [];
    users = await db.User.findAll();
    return users;
// create the connection, specify bluebird as Promise
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird,
//   });
//     try{ 
//         const [rows, fields] = await connection.execute ( ' select * from user' );
//         return rows;
//     } 
//     catch(errol) {
//         console.log(">>> check errol:  ", errol);
//     }

}

const deleteUser = async (userId) => 
{
    await db.User.destroy({
        where: {id: userId}
    })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    //   });
    //     try{ 
    //         const [rows, fields] = await connection.execute ( 'DELETE FROM user WHERE id = ?', [id]);
    //         return rows;
    //     } 
    //     catch(errol) {
    //         console.log(">>> check errol:  ", errol);
    //     }
        
}

const getUserById = async (id) =>
{
    let user = {};
    user = await db.User.findOne({
        where: { id: id}
    })
    return user.get({plain: true});
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    //   });
    //     try{ 
    //         const [rows, fields] = await connection.execute ( 'select * FROM user WHERE id = ?', [id]);
    //         return rows;
    //     } 
    //     catch(errol) {
    //         console.log(">>> check errol:  ", errol);
    //     }
}

const updateUserInfor = async (email, username, id) =>
{
    await db.User.update(
        {email: email, username: username},
        {
            where: {id: id}
        }
    );
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    //   });
    //     try{ 
    //         const [rows, fields] = await connection.execute ( 'UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
    //         return rows;
    //     } 
    //     catch(errol) {
    //         console.log(">>> check errol:  ", errol);
    //     }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}