import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    cin: {
        type: Number,
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
}, { versionKey: false });

const User = mongoose.model("user", userSchema)

export default User