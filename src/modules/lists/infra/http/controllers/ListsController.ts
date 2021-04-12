import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateListService from '@modules/lists/services/CreateListService';
import ListMyListsService from '@modules/lists/services/ListMyListsService';
import DeleteListService from '@modules/lists/services/DeleteListService';
import UpdateListService from '@modules/lists/services/UpdateListService';

class ListsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createListService = container.resolve(CreateListService);
    const { name, icon } = request.body;
    const user_id = request.user.id;

    const list = await createListService.execute({
      user_id,
      name,
      icon,
    });

    return response.json(list);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listMyListsService = container.resolve(ListMyListsService);
    const lists = await listMyListsService.execute({ user_id });

    return response.json(lists);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { list_id } = request.body;
    const user_id = request.user.id;

    const deleteListService = container.resolve(DeleteListService);
    await deleteListService.execute({ user_id, list_id });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { list_id, name, icon } = request.body;
    const user_id = request.user.id;

    const updateListService = container.resolve(UpdateListService);
    const list = await updateListService.execute({
      user_id,
      list_id,
      name,
      icon,
    });

    return response.json(list);
  }
}

export default ListsController;
