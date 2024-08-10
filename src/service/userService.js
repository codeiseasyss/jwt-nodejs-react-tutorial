import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const createNewUser =  async(email, password, username) => 
{
    let hashPass = hashUserPassword(password);
        
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = 
            await connection.execute ( 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',  
                [email, hashPass, username] );
    }
    catch(errol) {
        console.log("check errol:  ", errol);
    }
   

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
    try{ 
        const [rows, fields] = await connection.execute ( ' select * from users' );
        return rows;
    } 
    catch(errol) {
        console.log(">>> check errol:  ", errol);
    }
    
}

const deleteUser = async (id) => 
{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
        try{ 
            const [rows, fields] = await connection.execute ( 'DELETE FROM users WHERE id = ?', [id]);
            return rows;
        } 
        catch(errol) {
            console.log(">>> check errol:  ", errol);
        }
        
}

const getUserById = async (id) =>
{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
        try{ 
            const [rows, fields] = await connection.execute ( 'select * FROM users WHERE id = ?', [id]);
            return rows;
        } 
        catch(errol) {
            console.log(">>> check errol:  ", errol);
        }
}

const updateUserInfor = async (email, username, id) =>
{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
        try{ 
            const [rows, fields] = await connection.execute ( 'UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
            return rows;
        } 
        catch(errol) {
            console.log(">>> check errol:  ", errol);
        }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}