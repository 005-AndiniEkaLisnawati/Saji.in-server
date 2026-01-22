import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/users.routes.js';
import menuRoutes from './routes/menus.route.js';
import customerRoutes from './routes/customer.route.js';
import tableRoutes from './routes/tables.route.js';
import orderRoutes from './routes/orders.route.js';


const app = express();
db.testConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Database conected!');
});

app.use('/', menuRoutes);
app.use('/', userRoutes);
app.use('/', customerRoutes);
app.use('/', tableRoutes);
app.use('/', orderRoutes);




export default app;