import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import List from '../infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListMyListsService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<List[] | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user_id does not exists');
    }

    const lists = await this.listsRepository.listMyLists(user_id);

    return lists;
  }
}

export default ListMyListsService;
