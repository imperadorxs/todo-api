import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import Task from '../../infra/typeorm/entities/Task';
import ITasksRepository from '../ITasksRepository';
import ICreateTaskDTO from '../../dtos/ICreateTaskDTO';

class FakeTaskRepository implements ITasksRepository {
  private tasks: Task[] = [];

  public async findById(task_id: string): Promise<Task | undefined> {
    const task = this.tasks.find(findTask => findTask.id === task_id);

    return task;
  }

  public async listTodayTasks(): Promise<Task[] | undefined> {
    const todayDate = format(new Date(Date.now()), 'yyyy-MM-dd');
    const tasks = this.tasks.filter(task => {
      if (task.date !== null) {
        const taskDate = format(task.date, 'yyyy-MM-dd');
        return taskDate === todayDate;
      }
      return null;
    });

    return tasks || undefined;
  }

  public async ListScheduledTasks(): Promise<Task[] | undefined> {
    const todayDate = format(new Date(Date.now()), 'yyyy-MM-dd');
    const tasks = this.tasks.filter(task => {
      if (task.date !== null) {
        const taskDate = format(task.date, 'yyyy-MM-dd');
        return taskDate !== todayDate;
      }
      return null;
    });

    return tasks || undefined;
  }

  public async ListTasksByType(
    user_id: string,
    type: number,
  ): Promise<Task[] | undefined> {
    const tasks = this.tasks.filter(task => task.type === type);

    return tasks || undefined;
  }

  public async listAllTasks(user_id: string): Promise<Task[] | undefined> {
    const tasks = this.tasks.filter(task => task.user_id === user_id);

    return tasks || undefined;
  }

  public async create({
    name,
    user_id,
    list_id,
    date,
    status,
    type,
  }: ICreateTaskDTO): Promise<Task> {
    const task = new Task();
    Object.assign(task, {
      id: uuid(),
      name,
      user_id,
      list_id,
      date,
      status,
      type,
    });
    this.tasks.push(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task.id);

    this.tasks[findIndex] = task;

    return task;
  }

  public async delete(task_id: string): Promise<void> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task_id);
    this.tasks.splice(findIndex, 1);
  }
}
export default FakeTaskRepository;
