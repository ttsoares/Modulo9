import { Response } from "express";
import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

export const sucess = (res: Response, data: any) => {
  return res.status(200).json(data);
};

export const badRequest = (res: Response, message?: string) => {
  return res.status(400).json({ error: message ?? "INVALID_DATA" });
};

export const notFound = (res: Response, message?: string) => {
  return res.status(404).json({ error: message ?? "DATA_NOT_FOUND" });
};

export const serverError = (res: Response, error: Error) => {
  return res
    .status(500)
    .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
};

export const authorized = (token:string): Boolean => {
  let retorno = true
  jwt.verify(token, process.env.JWT_SECRET!, function(err, decoded) {
      if (err) {
        retorno = false; 
      }
    }
  )
  return retorno;
}

export const testAdmToken = (token: string): Boolean => {
  let retorno = true;

  jwt.verify(token, "s3gr3d0DO4dm1n", function(err) {
      if (err) {
        console.log("FALHOU TOKEN ADMIN");
        retorno = false
      }
    }
  )
  return retorno
} 

export const makeAdmToken = (): String => {
  return jwt.sign(
    {name: 'admin'}, "s3gr3d0DO4dm1n", {expiresIn: '1m'}
  )
}
