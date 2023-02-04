const mysql = require("mysql");

const express = require('express');
const cors = require('cors');
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://172.22.144.1:3000"];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
app.use(cors(corsOptionsDelegate));
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "gps",
});

app.post("/test", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.send("Username recieved");
    db.query(
        "SELECT * FROM users where user_name=?;",
        username,
        (err, result) => {
            // console.log(err);
            res.send(result)
        }
    );
})
app.get("/test", (req, res) => {
    db.query(
        "SELECT * FROM users;",
        (err, result) => {
            console.log(err);
            res.send(result)
        }
    );
});

app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});