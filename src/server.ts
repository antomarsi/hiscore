import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { AppRoutes } from './routes';
import { createExpressServer } from 'routing-controllers';
import { createConnections } from 'typeorm';

dotenv.config();

createConnections()
  .then(async (connection) => {
    // create express app
    const app = createExpressServer({
      controllers: AppRoutes,
    });

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'));

    const PORT = process.env.PORT || '5000';
    // run app
    app.listen(PORT);

    console.log('Express application is up and running on port 3000');
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
