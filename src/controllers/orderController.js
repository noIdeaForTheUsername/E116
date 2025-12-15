const orderModel = require("../models/orderModel");
const {handleErr, renderErr} = require("../utils/errorUtils");
const { validateTypes } = require("../utils/validationUtils");

// VIEWS

async function getIndex(req, res) {
    res.render("pages/index");
}

async function getOrders(req, res) {
    const q = req.query || {};

    orderModel.getOrders((error, orders) => {
        if (handleErr(error, res)) return;
        
        res.render("pages/orderList", { orders });
    }, q.fileType, q.imagesNumber, q.sortingField, q.sortingOrder);
}

async function getOrder(req, res) {
    orderModel.getOrder(req.params.orderId, (error, orders) => {
        if (handleErr(error, res)) return;
        if (orders.length == 0) {
            renderErr(res, "404", "Nie znaleziono zamówienia o podanym w adresie URL numerze.");
            return;
        }
        res.render("pages/orderDetails", {order: orders[0], message: undefined});
    });
}

async function getNewOrder(req, res) {
    res.render("pages/orderForm", { userId: req.params.userId, message: undefined, editedOrder: undefined });
}

async function getEditOrder(req, res) {
    orderModel.getOrder(req.params.orderId, (error, orders) => {
        if (handleErr(error, res)) return;
        if (orders.length == 0) {
            renderErr(res, "404", "Nie znaleziono zamówienia o podanym w adresie URL numerze.");
            return;
        }
        
        res.render("pages/orderForm", { userId: req.params.userId, message: undefined, editedOrder: orders[0] });
    });
    
}


// DATA MODIFICATIONS

async function putOrder(req, res) {
    const body = req.body;

    // Validate
    let dataValid = await validateTypes(
        res,
        [body.description, body.fileType, body.imagesNumber],
        ["string", "string", "int"]
    );
    if (!(dataValid)) return;

    // Add/update order
    orderModel.putOrder(
        req.params.orderId || undefined,
        body.description,
        body.fileType,
        body.imagesNumber,
        (error) => {
            if (handleErr(error, res)) return;
            res.render("pages/orderForm", {message: "Pomyślnie dodano/edytowano zamówienie!", editedOrder: undefined });
        }
    )
}

module.exports = { getIndex, getOrders, getNewOrder, getEditOrder, getOrder, putOrder };