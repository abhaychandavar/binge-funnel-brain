import UserModel from '../models/user';

class UserManager {
  async getUsers() {
    const users = await UserModel.find({});
    return users;
  }
}

const userManager = new UserManager();
export default userManager;
