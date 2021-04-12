import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '../repositories/fakes/FakeListsRepository';
import CreateListService from './CreateListService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeListsRepository: FakeListsRepository;
let createListService: CreateListService;

describe('CreateList', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeListsRepository = new FakeListsRepository();

    createListService = new CreateListService(
      fakeListsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const list = await createListService.execute({
      user_id: user.id,
      name: 'tarefas',
      icon: 'list',
    });

    await fakeTasksRepository.create({
      name: 'Ir para o trabalho',
      user_id: user.id,
      list_id: list.id,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    expect(list).toHaveProperty('id');
  });

  it('should not be able to create a new list if user id does exists', async () => {
    await expect(
      createListService.execute({
        user_id: 'invalid-user-id',
        name: 'tarefas',
        icon: 'list',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
