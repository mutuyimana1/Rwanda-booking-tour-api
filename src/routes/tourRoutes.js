import express from "express";
import TourController from "../controllers/tourController";

const tourRouter = express.Router();

// tourRouter.post("/register", TourController.createUser)
tourRouter.post('/register', function(req, res){
    TourController.CreateTour
  });




export default tourRouter;