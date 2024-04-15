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
    const { studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, Password, Major } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);
    let fullName = `${Firstname} ${Lastname}`;

    let SQL;
    let values;

    if (Undergrad === '1') {
        SQL = 'INSERT INTO students (studentID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, YearGroup, Gid, pswd, full_name, majorID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        values = [studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, hashedPassword, fullName, Major];
    } else if (Undergrad === '2') {
        // Assuming a different database connection for non-undergraduates
        SQL = 'INSERT INTO gradstudents (gradstudentID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, YearGroup, Gid, pswd, full_name, gradmajorID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        values = [studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, hashedPassword,fullName, Major];
    } else {
        return res.status(400).send({ error: 'Invalid value for Undergrad' });
    }

    db.query(SQL, values, (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log('registered');
            res.send({ message: 'User added' });
        }
    });
});

app.post('/faregister', async (req, res) => {
    const { facultyID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, Password } = req.body;
    let fullName = `${Firstname} ${Lastname}`;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const SQL = 'INSERT INTO faculty (FID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, pswd, full_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    const values = [facultyID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, hashedPassword,fullName];

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
    const { userType, loginEmail, loginPassword } = req.body;
  
    let SQL = '';
    let values = [];
  
    switch (userType) {
      case 'undergrad':
        SQL = 'SELECT full_name, Email, pswd FROM students WHERE Email = ?';
        break;
      case 'grad':
        SQL = 'SELECT full_name, Email, pswd FROM gradstudents WHERE Email = ?';
        break;
      case 'faculty':
        SQL = 'SELECT full_name, Email, pswd FROM faculty WHERE Email = ?';
        break;
      default:
        res.send({ message: 'Invalid user type' });
        return;
    }
  
    values = [loginEmail];
  
    db.query(SQL, values, async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.send({ error: err });
      } else if (results.length > 0) {
        const user = results[0];
  
        const passwordMatch = await bcrypt.compare(loginPassword, user.pswd);
        if (passwordMatch) {
          console.log('Login successful');
          res.send(user.full_name);
        } else {
          console.log('Incorrect password');
          res.send({ message: 'Incorrect password' });
        }
      } else {
        console.log('User does not exist');
        res.send({ message: 'User does not exist' });
      }
    });
  });
  



app.post('/list', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA < 1.5  LIMIT 5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/deanlist', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA> 3.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/probationlist', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA < 1.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});


app.post('/probationlist', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA < 1.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/messages', async (req, res) => {
    const SQL = `
        SELECT m.message, s.full_name, s.YearGroup
        FROM messages m
        INNER JOIN students s ON m.studentID = s.studentID`;
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});
