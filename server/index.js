const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
            console.log(err);
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