const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders');

router.get('/', orderController.get_all);

router.post('/', orderController.create_order);

router.get("/:orderId", orderController.get_order_by_id);

router.delete('/:orderId', orderController.delete_order);

module.exports = router;