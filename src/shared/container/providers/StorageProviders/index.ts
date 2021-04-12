import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import uploadConfig from '@config/upload';

import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: '',
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
