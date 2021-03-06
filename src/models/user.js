import mongoose from 'mongoose';
import { stringify } from 'querystring';

const userSchema= new mongoose.Schema(
    {

        firstName:String,
        lastName:String,
        email:{
            type:String,
            required:true,
            unique:true

        },
        password:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            default:"Rwanda",
        },
        gender:{
            type:String,
            enum:['male','female','other','not-say']
        },
        role:{

            type:String,

            default:"user",

            enum:["admin", "user"]

 

        },

    },
    {
        timestamps:true,
    }
    );
    const user = mongoose.model('User',userSchema)
    export default user;