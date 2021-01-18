import { Request, Response } from "express";
import moment from "moment";
import { UserBO } from "../business/bo/userBO";
import * as jwt from "jsonwebtoken";
import { environment } from "../environments/environment";
import { TelegramCodeBO } from "../business/bo/telegramCodeBO";
import User from "../entities/user";
import Person from "../entities/person";
import { getRepository } from "typeorm";

export default new (class userController {
  async checkLogin(req: Request, res: Response) {
    //Check if username and password are set
    let { enrollment, password } = req.body;
    if (!(enrollment && password)) {
      res.status(400).send();
    }

    const userBO = new UserBO();

    //Get user from database
    let user = await userBO.checkUserCredentials(enrollment, password);
    if (!user) {
      res.status(401).send({
        message: "Erro: Identificação ou senha inválidos!",
      });
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ user }, environment.SECRET, { expiresIn: "24h" });

    //Send the jwt in the response
    res.status(200).send({ token });
  }

  async register(req: Request, res: Response) {
    const { type } = req.query;
    const { username, code, password } = req.body;

    const userBO = new UserBO();

    if (type == "TELEGRAM") {
      const telegramCodesBO = new TelegramCodeBO();

      const telegramCode = await telegramCodesBO.findCodeByCodeAndType(
        code,
        "REGISTER"
      );
      if (!telegramCode) {
        res.status(401).send({
          message: "Erro: Código de cadastro inválido!",
        });
        return;
      }

      let user = await userBO.findByRef(telegramCode.ref);

      if (user) {
        res.status(401).send({
          message: "Erro: Usuário já cadastrado!",
        });
        return;
      }

      const userRepository = getRepository(User);

      user = new User();
      user.ref = String(telegramCode.ref);
      user.registerType = "TELEGRAM";
      user.registeredAt = new Date();
      user = await userRepository.save(user);

      if (!(await telegramCodesBO.deleteTelegramCode(telegramCode.ref, code))) {
        res.status(401).send({
          message: "Erro: Não foi possível deletar o código de cadastro!",
        });
        return;
      }

      res
        .status(200)
        .send({ message: "Usuário registrado com sucesso", status: "OK" });
    } else {
      let user = await userBO.checkUserCredentials(username, password);
      if (!user) {
        res.status(401).send({
          message: "Erro: Identificação ou senha inválidos!",
        });
        return;
      }
    }
  }

  async login(req: Request, res: Response) {
    const { type } = req.query;
    const { ref, username, code, password } = req.body;

    const userBO = new UserBO();

    if (type == "TELEGRAM") {
      const telegramCodesBO = new TelegramCodeBO();

      const telegramCode = await telegramCodesBO.findCodeByCodeAndType(
        code,
        "LOGIN"
      );
      if (!telegramCode) {
        res.status(401).send({
          message: "Erro: Código de login inválido!",
        });
        return;
      }

      const user = await userBO.findByRef(telegramCode.ref);

      if (!user) {
        res.status(401).send({
          message: "Erro: Usuário não identificado!",
        });
        return;
      }

      if (!(await telegramCodesBO.deleteTelegramCode(Number(user.ref), code))) {
        res.status(401).send({
          message: "Erro: Não foi possível deletar o código de cadastro!",
        });
        return;
      }

      //Sing JWT, valid for 1 hour
      const token = jwt.sign({ user }, environment.SECRET, {
        expiresIn: "24h",
      });

      //Send the jwt in the response
      res.status(200).send({ token });
    } else {
      let user = await userBO.checkUserCredentials(username, password);
      if (!user) {
        res.status(401).send({
          message: "Erro: Identificação ou senha inválidos!",
        });
        return;
      }
    }
  }
})();
