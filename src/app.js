import express from 'express';
import db from './config/db.js';


const app = express();
db.testConnection();
app.get('/', (req, res) => {
  res.send('Database conected!');
});

export default app;