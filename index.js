import express from "express"
//import dotenv from "dotenv"
import mongoose, { connect } from "mongoose"

import authRoute from "./routes/auth.js"
import productRoute from "./routes/products.js"
import uploadRoute from "./routes/upload.js"
import paymentRoute from "./routes/payment.js"
import orderRoute from "./routes/order.js"
import userRoute from "./routes/users.js"


import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"


dotenv.config()
const app = express()
app.listen(process.env.PORT, () => {
    connection()
    console.log("server running on port 8000");
})

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect to mongodb")
    } catch (error) {
        throw error
    }
}

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
const __dirname = path.resolve();
console.log(path.join(__dirname, "images"));
app.use("/images", express.static(path.join(__dirname, "images")))


// Routes
app.use("/api/auth/", authRoute)
app.use("/api/product/", productRoute)
app.use("/api/upload/", uploadRoute)
app.use("/api/payment", paymentRoute)
app.use("/api/order", orderRoute)
app.use("/api/user", userRoute)


mongoose.connection.on("connected", () => {
    console.log("mongo connected");
})
mongoose.connection.on("disconnected", () => {
    console.log("mongo disconnected");
})
