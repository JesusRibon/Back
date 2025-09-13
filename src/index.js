import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import debtRoutes from './routes/debtRoutes.js'
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/debts', debtRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
   console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});

export default app;
