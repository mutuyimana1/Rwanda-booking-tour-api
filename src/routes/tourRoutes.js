import express from "express";
import TourController from "../controllers/tourController";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/VerifyToken";
const tourRouter = express.Router();

// tourRouter.post("/register", TourController.createUser)
tourRouter.post('/register',
verifyToken,
verifyAccess("admin"), 
    TourController.CreateTour
  );
  tourRouter.get("/all", TourController.getAllTours)
  tourRouter.get("/:id", TourController.getOneTour)
  tourRouter.delete("/:id", TourController.deleteOneTour)




export default tourRouter;