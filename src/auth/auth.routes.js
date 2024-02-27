import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";
import { validationFields } from "../middlewares/validateFields.js";

const router = Router();

router.post (
    '/login',
    [
        check('username', 'The username does not have to be empty').not().isEmpty(),
        check('password', 'The password does not have to be empty').not().isEmpty(),
    ], login)

export default router