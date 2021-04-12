import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '../repositories/fakes/FakeListsRepository';
import DeleteListService from './DeleteListService';

let fakeUsersRepository: FakeUsersRepository;
let fakeListsRepository: FakeListsRepository;
let deleteListService: DeleteListService;

describe('DeleteList', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeListsRepository = new FakeListsRepository();

    deleteListService = new DeleteListService(
      fakeListsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete a list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const list = await fakeListsRepository.create({
      user_id: user.id,
      name: 'tarefas',
      icon: 'list',
    });

    await deleteListService.execute({ list_id: list.id, user_id: user.id });

    const lists = await fakeListsRepository.listMyLists(user.id);

    expect(lists).toEqual([]);
  });

  it('should not be able to delete a list if user_id does exists', async () => {
    const list = await fakeListsRepository.create({
      user_id: 'invalid-user_id',
      name: 'tarefas',
      icon: 'list',
    });

    await expect(
      deleteListService.execute({
        list_id: list.id,
        user_id: 'invalid-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a list if list does exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      deleteListService.execute({
        list_id: 'invalid-list_id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
