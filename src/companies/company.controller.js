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

export const companyPut = async (req, res = response) =>  {
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    const companyLast = await Company.findByIdAndUpdate(id, resto);

    const company = req.body;

    res.status(200).json({
        msg: 'The company has been updated',
        company,
        companyLast
    })
}

export const getCompanyById = async (req, res) => {
    const {id} = req.params;
    const company = await Company.findOne({_id: id});

    res.status(200).json({
        company
    })
}