import { Request, Response } from 'express';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import { container } from 'tsyringe';
import ListUserTasksService from '@modules/tasks/services/ListUserTasksService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import { parseISO } from 'date-fns';

class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createTaskService = container.resolve(CreateTaskService);
    const { name, list_id, status, type, date } = request.body;
    const user_id = request.user.id;

    const task = await createTaskService.execute({
      user_id,
      list_id,
      name,
      type,
      status,
      date: date ? parseISO(date) : null,
    });

    return response.json(task);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listUserTasksService = container.resolve(ListUserTasksService);
    const tasks = await listUserTasksService.execute({ user_id });

    return response.json(tasks);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { task_id, name, type, status, date } = request.body;

    const updateTaskService = container.resolve(UpdateTaskService);

    const task = await updateTaskService.execute({
      task_id,
      user_id,
      name,
      type,
      status,
      date,
    });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { task_id } = request.body;

    const deleteTaskService = container.resolve(DeleteTaskService);

    await deleteTaskService.execute({ task_id, user_id });

    return response.status(204).json();
  }
}

export default TasksController;
