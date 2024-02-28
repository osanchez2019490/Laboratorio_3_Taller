import { Router } from "express";
import { check } from "express-validator";
import { companyPost } from "./company.controller.js";

import { existingNameCompany } from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/validateJwt.js";
import { validationFields } from '../middlewares/validateFields.js';

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("nameCompany", "The name is mandatory").not().isEmpty(),
        check("nameCompany").custom(existingNameCompany),
        check("impactLevel", "The level is mandatory").not().isEmpty(),
        check("yearsOfExperience", "The years is mandatory").not().isEmpty(),
        check("category", "The category is mandatory").not().isEmpty(),
        validateJWT

    ], companyPost)

    export default router;