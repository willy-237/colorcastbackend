import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js"
import tourRoutes from "./Routes/tourRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import path from "path";


const CURRENT_WORKING_DIR = process.cwd();
const app = express();



app.use(express.static(path.join(CURRENT_WORKING_DIR, "server/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());



app.use("/", authRoutes);


app.use("/", userRoutes);
app.use("/", tourRoutes);


app.use((err, req, res, next) => {
    if(err){
        return res.status(401).json({
            error: "une connexion est requise"
        })
    }
})








export default app;