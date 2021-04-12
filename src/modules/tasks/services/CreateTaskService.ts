import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  list_id: string | null;
  name: string;
  type: number;
  status: boolean;
  date: Date | null;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    list_id,
    name,
    type,
    status,
    date,
  }: IRequest): Promise<Task> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('user_id does not exists');
    }

    const task = await this.tasksRepository.create({
      user_id,
      list_id: list_id || null,
      name,
      type: type || 1,
      status: status || false,
      date,
    });

    return task;
  }
}

export default CreateTaskService;
