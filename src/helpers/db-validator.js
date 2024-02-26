import Admin from '../admin/admin.model.js';

export const validRol = async (role = ' ') => {
    const validRol = await Admin.findOne({role});
    if(!validRol){
        throw new Error(`The role ${role} does not exist in the database `)
    }
}

export const existingEmail = async(email = '') => {
    const existingEmeail = await Admin.findOne({email});
    if (existingEmeail){
        throw new Error(`The emeail ${email} does exist in the database`);
    }
}

export const existingUsername = async( username = '') => {
    const existingUsername = await Admin.findOne({username})
    if(existingUsername) {
        throw new Error(`The username ${username} does exist in the database`);
    }
}

export const existingById = async(id = '') => {
    const existingById = await Admin.findOne({id});
    if(existingById) {
        throw new Error(`The id ${id} does  exist in the database`);
    }
}