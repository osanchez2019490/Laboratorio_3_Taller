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

export const getCompany = async (req, res) => {
    const { limit , from, yearsOfExperience , category, order } = req.query;
    const query = { state: true};

    if (yearsOfExperience !== undefined) {
        query.yearsOfExperience = yearsOfExperience;
    }

    if(category) {
        query.category = category;

    }

    let sortCriteria = {};
    if(order) {
        switch(order) {
            case 'az':
                sortCriteria = { nameCompany: 1 };
                break;
            case 'za':
                sortCriteria = { nameCompany: -1};
                break;
            case 'experienciaAsc':
                sortCriteria = { yearsOfExperience: 1};
                break;
            case 'experienciaDesc':
                sortCriteria = { yearsOfExperience: -1};
                break;
            case 'categoryAsc':
                sortCriteria = { category: 1};
                break;
            case 'categoryDesc': 
                sortCriteria = { category:-1};
                break;
        }
    }

    const [ total, companys] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort(sortCriteria)
    ]);
    

    res.status(200).json({
        total,
        companys
    });
}