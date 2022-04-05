//app.ts es el encargado del servidor

import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoutes from './routes/index'

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
//Este modulo cors sirve para poderse conectar a un servidor externo
//como lo seria el 4200 de angular entonces es para intercambiar inf.
app.use(cors());
//Para poder guardar los datos como tipo Json desde nuestro navegador
app.use(express.json());

// Routes
// /api sera nuestra ruta principal y de ahi despliegan las demas.
app.use('/api', indexRoutes);

// this folders for this application will be used to store public file images
//esto hace que cada vez que se realice la ruta /uploads seran almacenadas dentro
//de la carpeta uploads utilizando "path"-> que hace dar la ruta completa desde tu C:.... 
//hasta indicar la carpeta uploads Todo esto sera para ser mostradas al NAVEGADOR
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;