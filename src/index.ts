import express from "express";
import { AppConfig } from './config';
import { userRoutes } from '@Routes';

const app = express();

AppConfig(app);

app.use(userRoutes);
