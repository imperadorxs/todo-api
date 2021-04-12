import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { hash, compare } from 'bcryptjs';

class BCryptHashProvider implements IHashProvider {
  public async generationHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
