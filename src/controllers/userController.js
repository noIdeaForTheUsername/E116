const { validateTypes } = require("../utils/validationUtils");
const { hashPassword, verifyPassword, validatePassword } = require("../utils/userUtils");
const { renderErr, handleErr } = require("../utils/errorUtils");
const userModel = require("../models/userModel")


// VIEWS

async function getRegister(req, res) {
    res.render("pages/register", { message: undefined });
}

async function getLogin(req, res) {
    res.render("pages/login", {message: undefined});
}

// ACTIONS

async function postLogin(req, res) {
    let login = req.body.login;
    const pass = req.body.password;

    // Validate
    if (!pass || !login) {
        renderErr(res, "400", "Nie podano wszystkich danych");
        return;
    }

    // Convert the login to lowercase
    login = login.toLowerCase();

    // Find appropiate user
    userModel.getUserByLogin(login, async (error, savedUsers) => {
        // Handle errors
        if (error) {
            handleErr(error, res);
            return;
        }
        const savedUser = savedUsers[0];
        if (!savedUser) {
            renderErr(res, "404", "Nie znaleziono użytkownika o podanym loginie");
            return;
        }

        // Verify password and send response
        const passCorrect = await verifyPassword(pass, savedUser.passwordHash);
        if (passCorrect)
            res.render("pages/login", {message: "Dane poprawne! W tym momencie zostałbyś zalogowany, gdyby działały ciasteczka..."});
        else renderErr(res, "401", "Niepoprawne hasło");
    });
}

async function postRegister(req, res) {
    const body = req.body;

    // Validation
    const typesValid = validateTypes(
        res,
        [body.login, body.password, body.passwordRepeat],
        ["string", "string", "string"]
    );
    if (!typesValid) return;
    const passValid = await validatePassword(res, body.password, body.passwordRepeat);
    if (!passValid) return;

    // Convert the login to lowercase
    body.login = body.login.toLowerCase();

    // Check user exists
    userModel.getUserByLogin(body.login, async (error, savedUsers) => {
        // Handle errors
        if (error) {
            handleErr(error, res);
            return;
        }
        if (savedUsers.length > 0) {  // if user exists, return error
            renderErr(res, "409", "Nazwa użytkownika jest już zajęta");
            return;
        }
        
        // Hash the password
        const hash = await hashPassword(body.password);

        // Execute
        userModel.postUser(body.login, hash, (error) => {
            if (handleErr(error, res)) return;
            res.render("pages/register", { message: "Pomyślnie zarejestrowano!" });
        });
    });
}


module.exports = {getRegister, getLogin, postRegister, postLogin};