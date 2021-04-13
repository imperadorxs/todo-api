import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListScheduledTasksService from './ListScheduledTasksService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listScheduledTasksService: ListScheduledTasksService;

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listScheduledTasksService = new ListScheduledTasksService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all user tasks scheduled', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task1 = await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      date: new Date('2021-03-20'),
      status: false,
      type: 1,
    });

    const myTasks = await listScheduledTasksService.execute({
      user_id: user.id,
    });

    expect(myTasks).toEqual([task1]);
  });
});
