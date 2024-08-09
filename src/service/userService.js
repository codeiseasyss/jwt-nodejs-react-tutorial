import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const createNewUser = (email, password, username) => 
{
    let hashPass = hashUserPassword(password);
        
    connection.query(
        '  INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if(err) {
                console.log(err);
            }
        }
      );
}


const getUserList = async () =>
{
    
// create the connection, specify bluebird as Promise
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  
    let users = [];
    //     connection.query(
    //     '  select * from users',
    //     function (err, results, fields) {
    //         if(err) 
    //         {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         console.log("run get  user  list: ", users);
    //         return users;
    //     }
    //   );
    // query database

    try{ 
        const [rows, fields] = await connection.execute ( ' select * from users' );
        return rows;
    } 
    catch(errol) {
        console.log(">>> check errol:  ", errol);
    }
    
}

module.exports = {
    createNewUser, getUserList
}