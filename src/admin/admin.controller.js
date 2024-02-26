import { response, request } from "express";
import bcrypt  from 'bcrypt';
import Admin from './admin.model.js';

export const adminPost = async(req, res) => {
    const { role, password, username, email, name} = req.body;
    const admin = new Admin({ role, password, username, email, name});

    const salt = bcrypt.genSaltSync();
    admin.password = bcrypt.hashSync(password, salt);

    admin.role = 'ADMIN_ROLE';

    await admin.save();

    res.status(200).json({
        admin
    });
};