const { renderErr } = require("./errorUtils");

// supported types: "int", "string" (pass as strings in fieldTypes array)
// function returns true if types match and are not empty
async function validateTypes(res, fields, fieldTypes) {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const fieldType = fieldTypes[i];

        // allow any type if fieldType undefined
        if (fieldType === undefined)
            continue;

        // Check if the field is empty
        if (field === "" || field === undefined) {
            renderErr(res, "400", "Nie podano wszystkich wymaganych danych");
            return false;  
        }

        // check the field type
        if (fieldType == "int") {
            let parsed = parseInt(field);

            if (isNaN(parsed)) {
                renderErr(res, "400", "Podane dane są niepoprawne.");
                return false;
            } 
        }
        else if (fieldType == "string") {
            let valid = typeof field == "string";
            if (!valid) {
                renderErr(res, "400", "Podane dane są niepoprawne.");
                return false;
            }
        }
    }
    return true;
}

module.exports = { validateTypes };