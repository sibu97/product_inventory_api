const express = require('express');

const router = express.Router();

const productApi = require('../controllers/product_controller')

router.get('/',productApi.index);

router.delete('/:id',productApi.deleteProduct);

router.post('/create',productApi.addProduct);

router.post('/:id/update_quantity',productApi.updateProduct);



module.exports = router;