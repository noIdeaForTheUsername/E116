const db = require("../data/connection");


function getUserById(userId, callback) {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [id], callback);
}

function getUserByLogin(login, callback) {
    const q = "SELECT * FROM users WHERE login = ? LIMIT 1;";
    db.query(q, [login], callback);
}


function postUser(login, passwordHash, callback) {
    const q = "INSERT INTO users VALUES (NULL, ?, ?)";
    db.query(q, [login, passwordHash], callback);
}

module.exports = {getUserById, getUserByLogin, postUser};