import mongoose  from "mongoose";

const AdminSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'The admin username is mandatory'],
        uniqued: true    
    },

    email: {
        type: String,
        required: [true, 'The admin email is mandatory'],
        uniqued: true
    },

    password: {
        type: String,
        required: [true, 'The admin password is mandatory']
    },

    name: {
        type: String,
        required: [true, 'The admin name is mandatory']
    },

    state: {
        type: Boolean,
        default: true
    }
});


export default mongoose.model('Admin', AdminSchema);