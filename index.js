import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import photoRoute from "./routes/photoRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(photoRoute);
app.use(productRoute);

app.listen(5000, ()=> console.log('Server Up and Running on port 5000'));