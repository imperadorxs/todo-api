import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  task_id: string;
}

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, task_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user_id does not exists');
    }

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('task does not exists');
    }

    if (task.user_id !== user.id) {
      throw new AppError('this task does not belong to this user');
    }

    await this.tasksRepository.delete(task_id);
  }
}

export default DeleteTaskService;
