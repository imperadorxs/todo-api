import ICreateListDTO from '../dtos/ICreateListDTO';
import List from '../infra/typeorm/entities/List';

export default interface ITasksRepository {
  create(data: ICreateListDTO): Promise<List>;
  delete(list: List): Promise<void>;
  save(list: List): Promise<List>;
  findById(list_id: string): Promise<List | undefined>;
  listMyLists(user_id: string): Promise<List[] | undefined>;
}
