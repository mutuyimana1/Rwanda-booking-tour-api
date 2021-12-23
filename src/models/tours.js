import { timeStamp } from 'console';
import mongoose from 'mongoose';
import { stringify } from 'querystring';

const tourSchema= new mongoose.Schema(
    {
       names:{
           type:String,
           required:true

       },
       lecation:{
        type:String,
        required:true

    },
       price:String,
       description:String,
       seats:Number,
       image:[
           {
               type:String,
           }
       ],
       scheduredDate:Date,
       deadline:Date
},


    {
        timeStamp:true,

    }
 
    );

    const tour = mongoose.model('Tours',tourSchema)
    export default tour;