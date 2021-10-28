import express from "express";
import mongoose from "mongoose";
import routers from "./router";
import dotenv from "dotenv";

dotenv.config();

class App {

    constructor() {
        this.server = express();
        this.middlewer();
        this.database();
        this.router();
    }

    middlewer() {
        this.server.use(express.json());
    }

    database() {
        mongoose.connect(process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;

        db.on("error", error => console.log(error));
        db.once("open", () => console.log("Mongo database is connceted"));
    }

    router() {
        this.server.use(routers);
    }

}

export default new App().server;