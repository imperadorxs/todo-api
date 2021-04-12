import IListsRepository from '@modules/lists/repositories/IListsRepository';
import ICreateListDTO from '@modules/lists/dtos/ICreateListDTO';
import { v4 as uuid } from 'uuid';
import List from '@modules/lists/infra/typeorm/entities/List';

class FakeListsRepository implements IListsRepository {
  private lists: List[] = [];

  public async findById(list_id: string): Promise<List | undefined> {
    const list = this.lists.find(findList => findList.id === list_id);

    return list;
  }

  public async listMyLists(user_id: string): Promise<List[] | undefined> {
    const lists = this.lists.filter(list => list.user_id === user_id);

    return lists || undefined;
  }

  public async create({ name, user_id, icon }: ICreateListDTO): Promise<List> {
    const list = new List();

    Object.assign(list, { id: uuid(), user_id, name, icon });

    this.lists.push(list);

    return list;
  }

  public async delete(list: List): Promise<void> {
    const findIndex = this.lists.findIndex(findList => findList === list);
    this.lists.splice(findIndex, 1);
  }

  public async save(list: List): Promise<List> {
    const findIndex = this.lists.findIndex(findList => findList.id === list.id);

    this.lists[findIndex] = list;

    return list;
  }
}

export default FakeListsRepository;
