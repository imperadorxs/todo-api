import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('john doe');
    expect(profile.email).toBe('johndoe@mail.com');
  });

  it('should be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-exists-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
