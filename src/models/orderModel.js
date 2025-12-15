const db = require("../data/connection");


function getOrders(callback, fileType=undefined, imagesNumber=undefined, orderBy=undefined, orderDir=undefined) {
    // Query base, query paramList
    let q = `SELECT * FROM orders`;
    let paramList = [];

    // Filtering
    if (fileType && imagesNumber) {
        q += ` WHERE fileType = ? AND imagesNumber = ?`;
        paramList.push(fileType, imagesNumber);
    }
    else if (fileType) {
        q += ` WHERE fileType = ?`;
        paramList.push(fileType);
    }
    else if (imagesNumber) {
        q += ` WHERE imagesNumber = ?`;
        paramList.push(imagesNumber);
    }

    // Sorting
    if (orderBy == "id" || orderBy == "imagesNumber") {
        q += ` ORDER BY ${orderBy}`;
        if (orderDir == "asc" || orderDir == "desc") {
            q += ` ${orderDir}`;
        }
    }

    // Execution
    db.query(q, paramList, callback);
}

function getOrder(orderId, callback) {
    const q = "SELECT * FROM orders WHERE id = ?";
    db.query(q, [orderId], callback);
}

function putOrder(id, description, fileType, imagesNumber, callback) {
    if (id === undefined) {  // New order
        const q = `INSERT INTO orders VALUES (NULL, ?, ?, ?)`;
        db.query(q, [description, fileType, imagesNumber], callback);
    }
    else {  // Update existing order
        const q = `UPDATE orders SET description=?, fileType=?, imagesNumber=? WHERE id=?`;
        db.query(q, [description, fileType, imagesNumber, id], callback);
    }
}

module.exports = { getOrders, getOrder, putOrder };