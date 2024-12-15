import express from "express";
import {json} from "body-parser";
import ErrorHandler from "./middlewares/ErrorHandler";
import 'express-async-errors';
import { NotFoundError } from "./errors/NotFoundError";

import UserRoutes from "./routes/UserRoutes";
import UserFileRoutes from "./routes/UserFileRoutes";
import { checkAuthenticated } from "./middlewares/Authenticate";

const App = express();
App.use(json());

App.use('/user', UserRoutes.getRouter());
App.use('/files', checkAuthenticated ,UserFileRoutes.getRouter());
App.all('*', ()=> { throw new NotFoundError } )

App.use(ErrorHandler);

export default App;