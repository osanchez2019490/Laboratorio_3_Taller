import Admin from '../admin/admin.model.js';
import Company from '../companies/company.model.js';

export const existingEmail = async(email = '') => {
    const existingEmeail = await Admin.findOne({email});
    if (existingEmeail){
        throw new Error(`The emeail ${email} does exist in the database`);
    }
}

export const existingNameCompany = async( nameCompany = '') => {
    const existingNameCompany = await Company.findOne({nameCompany});
    if(existingNameCompany) {
        throw new Error(`The company ${ nameCompany} is already registered`)
    }
}

export const existingUsername = async( username = '') => {
    const existingUsername = await Admin.findOne({username})
    if(existingUsername) {
        throw new Error(`The username ${username} does exist in the database`);
    }
}

export const existingById = async(id = '') => {
    const existingById = await Company.findOne({id});
    if(existingById) {
        throw new Error(`The id ${id} does  exist in the database`);
    }
}