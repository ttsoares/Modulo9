import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";
import { serverError, sucess, notFound, authorized } from "../../../../core/presentation/helpers/helpers";

export class DeleteMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {

		try {
			const message_id = req.params.messageid;

			const token = String(req.headers.authorization)
			console.log("Token: ", token);

			if (!authorized(token)) { // Test the token
				return res.status(409).send({message: "Token Invalido"});
			}

			const repository = new MessageRepository();
			const removedMessage = await repository.delete(message_id)

			if(!removedMessage) return notFound(res);

			// for some reason the delete function do not returns the uid
			// of the removed object...
			removedMessage.uid = message_id;

			return sucess(res, removedMessage);

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
