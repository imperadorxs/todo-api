import { Router } from 'express';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import listsRouter from '@modules/lists/infra/http/routes/lists.routes';

const routes = Router();

routes.use('/tasks', tasksRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/lists', listsRouter);

export default routes;
