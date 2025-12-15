const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");


// INDEX
router.get("/", orderController.getIndex);

// ----------- ORDERS -----------

// ORDER VIEWS
router.get("/orders", orderController.getOrders);
router.get("/new", orderController.getNewOrder);
router.get("/orders/:orderId/edit", orderController.getEditOrder);
router.get("/orders/:orderId", orderController.getOrder);
// ORDER MODIFICATIONS
/* these 2 were originally supposed to be PUTs, but HTML forms apparently
don't support PUT methods so there we have POSTs, but still working like PUTs
and being able to modify existing data*/
router.post("/orders", orderController.putOrder);
router.post("/orders/:orderId", orderController.putOrder);

// ----------- USERS -----------
// Views
router.get("/register", userController.getRegister);
router.get("/login", userController.getLogin);
// Actions
router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);

module.exports = router;
