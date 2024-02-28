'use strict'

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { dbConnection } from './config.js';
import morgan from 'morgan';
import adminRoutes from '../src/admin/admin.routes.js';
import authRoute from '../src/auth/auth.routes.js';
import companyRoutes from '../src/companies/company.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/coperex/v1/register';
        this.authPath = '/coperex/v1/auth';
        this.companyPath = '/coperex/v1/company';

        this.conectarDB();
        this.middlware();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlware(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.authPath, authRoute);
        this.app.use(this.companyPath, companyRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;