const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
    console.log('Server is running on localhost:3002');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student'
});

app.post('/register', async (req, res) => {
    const { studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, Password } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const SQL = 'INSERT INTO students (studentID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, YearGroup, Gid, pswd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, hashedPassword];

    db.query(SQL, values, (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log('registered');
            res.send({ message: 'User added' });
        }
    });
});

app.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    const SQL = 'SELECT Email, pswd FROM students WHERE Email = ?';
    const values = [loginEmail];

    db.query(SQL, values, async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else if (results.length > 0) {
            const user = results[0];

            const passwordMatch = await bcrypt.compare(loginPassword, user.pswd);
            if (passwordMatch) {
                console.log("Login successful");
                res.send(results);
            } else {
                console.log("Incorrect password");
                res.send({ message: 'Incorrect password' });
            }
        } else {
            console.log("User does not exist");
            res.send({ message: 'User does not exist' });
        }
    });
});

app.post('/list', async (req, res) => {
    const SQL = 'SELECT full_name, GPA FROM students WHERE GPA < 1.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

