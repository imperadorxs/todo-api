import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListsController from '../controllers/ListsController';

const listRouter = Router();
const listsController = new ListsController();
listRouter.use(ensureAuthenticated);

listRouter.get('/', listsController.get);

listRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      icon: Joi.string(),
    },
  }),
  listsController.create,
);

listRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      list_id: Joi.string().uuid().required(),
    },
  }),
  listsController.delete,
);

listRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      list_id: Joi.string().uuid().required(),
      name: Joi.string(),
      icon: Joi.string(),
    },
  }),
  listsController.update,
);

export default listRouter;
