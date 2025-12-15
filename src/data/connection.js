const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "femboy-db",
    port: 3306
});

db.connect((err) => {
    if (err)
        console.error("DATABASE CONNECTION ERROR: ", err);
    else
        console.log("Connected to MySQL DB.");
});

module.exports = db;
