import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  user_id: string;
  list_id: string;
}

@injectable()
class ListMyListsService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ list_id, user_id }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('user_id does not exists');
    }

    const list = await this.listsRepository.findById(list_id);

    if (!list) {
      throw new AppError('list_id does not exists');
    }

    await this.listsRepository.delete(list);
  }
}

export default ListMyListsService;
