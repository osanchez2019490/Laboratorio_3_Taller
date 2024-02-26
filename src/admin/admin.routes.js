import { Router } from 'express';
import { check } from 'express-validator';
import { adminPost } from './admin.controller.js';
import { existingEmail, existingUsername } from '../helpers/db-validator.js';
import { validationFields } from '../middlewares/validateFields.js';



const router = Router();

router.post(
    "/",
    [
     check ("username", "The username is required").not().isEmpty(),
     check("username").custom(existingUsername),
     check("email", "The email is required").not().isEmpty(),
     check("email", "The email is not valid").isEmail(),
     check("email").custom(existingEmail),
     check("password", "The password must be greater than 6 characters").isLength({ min: 6}),
     check("name", "The name is required").not().isEmpty(),
     validationFields
    ], adminPost
)

export default router;