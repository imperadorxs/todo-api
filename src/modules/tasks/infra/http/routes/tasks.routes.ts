import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TasksController from '../controllers/TasksController';
import ListTodayTasksController from '../controllers/ListTodayTasksController';
import ListScheduledTasksController from '../controllers/ListScheduledTasksController';
import ListTasksByTypeController from '../controllers/ListTasksByTypeController';

const taskRouter = Router();
const tasksController = new TasksController();
const listTodayTasksController = new ListTodayTasksController();
const listScheduledTasksController = new ListScheduledTasksController();
const listTasksByTypeController = new ListTasksByTypeController();

taskRouter.use(ensureAuthenticated);

taskRouter.get('/', tasksController.get);

taskRouter.get('/scheduled', listScheduledTasksController.get);

taskRouter.get(
  '/type',
  celebrate({
    [Segments.BODY]: {
      type: Joi.number().required(),
    },
  }),
  listTasksByTypeController.get,
);

taskRouter.get('/today', listTodayTasksController.get);

taskRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      list_id: Joi.string().uuid(),
      type: Joi.number(),
      status: Joi.boolean(),
      date: Joi.string(),
    },
  }),
  tasksController.create,
);

taskRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      task_id: Joi.string().uuid().required(),
      type: Joi.number(),
      status: Joi.boolean(),
      date: Joi.string(),
    },
  }),
  tasksController.update,
);

taskRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      task_id: Joi.string().uuid().required(),
    },
  }),
  tasksController.delete,
);

export default taskRouter;
