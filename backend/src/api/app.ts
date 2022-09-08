import express from "express";
import cors from "cors";
import routerIndex from "../database/router/";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routerIndex);

export default app;
