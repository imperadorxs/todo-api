import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListScheduledTasksService from '@modules/tasks/services/ListScheduledTasksService';

class ListScheduledTasksController {
  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listScheduledTasksService = container.resolve(
      ListScheduledTasksService,
    );
    const tasks = await listScheduledTasksService.execute({ user_id });

    return response.json(tasks);
  }
}

export default ListScheduledTasksController;
