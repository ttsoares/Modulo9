import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";
import { serverError, notFound, authorized } from "../../../../core/presentation/helpers/helpers";

export class GetAllMessagesController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const user_id = req.params.userid;

			const token = String(req.headers.authorization)
			console.log("Token: ", token);

			if (!authorized(token)) { // Test the token
				return res.status(409).send({message: "Token Invalido"});
			}		

			const repository = new MessageRepository();
			const allMessages = await repository.getAll(user_id)

			// returns an empty array to help front end
			if(!allMessages.length) return res.status(200).send([]);

			return res.status(200).send(allMessages);

} catch (err:any) {
			console.log(err)
			return serverError(res, err);
		}
	}
}
