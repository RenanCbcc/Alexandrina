import express from "express";
import routes from '../api/routes/routes'
const app = express();
app.use(express.json());
routes(app);

export default app;