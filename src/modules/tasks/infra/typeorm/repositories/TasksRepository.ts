import { getRepository, Repository } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Task from '../entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async findById(task_id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne(task_id);
    return task;
  }

  public async listTodayTasks(user_id: string): Promise<Task[] | undefined> {
    const today = new Date(Date.now());
    const startTimeDay = startOfDay(today).toISOString();
    const endTimeDay = endOfDay(today).toISOString();

    const tasks = await this.ormRepository.query(
      `SELECT * FROM tasks WHERE user_id='${user_id}' AND date >= '${startTimeDay}' AND date <= '${endTimeDay}'`,
    );

    return tasks || undefined;
  }

  public async listAllTasks(user_id: string): Promise<Task[] | undefined> {
    const tasks = await this.ormRepository.find({ where: { user_id } });

    return tasks || undefined;
  }

  public async create({
    name,
    user_id,
    list_id,
    type,
    status,
    date,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create({
      name,
      user_id,
      list_id,
      type,
      status,
      date,
    });

    await this.ormRepository.save(task);

    return task;
  }

  public async delete(task_id: string): Promise<void> {
    await this.ormRepository.delete(task_id);
  }

  public async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }
}

export default TasksRepository;
