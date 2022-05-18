import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"

import { serverError, sucess, testAdmToken, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetOneUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
		const user_id = req.params.userid

		const admToken = String(req.headers.authorization)
		console.log("Token: ", admToken);

		// if (!testAdmToken(admToken)) {
		// 	return res.status(409).send("Nao autorizado");
		// }

		const repository = new UserRepository();
    const user  = await repository.findById(user_id);

		if (!user) return notFound(res, "Usuário não encontrado !");

    return sucess(res, user);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
