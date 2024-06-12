import express from "express";

import {
    getProduct,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}from "../controller/productController.js";

const router = express.Router();

router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.post('/product', postProduct);
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct);

export default router;