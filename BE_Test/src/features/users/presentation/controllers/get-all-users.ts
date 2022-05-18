import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { serverError, testAdmToken } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class GetAllUsersController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const admToken = String(req.headers.authorization)
			console.log("Token: ", admToken);

			// if (!testAdmToken(admToken)) {
			// 	return res.status(409).send("Nao autorizado");
			// }

			const repository = new UserRepository();
			const allUsers = await repository.getAllUsers();

			if (!allUsers) return res.status(404).send("Nenhum usuário.");

			return res.status(200).send(allUsers);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
