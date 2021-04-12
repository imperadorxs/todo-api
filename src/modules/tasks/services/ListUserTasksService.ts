import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Task from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Task[] | undefined> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const tasks = await this.tasksRepository.listAllTasks(user_id);

    return tasks;
  }
}

export default ListUserTasksService;
