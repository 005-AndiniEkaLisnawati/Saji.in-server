import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/users.routes.js';


const app = express();
db.testConnection();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Database conected!');
});

app.use('/', userRoutes);


export default app;