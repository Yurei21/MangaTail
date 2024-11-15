const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to Mysql');
});

app.use(express.json());
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const {username, password} = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hash], (err, result) => {
            if (err) throw err;
            res.send('User registerd successfully');
        });
    });
});