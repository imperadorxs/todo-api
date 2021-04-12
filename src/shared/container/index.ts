import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers/index';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IListsRepository from '@modules/lists/repositories/IListsRepository';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IListsRepository>(
  'ListsRepository',
  ListsRepository,
);
