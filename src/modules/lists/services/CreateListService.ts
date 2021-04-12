import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import List from '../infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  user_id: string;
  name: string;
  icon: string;
}

@injectable()
class CreateListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name, icon }: IRequest): Promise<List> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('user_id does not exists');
    }

    const list = await this.listsRepository.create({
      user_id,
      name,
      icon,
    });

    return list;
  }
}

export default CreateListService;
