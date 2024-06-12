import Product from "../models/productModel.js";
import path from "path";
import fs from "fs";

export const getProduct = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const postProduct = (req, res) => {
    if (req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const brand = req.body.brand;
    const explanation = req.body.explanation;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/product/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/product/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{
            await Product.create({name: name, brand: brand, explanation: explanation, image: fileName, url: url});
            res.status(201).json({msg: "Predict Successfully"});
        }catch (error) {
            console.log(error.message);
        }
    }) 
}

export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = Product.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
        
        const filepath = `./public/product/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/product/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const name = req.body.title;
    const brand = req.body.brand;
    const explanation = req.body.explanation;
    const url = `${req.protocol}://${req.get("host")}/product/${fileName}`;
    try {
        await Product.update({name: name, brand: brand, explanation: explanation, image: fileName, url: url}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
    try {
        const filepath = `./public/product/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
            id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Successfully"});    
    } catch (error) {
        console.log(error.message);
    }
}