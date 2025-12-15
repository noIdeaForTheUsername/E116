function handleErr(error, res=undefined) {
    if (error) {
        console.log("SERVER ERROR: ", error);
        renderErr(res, "500", "Wystąpił błąd serwera");
        return true;
    }
    else return false;
}

async function renderErr(res, code, message) {
    res.status(parseInt(code)).render("pages/error", { code, message });
}

module.exports = { handleErr, renderErr };