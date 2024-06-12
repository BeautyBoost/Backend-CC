import express from "express";

import {
    getPhoto,
    getPhotoById,
    savePhoto,
    deletePhoto
}from "../controller/photoController.js";

const router = express.Router();

router.get('/upload', getPhoto);
router.get('/upload/:id', getPhotoById);
router.post('/upload', savePhoto);
router.delete('/upload/:id', deletePhoto);

export default router;