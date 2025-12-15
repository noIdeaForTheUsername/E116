const bcrypt = require("bcrypt");
const {renderErr} = require("./errorUtils")

async function hashPassword(plaintext) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(plaintext, salt);
    return hash;
}

async function verifyPassword(passwordPlaintext, passwordHash) {
    const correct = await bcrypt.compare(passwordPlaintext, passwordHash);
    return correct;
}

async function validatePassword(res, password, passwordRepeat) {
    if (password != passwordRepeat) {
        renderErr(res, "400", "Podane hasła nie zgadzają się ze sobą");
        return false;
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        renderErr(res, "400", "Hasło musi zawierać wielką i małą literę");
        return false;
    }
    if (!/[0-9]/.test(password)) {
        renderErr(res, "400", "Hasło musi zawierać cyfrę");
        return false;
    }
    if (password.length < 8) {
        renderErr(res, "400", "Hasło musi zawierać minimum 8 znaków");
        return false;
    }
    return true;
}

module.exports = { hashPassword, verifyPassword, validatePassword };