import { Router } from "express";
import authController from "./controllers/authController";

const routes = Router();

routes.post("/login.php", authController.login);
routes.post("/register", authController.register);

// routes.get("/users/list", [checkAuthorization], pedidoController.list);

export default routes;
