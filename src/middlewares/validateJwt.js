import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "There is no token in the request"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const admin = await Admin.findById(uid);

        if(!admin){
            return res.status(401).json({
                msg: 'Usario no exist in the database'
            })
        }

        if(!admin.state){
            return res.status(401).json({
                msg: 'Token is not valid or the usuario have state false'
            })
        }

        req.admin = admin;

        next();
        
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token is not valid",
        });   
    }
};