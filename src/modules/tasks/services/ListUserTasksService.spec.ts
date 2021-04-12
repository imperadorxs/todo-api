import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListUserTasksService from './ListUserTasksService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listUserTasksService: ListUserTasksService;

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listUserTasksService = new ListUserTasksService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all user tasks', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task1 = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    const task2 = await fakeTasksRepository.create({
      name: 'taskExample 2',
      user_id: user.id,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    const myTasks = await listUserTasksService.execute({ user_id: user.id });

    expect(myTasks).toEqual([task1, task2]);
  });

  it('should not be able to list all tasks of no-existing user', async () => {
    await expect(
      listUserTasksService.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
