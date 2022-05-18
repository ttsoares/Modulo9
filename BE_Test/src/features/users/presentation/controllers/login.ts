import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { UserRepository } from "../../infra/repositories/user.repository";
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';
import { serverError, badRequest } from "../../../../core/presentation/helpers/helpers";
import md5 from 'md5';

export class LoginUserController implements Controller{
  async handle(req: Request, res: Response): Promise<any> {
		try {
      const { name, password } = req.body;

      // Process for admin
      if (name === 'admin') {
        if(md5(`admin${password}`) !== 'f14cf4eca31dac45702e5b4a24975337'){
          res.status(500).send(false);
        }
        jwt.sign(
          {name: "admin"},
          "s3gr3d0DO4dm1n",
          {expiresIn: '1d'},
          (err, token) => {
            if (err) {res.status(500).send(err);}
            res.status(200).json({ token })
          }
        )
        return  
      } 
    
      // Process for regular users
      const repository = new UserRepository();
      const userExists = await repository.findByName(name);

      if (!userExists) return badRequest(res, "Usuário não encontrado");
      if (userExists.password !== password) return badRequest(res,"Senha errada");

      if (process.env.JWT_SECRET) {
        jwt.sign(
          {id:userExists.uid, name: userExists.name},
          process.env.JWT_SECRET,
          {expiresIn: '1h'},
          (err,token) => {
            if (err) {res.status(500).send(err);}
            res.status(200).json({ token })
          }
        )
    } else res.status(500).send("GURU MEDITATION !!")

    } catch (err:any) {
      return serverError(res, err);
    }
  }
}
