"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
const environment_1 = require("../environments/environment");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuthorization = (req, res, next) => {
    //Get the jwt token from the head
    let token = req.headers["authorization"];
    let jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, environment_1.environment.SECRET);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    //The token is valid for 24 hours
    //We want to send a new token on every request
    const { userId, enrollment } = jwtPayload;
    const newToken = jsonwebtoken_1.default.sign({ userId, enrollment }, environment_1.environment.SECRET, {
        expiresIn: "24h",
    });
    res.header("authorization", newToken);
    //Call the next middleware or controller
    next();
};
exports.checkAuthorization = checkAuthorization;
//# sourceMappingURL=checkAuthorization.js.map