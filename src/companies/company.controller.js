import { response, request} from  'express';
import Company  from './company.model.js';

export const companyPost = async (req = request, res= response) => {
    
    const {nameCompany, impactLevel, yearsOfExperience, category} = req.body;
    const company = new Company({ nameCompany,  impactLevel, yearsOfExperience, category});

    await company.save();

    res.status(200).json({
        company
    })

}