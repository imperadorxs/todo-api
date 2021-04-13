import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IListsRepository from '@modules/lists/repositories/IListsRepository';
import isValid from 'date-fns/isValid';
import Task from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  list_id?: string | null;
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

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
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

    if (list_id) {
      const listExists = await this.listsRepository.findById(list_id);

      if (!listExists) {
        throw new AppError('list_id invalid');
      }
    }

    if (date !== null) {
      const isValidDate = isValid(date);

      if (!isValidDate) {
        throw new AppError('invalid date');
      }
    }

    const task = await this.tasksRepository.create({
      user_id,
      list_id,
      name,
      type: type || 1,
      status: status || false,
      date,
    });

    return task;
  }
}

export default CreateTaskService;
