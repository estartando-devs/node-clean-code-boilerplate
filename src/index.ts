import express from "express";
import { AppConfig } from './config';
import { UserRouters } from '@Routes';

const app = express();

AppConfig(app);

app.use(UserRouters);
