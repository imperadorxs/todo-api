import ListTasksByTypeService from '@modules/tasks/services/ListTasksByTypeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListTodayTasksController {
  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { type } = request.body;
    const listTasksByTypeService = container.resolve(ListTasksByTypeService);
    const tasks = await listTasksByTypeService.execute({ user_id, type });

    return response.json(tasks);
  }
}

export default ListTodayTasksController;
