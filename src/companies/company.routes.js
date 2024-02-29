import { Router } from "express";
import { check } from "express-validator";
import { 
    companyPost, 
    companyPut, 
    getCompany, 
    getCompanyById, 
    getReport} from "./company.controller.js";

import { existingById, existingNameCompany } from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/validateJwt.js";
import { validationFields } from '../middlewares/validateFields.js';
import { validateRole } from "../middlewares/validateRol.js";

const router = Router();

router.get("/report", [validateJWT, validateRole('ADMIN_ROLE')], getReport)
router.get("/", [validateJWT, validateRole('ADMIN_ROLE')], getCompany)
router.get(
    "/:id",
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check("id", "it is not id validit").isMongoId(),
        check("id").custom(existingById),
        validationFields
    ], getCompanyById)


router.post(
    "/",
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check("nameCompany", "The name is mandatory").not().isEmpty(),
        check("nameCompany").custom(existingNameCompany),
        check("impactLevel", "The level is mandatory").not().isEmpty(),
        check("yearsOfExperience", "The years is mandatory").not().isEmpty(),
        check("category", "The category is mandatory").not().isEmpty(),
        validationFields

    ], companyPost)

router.put(
    "/:id",
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check("id", "it is not id validit").isMongoId(),
        check("id").custom(existingById),
        validationFields
    ], companyPut)
    export default router;