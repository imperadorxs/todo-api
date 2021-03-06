import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListTodayTasksService from './ListTodayTasksService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listTodayTasksService: ListTodayTasksService;

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listTodayTasksService = new ListTodayTasksService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all user day tasks', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task1 = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      date: new Date(Date.now()),
      status: false,
      type: 1,
    });

    const task2 = await fakeTasksRepository.create({
      name: 'taskExample 2',
      user_id: user.id,
      date: new Date(Date.now()),
      status: false,
      type: 1,
    });

    const myTasks = await listTodayTasksService.execute({ user_id: user.id });

    expect(myTasks).toEqual([task1, task2]);
  });
});
