import { getRepository, Repository } from 'typeorm';
import IListsRepository from '@modules/lists/repositories/IListsRepository';
import ICreateListDTO from '@modules/lists/dtos/ICreateListDTO';
import List from '../entities/List';

class ListsRepository implements IListsRepository {
  private ormRepository: Repository<List>;

  constructor() {
    this.ormRepository = getRepository(List);
  }

  public async findById(list_id: string): Promise<List | undefined> {
    const list = await this.ormRepository.findOne(list_id);
    return list;
  }

  public async listMyLists(user_id: string): Promise<List[] | undefined> {
    const lists = await this.ormRepository.find({ where: { user_id } });

    return lists || undefined;
  }

  public async create({ name, user_id, icon }: ICreateListDTO): Promise<List> {
    const list = this.ormRepository.create({ name, user_id, icon });

    await this.ormRepository.save(list);

    return list;
  }

  public async delete(list: List): Promise<void> {
    await this.ormRepository.remove(list);
  }

  public async save(list: List): Promise<List> {
    return this.ormRepository.save(list);
  }
}

export default ListsRepository;
