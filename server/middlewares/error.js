import jwt from "jsonwebtoken";

export const  errorHandler = (error,req,res,next)=>{
    if(error instanceof jwt.JsonWebTokenError){
        res.status(403).json({
            error:error
        });
    }
    res.status(500).json({
        error:error
    })
};      