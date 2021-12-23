import TourInfos from  "../models/tours";

class TourController{
 static async CreateTour(req,res){
  const tour =  await TourInfos.create(req.body);

  if(!tour){
      return res.status(404).json({error:"tour not created"})
  }
  return res.status(201).json({message:"tour created successfully",data:tour})

 }
static async getAllTours(req,res){
    const tours = await TourInfos.find(req.body);
    if(!tours){
        return res.status(404).json({error:"tours not found"})
    }
    return res.status(200).json({message:"tours are found",data:tours})
}
static async getOneTour(req,res){
    const tour = await TourInfos.findById(req.params.id);
     if(!tour){
         return res.status(404).json({error:"tour not found"})
     }
     return res.status(201).json({message:"tour is found", data:tour})

}
static async deleteOneTour(req, res) {
    const tour = await TourInfos.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(400).json({ error: "not deleted" });
    }
    return res.status(200).json({ message: "tour deleted successfully" });
  }
}
export default TourController;