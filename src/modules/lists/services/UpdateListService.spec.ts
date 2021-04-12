import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeListsRepository from '../repositories/fakes/FakeListsRepository';
import UpdateListService from './UpdateListService';

let fakeUsersRepository: FakeUsersRepository;
let fakeListsRepository: FakeListsRepository;
let updateListService: UpdateListService;

describe('UpdateList', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeListsRepository = new FakeListsRepository();

    updateListService = new UpdateListService(
      fakeListsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update name and icon of a list', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const list = await fakeListsRepository.create({
      user_id: user.id,
      name: 'tasks-list',
      icon: 'list-icon',
    });

    const updatedList = await updateListService.execute({
      list_id: list.id,
      user_id: user.id,
      name: 'updated-tasks-list',
      icon: 'updated-lists-icon',
    });

    const lists = await fakeListsRepository.listMyLists(user.id);

    expect(lists).toEqual([updatedList]);
  });

  it('should not be able if user does exists', async () => {
    const list = await fakeListsRepository.create({
      user_id: 'invalid-user_id',
      name: 'tasks-list',
      icon: 'list-icon',
    });

    await expect(
      updateListService.execute({
        list_id: list.id,
        user_id: 'invalid-user_id',
        name: 'updated-tasks-list',
        icon: 'updated-lists-icon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able if list does exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateListService.execute({
        list_id: 'invalid-list_id',
        user_id: user.id,
        name: 'updated-tasks-list',
        icon: 'updated-lists-icon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update list if this list does not belong to this user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const anotherUser = await fakeUsersRepository.create({
      name: 'john doe2',
      email: 'johndoe2@mail.com',
      password: '123456',
    });

    const list = await fakeListsRepository.create({
      user_id: user.id,
      name: 'tasks-list',
      icon: 'list-icon',
    });

    await expect(
      updateListService.execute({
        list_id: list.id,
        user_id: anotherUser.id,
        name: 'updated-tasks-list',
        icon: 'updated-lists-icon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
