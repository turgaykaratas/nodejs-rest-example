const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.get_all);

router.get('/:productId', productController.get_product_by_id);

router.post('/', productController.create_product);

router.put('/:productId', productController.update_product);

router.delete('/:productId', productController.delete_product);

module.exports = router;