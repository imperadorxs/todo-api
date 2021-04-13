import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '@modules/lists/repositories/fakes/FakeListsRepository';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import CreateTaskService from './CreateTaskService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeListsRepository: FakeListsRepository;
let createTaskService: CreateTaskService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeListsRepository = new FakeListsRepository();

    createTaskService = new CreateTaskService(
      fakeTasksRepository,
      fakeUsersRepository,
      fakeListsRepository,
    );
  });

  it('should be able to create a new task', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await createTaskService.execute({
      name: user.name,
      user_id: user.id,
      list_id: null,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    expect(task).toHaveProperty('id');
  });

  it('should not be able to create a new task if not existing user_id', async () => {
    await expect(
      createTaskService.execute({
        name: 'john doe',
        list_id: 'null',
        user_id: 'non-existing-user-id',
        date: new Date(2021, 4, 10, 13),
        status: false,
        type: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new task if date is invalid', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      createTaskService.execute({
        name: 'john doe',
        user_id: user.id,
        date: new Date('20'),
        status: false,
        type: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new task if a invalid list_id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      createTaskService.execute({
        name: user.name,
        user_id: user.id,
        list_id: 'nullfd',
        date: new Date(2021, 4, 10, 13),
        status: false,
        type: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
