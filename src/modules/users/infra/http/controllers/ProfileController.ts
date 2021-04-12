import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id: id });

    return response.json({ user: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const { id } = request.user;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id: id,
      name,
      email,
      password,
      old_password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}

export default ProfileController;
