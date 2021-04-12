import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  task_id: string;
  name: string;
  type: number;
  status: boolean;
  date: Date;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    task_id,
    name,
    type,
    status,
    date,
  }: IRequest): Promise<Task> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('Task does not exists');
    }

    if (task.user_id !== user.id) {
      throw new AppError('this task does not belong to this user');
    }

    Object.assign(task, {
      name: name || task.name,
      type: type || task.type,
      status: status || task.status,
      date: date || task.date,
    });

    await this.tasksRepository.save(task);

    return task;
  }
}

export default UpdateTaskService;
