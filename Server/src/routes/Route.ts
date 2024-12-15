import express, { Router } from "express";

export default abstract class AppRoute {
    protected router: Router;
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    abstract initializeRoutes(): void

    getRouter(): express.Router{
        return this.router;
    }
}