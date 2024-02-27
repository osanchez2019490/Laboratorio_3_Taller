import bcrypt from 'bcrypt'; 
import Admin from '../admin/admin.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if(!admin) {
            return res.status(400).json({
                msg: "username are incorrect or not found in the database",
            })
        };

        if(!admin.state){
            return res.status(400).json({
                msg: "The user was not found in the database"
            })
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: "The password is incorrect"
            });
        }

        const token = await generateJWT( admin.id);

        res.status().json({
            msg: 'The login was correct!',
            admin,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}