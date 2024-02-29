import { response, request} from  'express';
import Company  from './company.model.js';
import excel from 'exceljs';

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

export const getReport = async (req, res) => {
    try{
    const company = await Company.find({ state: true }).lean();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Company');

    worksheet.columns = [
        { header: 'Company Name', key: 'nameCompany', width: 30},
        { header: 'Impact level', key: 'impactLevel', width: 20},
        { header: 'Years of experience', key: 'yearsOfExperience', width: 20},
        { header: 'Category', key: 'category', width: 20}
    ];

    company.forEach(company => {
        worksheet.addRow(company);
    });

    const stream = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="company_report.xlsx"');

    res.send(stream);
    }catch(e){
        console.error('Error al generar el reporte Excel:', error);
        res.status(500).json({ message: 'Error al generar el reporte Excel.' });
    }
}