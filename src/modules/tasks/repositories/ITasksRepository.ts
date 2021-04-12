import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Task from '../infra/typeorm/entities/Task';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  save(task: Task): Promise<Task>;
  delete(task_id: string): Promise<void>;
  listTodayTasks(user_id: string): Promise<Task[] | undefined>;
  listAllTasks(user_id: string): Promise<Task[] | undefined>;
  findById(task_id: string): Promise<Task | undefined>;
}
