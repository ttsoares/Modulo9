import { Router } from 'express';

import { CreateUserController } from "../controllers/create-user"
import { LoginUserController } from "../controllers/login"
import { GetAllUsersController } from "../controllers/get-all-users"
import { GetOneUserController } from "../controllers/get-one-user"
import { UpdateUserController } from "../controllers/update-user"
import { DeleteUserController } from "../controllers/delete-user"

export default class UserRoutes{

    public init(): Router {
        const routes = Router();

        // CREATE A USER
        routes.post('/user/store', new CreateUserController().handle);

        // VERIFY USER PASS - IF PASS ok RETURNS 'uid'
        routes.post('/login', new LoginUserController().handle);

        // LIST ALL Users
        routes.get('/users', new GetAllUsersController().handle);

        // GET ONE USER FROM id FOR EDIT
        routes.get('/user/:userid', new GetOneUserController().handle);

        // SAVE EDITED USER
        routes.put('/user/:userid', new UpdateUserController().handle);

        // DELETE  AN USER
        routes.delete('/user/:userid', new DeleteUserController().handle);

        return routes;
    }
}
