import mongoose, { Schema } from "mongoose";

const userChema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    phone: String,
});

export default mongoose.model("Users", userChema);