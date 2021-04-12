import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import DeleteTaskService from './DeleteTaskService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteTaskService: DeleteTaskService;

describe('DeleteTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deleteTaskService = new DeleteTaskService(
      fakeTasksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete a task', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await fakeTasksRepository.create({
      name: user.name,
      user_id: user.id,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    const deleteTask = jest.spyOn(fakeTasksRepository, 'delete');

    await deleteTaskService.execute({ user_id: user.id, task_id: task.id });

    expect(deleteTask).toHaveBeenCalledWith(task.id);
  });

  it('should not be able to delete a task if does exists user_id', async () => {
    const task = await fakeTasksRepository.create({
      name: 'user name',
      user_id: 'invalid-user-id',
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    await expect(
      deleteTaskService.execute({
        user_id: 'invalid-user-id',
        task_id: task.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a task if does exists task_id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      deleteTaskService.execute({
        user_id: user.id,
        task_id: 'invalid-task-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a task does not belong to this user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const otherUser = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const task = await fakeTasksRepository.create({
      name: user.name,
      user_id: user.id,
      date: new Date(2021, 4, 10, 13),
      status: false,
      type: 1,
    });

    await expect(
      deleteTaskService.execute({
        user_id: otherUser.id,
        task_id: task.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
