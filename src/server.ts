import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppRoutesV1 } from './routes';
import { createExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { createConnections } from 'typeorm';
import helmet = require('helmet');
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

createConnections()
  .then(async (connection) => {
    // create express app

    const rountingControllerOptions = {
      routePrefix: '/api',
      controllers: AppRoutesV1,
    };
    const app = createExpressServer(rountingControllerOptions);

    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/',
    });

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, rountingControllerOptions, {
      components: {
        schemas,
      },
      info: {
        description: 'A simple hiscoreApi',
        title: 'Hiscore Api',
        version: '1.0.0',
      },
    });
    app.use('/docs', swaggerUi.serve);
    app.get('/docs', swaggerUi.setup(spec, { explorer: true }));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'));

    const PORT = process.env.PORT || '5000';
    // run app
    app.listen(PORT);

    console.log(`Express application is up and running on port ${PORT}`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
