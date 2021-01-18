import { Request, Response, NextFunction } from "express";
import { environment } from "../environments/environment";
import jwt from "jsonwebtoken";

export const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  let token = <string>req.headers["authorization"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, environment.SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 24 hours
  //We want to send a new token on every request
  const { userId, enrollment } = jwtPayload;
  const newToken = jwt.sign({ userId, enrollment }, environment.SECRET, {
    expiresIn: "24h",
  });
  res.header("authorization", newToken);

  //Call the next middleware or controller
  next();
};
