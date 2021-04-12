import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListTodayTasksService from '@modules/tasks/services/ListTodayTasksService';

class ListTodayTasksController {
  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listTodayTasksService = container.resolve(ListTodayTasksService);
    const tasks = await listTodayTasksService.execute({ user_id });

    return response.json(tasks);
  }
}

export default ListTodayTasksController;
