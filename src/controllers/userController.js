import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuthe";

class UserController {
  //Create user in db

  static async createUser(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await UserInfos.create(req.body);

    if (!user) {
      return res.status(400).json({ error: "user not registered" });
    }
    return res
      .status(200)
      .json({ message: "user registered successfully", data: user });
  }

  static async getAllUser(req, res) {
    const users = await UserInfos.find(req.body);

    if (!users) {
      return res.status(400).json({ error: "users not found" });
    }
    return res.status(200).json({ message: " users retrived", data: users });
  }

  static async getOneUser(req, res) {
    const user = await UserInfos.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    return res.status(200).json({ message: "user information", data: user });
  }

  static async deleteOneUser(req, res) {
    const user = await UserInfos.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "not deleted" });
    }
    return res.status(200).json({ message: "user deleted successfully" });
  }
  //login function

  static async userLogin(req, res) {
    const user = await UserInfos.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "user not found!Register first" });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      const token = TokenAuth.tokenGenerator({ user: user });
      return res
        .status(200)
        .json({ message: "succesfully loged In", token: token, data:user });
    }
    return res.status(400).json({ error: "invalid password" });
  }
}

export default UserController;
