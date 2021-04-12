import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import UpdateTaskService from './UpdateTaskService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateTaskService: UpdateTaskService;

describe('UpdateTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    updateTaskService = new UpdateTaskService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update a task', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      list_id: 'null',
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    const customDate = new Date(2021, 4, 10, 15);

    const updatedTask = await updateTaskService.execute({
      user_id: user.id,
      task_id: task.id,
      name: 'super name',
      date: customDate,
      status: true,
      type: 5,
    });

    expect(updatedTask.name).toBe('super name');
    expect(updatedTask.date).toBe(customDate);
    expect(updatedTask.status).toBe(true);
    expect(updatedTask.type).toBe(5);
  });
  it('should not be able to update if non existing tasks', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });
    await expect(
      updateTaskService.execute({
        user_id: user.id,
        task_id: 'non-existing-id',
        name: 'super name',
        date: new Date(2021, 4, 10, 13),
        status: true,
        type: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update if non existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      list_id: 'null',
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    await expect(
      updateTaskService.execute({
        user_id: 'non-existing-user-id',
        task_id: task.id,
        name: 'super name',
        date: new Date(2021, 4, 10, 13),
        status: true,
        type: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able if this task does not belong to you', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user1.id,
      list_id: 'null',
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    await expect(
      updateTaskService.execute({
        user_id: user2.id,
        task_id: task.id,
        name: 'super name',
        date: new Date(2021, 4, 10, 13),
        status: true,
        type: 5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
