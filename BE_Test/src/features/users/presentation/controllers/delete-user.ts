import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"
import { serverError, sucess, badRequest, testAdmToken } from "../../../../core/presentation/helpers/helpers";

export class DeleteUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
		const user_id = req.params.userid;

		const admToken = String(req.headers.authorization)
		console.log("Token: ", admToken);

		// if (!testAdmToken(admToken)) {
		// 	return res.status(409).send("Nao autorizado");
		// }

		const repository = new UserRepository();
    const removedUser = await repository.deleteUser(user_id);

		if (!removedUser) return badRequest(res, "Usuário não encontrado !");

		return sucess(res, removedUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
