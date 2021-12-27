import UserInfos from "../models/user";
import TourInfos from "../models/tours";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuthe";
import BookInfos from "../models/book";

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
  //booking

  static async bookTour(req, res) {

    const bookData = {

      user: req.user._id,

      tour: req.params.id,

    };

 

    const book = await BookInfos.create(bookData);

 

    const tour = await TourInfos.findById(req.params.id);

 

    if (!book) {

      return res.status(404).json({ error: "failed to book" });

    }

 

    return res.status(200).json({ message: "Booked successfully", data: book });

  };

  //get all Bookes

 

  static async getAllBookings(req, res) {

    const books = await BookInfos.find(req.body);

 

    if (!books) {

      return res.status(404).json({ error: "Book Not found" });

    }

 

    return res.status(200).json({ message: "Success", data: books });

  }

  // get all booking by user

 

  static async getAllBookingsByUser(req, res) {

    // console.log(req.user)

    const books = await BookInfos.find({ user: req.user._id });

 

    if (!books) {

      return res.status(404).json({ error: "Book Not found" });

    }

 

    return res.status(200).json({ message: "Success", data: books });

  }
  //get all booking by tour id

  static async getAllBookingsByTourId(req, res) {

    const books = await BookInfos.find({ tour: req.params.idtour });

 

    if (!books) {

      return res.status(404).json({ error: "book not found" });

    }

 

    return res.status(200).json({ message: "success", data: books });

  }
   //get all booking  by user id

 

   static async getaAllBookingByUserId(req, res) {

    console.log("hey what is happening");

    const bookings = await BookInfos.findById();

    if (!bookings) {

      return res.status(404).json({ error: "not found" });

    }

 

    return res.status(200).json({ message: "success", data: bookings });
  }
}

export default UserController;
