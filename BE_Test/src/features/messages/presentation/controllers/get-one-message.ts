import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";
import { serverError, sucess, authorized, notFound } from "../../../../core/presentation/helpers/helpers";

export class GetOneMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const message_id = req.params.messageid;

			const token = String(req.headers.authorization)
			console.log("Token: ", token);

			if (!authorized(token)) { // Test the token
				return res.status(409).send({message: "Token Invalido"});
			}
			
			const repository = new MessageRepository();
			const oneMessage = await repository.getByUid(message_id)

			if (!oneMessage)  return notFound(res, "Mensagem não encontrada !");

			return sucess(res, oneMessage);

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
