import mongoose from "mongoose";

const CompanySchema =  mongoose.Schema({
    nameCompany: {
        type: String,
        required: [true, 'The company name is mandatory'],
        uniqued: true
    },

    impactLevel: {
        type: String,
        required: [true, 'The company impact level is mandatory'],
    },

    yearsOfExperience: {
        type: String,
        required: [true, 'The company years of experience is mandatory']
    },

    category: {
        type: String,
        required: [true, 'The company category is mandatory']
    },

    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Company', CompanySchema);