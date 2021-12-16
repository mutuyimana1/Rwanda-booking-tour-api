import TourInfos from  "../models/tours";

class TourController{
 static async CreateTour(req,res){
  const tour =  await TourInfos.create(req,body);

  if(!tour){
      return res.status(404).json({error:"tour not created"})
  }
  return res.status(201).json({message:"tour created successfully"})

 }


}
export default TourController;