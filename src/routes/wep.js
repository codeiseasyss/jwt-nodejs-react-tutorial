import express from "express";
import homeController from '../controller/homeController';
const router = express.Router();


/**
 * @param {*} app: express app
 */
const handleHelloWord = (req, res) => {
    return res.send("Hello world");
}

const initWebRouter = (app) => {
    //path , handler
    router.get("/", homeController.handleHelloWord);
    router.get("/user", homeController.handleUserPage);
    router.post("/user/create-user", homeController.handleCreateNewUser);
    router.post("/delte-user/:id", homeController.handleDelteUser);

    return app.use("", router); 
}

export default initWebRouter;