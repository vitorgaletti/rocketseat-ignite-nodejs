import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatedUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdatedUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdatedUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdatedUserAvatarController };
