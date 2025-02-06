import mongoose from "mongoose";


export const dbConnect =()=>{
    mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log('db connected!')
    }).catch((e)=>{
        console.log(e);
    });
}