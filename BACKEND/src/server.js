import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactosRouter from './contactos.routes.js';

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/contactos', contactosRouter);

app.listen(port, () => {
  console.log(`API Contactos en http://localhost:${port}`);
});
