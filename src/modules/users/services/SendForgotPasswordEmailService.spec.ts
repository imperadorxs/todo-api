import 'reflect-metadata';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeMailProvider: FakeMailProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    );
  });

  it('should be able to recover the password with email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover for email of a user that does not exist', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
