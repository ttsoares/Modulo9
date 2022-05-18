import { Router } from 'express';
import { CreateMessageController } from '../controllers/create-message';
import { DeleteMessageController } from '../controllers/delete-message';
import { GetAllMessagesController } from '../controllers/get-all-messages';
import { GetOneMessageController } from '../controllers/get-one-message';
import { UpdateMessageController } from '../controllers/update-message';

export default class MessageRoutes{
    public init(): Router {
        const routes = Router();

        // ADD MESSAGES TO AN USER
        //routes.post('/addusermsg/:userid', controller.storeMsgs);
        routes.post('/message/:userid', new CreateMessageController().handle);

        // GET ALL MESSAGES FROM AN USER
        //routes.get('/usermsgs/:userid', controller.indexMsgs);
        routes.get('/messages/:userid', new GetAllMessagesController().handle);

        // DELETE MESSAGES FROM AN USER
        routes.delete('/message/:messageid', new DeleteMessageController().handle);

        // RETURN ONE MESSAGE FROM AN USER
        routes.get('/message/:messageid', new GetOneMessageController().handle);

        // SAVE EDITED MESSAGE FROM AN USER
        routes.put('/message/:messageid', new UpdateMessageController().handle);

        return routes;
    }
}
