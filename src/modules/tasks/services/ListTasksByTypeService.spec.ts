import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListTasksByTypeService from './ListTasksByTypeService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listTasksByTypeService: ListTasksByTypeService;

describe('ListTasks', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listTasksByTypeService = new ListTasksByTypeService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all user tasks by specific type', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await fakeTasksRepository.create({
      name: 'taskExample 1',
      user_id: user.id,
      date: new Date('2021-03-20'),
      status: false,
      type: 1,
    });

    const task = await fakeTasksRepository.create({
      name: 'taskExample 2',
      user_id: user.id,
      date: new Date('2021-03-20'),
      status: false,
      type: 5,
    });

    const myTasks = await listTasksByTypeService.execute({
      user_id: user.id,
      type: 5,
    });

    expect(myTasks).toEqual([task]);
  });
});
