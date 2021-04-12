import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '../repositories/fakes/FakeListsRepository';
import ListMyListsService from './ListMyListsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeListsRepository: FakeListsRepository;
let listMyListsService: ListMyListsService;

describe('ListMyLists', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeListsRepository = new FakeListsRepository();

    listMyListsService = new ListMyListsService(
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

    const list1 = await fakeListsRepository.create({
      user_id: user.id,
      name: 'tarefas',
      icon: 'list',
    });

    const list2 = await fakeListsRepository.create({
      user_id: user.id,
      name: 'tarefas 2',
      icon: 'list',
    });

    const lists = await listMyListsService.execute({ user_id: user.id });

    expect(lists).toEqual([list1, list2]);
  });

  it('should not be able to create a new list if user does exists', async () => {
    await expect(
      listMyListsService.execute({ user_id: 'invalid-user_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
