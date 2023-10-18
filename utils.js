import Jwt  from "jsonwebtoken";
export const generateToken=(user)=>{
    return Jwt.sign({
        _id:user._id,
        email:user.Email,
        role:user.role,
    },process.env.JWT_SECRET,{
        expiresIn:'30d',
    })


};