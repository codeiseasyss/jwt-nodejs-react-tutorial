// Get the client
import mysql from 'mysql2';

// Create the connection to database
const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
}); 



const handleHelloWord = (req, res) => {
  
    return res.render("home.ejs");
}

const handleUserPage = (req, res) =>
    //model => get data  from database 
{
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) =>
{
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;


  
  
// A simple SELECT query
connection.query(
    '  INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
    function (err, results, fields) {
        if(err) {
            console.log(err);
        }
    }
  );
    return res.send("handleCreateNewUser");
}

module.exports = {
    handleHelloWord, handleUserPage, handleCreateNewUser
}