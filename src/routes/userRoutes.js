import express from "express";//it is package for managing routes
import UserController from "../controllers/userController";
import Validator from "../middlewares/validator"
import DataChecker from "../middlewares/dataChecker";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/VerifyToken";
const userRouter = express.Router();

userRouter.post(
    "/register",
Validator.newAccountRules(),
Validator.validateInput,
DataChecker.isEmailExist,
UserController.createUser);
userRouter.post("/login", UserController.userLogin)
userRouter.get("/all", UserController.getAllUser)
userRouter.get("/:id", UserController.getOneUser)
userRouter.delete("/:id", UserController.deleteOneUser)
userRouter.post(

    "/book/:id",
  
    verifyToken,
  
    verifyAccess("user"),
  
    UserController.bookTour);
    userRouter.get("/book/all", UserController.getAllBookings);
    userRouter.get(

        "/books/me",
      
        verifyToken,
      
        verifyAccess("user"),
      
        UserController.getAllBookingsByUser
      
      );
      userRouter.get(

        "/books/:idtour",
      
        verifyToken,
      
        verifyAccess("admin"),
      
        UserController.getAllBookingsByTourId
      
      );

export default userRouter;