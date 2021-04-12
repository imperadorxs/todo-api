import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import List from '../infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  user_id: string;
  list_id: string;
  name?: string;
  icon?: string;
}

@injectable()
class UpdateListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    list_id,
    name,
    icon,
  }: IRequest): Promise<List> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const list = await this.listsRepository.findById(list_id);

    if (!list) {
      throw new AppError('List does not exists');
    }

    if (list.user_id !== user.id) {
      throw new AppError('this list does not belong to this user');
    }

    Object.assign(list, {
      name: name || list.name,
      icon: icon || list.icon,
    });

    await this.listsRepository.save(list);

    return list;
  }
}

export default UpdateListService;
